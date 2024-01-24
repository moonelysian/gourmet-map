import type { NextApiRequest, NextApiResponse } from "next";
import { LikeApiResponse, LikeInterface } from "@/interface";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

interface ResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeInterface | LikeApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { storeId }: { storeId: number } = req.body;

    const like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: session?.user?.id,
      },
    });

    if (like) {
      const result = await prisma.like.delete({
        where: { id: like.id },
      });
      return res.status(204).json(result);
    }
    const result = await prisma.like.create({
      data: { userId: session?.user.id, storeId: storeId },
    });
    return res.status(201).json(result);
  }

  const count = await prisma.like.count({
    where: {
      userId: session.user.id,
    },
  });

  const { page = "1", limit = "10" }: ResponseType = req.query;
  const skipPage = parseInt(page) - 1;

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      userId: session.user.id,
    },
    include: {
      store: true,
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });

  return res.status(200).json({
    data: likes,
    page: parseInt(page),
    totalPage: Math.ceil(count / parseInt(limit)),
  });
}
