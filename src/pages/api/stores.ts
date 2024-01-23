import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";

import prisma from "@/db";
import axios from "axios";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;

  if (req.method === "POST") {
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  }

  if (req.method === "PUT") {
    const data = req.body;
    const result = await prisma.store.update({
      data: { ...data },
      where: { id: data.id },
    });
    return res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    const { id }: { id?: string } = req.query;
    if (!id) return res.status(500).json(null);

    const result = await prisma.store.delete({ where: { id: parseInt(id) } });
    return res.status(200).json(result);
  }

  if (page) {
    const skipPage = parseInt(page) - 1;

    const data = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
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
