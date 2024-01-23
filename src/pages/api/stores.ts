import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
  const { page }: { page?: string } = req.query;
  const prisma = new PrismaClient();

  if (page) {
    const skipPage = parseInt(page) - 1;

    const data = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
    });
    const totalCount = await prisma.store.count();
    return res.status(200).json({
      page: parseInt(page),
      data,
      totalCount,
      totalPage: Math.ceil(totalCount / 10),
    });
  }
  const { id }: { id?: string } = req.query;

  const data = await prisma.store.findMany({
    orderBy: { id: "asc" },
    where: { id: id ? parseInt(id) : {} },
  });
  return res.status(200).json(id ? data[0] : data);
}
