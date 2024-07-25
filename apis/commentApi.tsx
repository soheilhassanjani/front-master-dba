import axiosInstance from "@/configs/axios";

const BASE_URL = "/Comment";

export const postCommentGetArticleComment = async (dto: {
  ArticleId: number;
  perSection: number;
  currentSection: number;
}) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetArticleComment",
    data: dto,
  });
  return data;
};

export const postCommentSaveComment = async (dto: {
  ArticleId: number;
  Description: string;
}) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/SaveComment",
    data: dto,
  });
  return data;
};