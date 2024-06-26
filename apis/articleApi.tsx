import axiosInstance from "@/configs/axios";

const BASE_URL = "/Article";

export const postArticleGetAllArticlesForMainPage = async () => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetAllArticlesForMainPage",
  });
  return data;
};

export const postArticleGetArticleUsingSearch = async (params: any) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetArticleUsingSearch",
    params,
  });
  return data;
};

export const postArticleGetArticleDetail = async (params: any) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetArticleDetail",
    params,
  });
  return data;
};

export const postArticleGetBreadCrumbListOnArticleId = async (params: any) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetBreadCrumbListOnArticleId",
    params,
  });
  return data;
};

export const postArticleGetAllArticleMenu = async () => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetAllArticleMenu",
  });
  return data;
};

export const postArticleGetAllArticlesForArchiveWithPaginate = async (
  params: any,
) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetAllArticlesForArchiveWithPaginate",
    data: params,
  });
  return data;
};

export const postArticleGetAllArticlesOnAuthrId = async (params: any) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetAllArticlesOnAuthrId",
    data: params,
  });
  return data;
};

export const postArticleGetAllArticlesForDashboard = async (params: any) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/GetAllArticlesForDashboard",
    data: params,
  });
  return data;
};

export const postArticleSave = async (params: any) => {
  const { data }: any = await axiosInstance({
    method: "post",
    url: BASE_URL + "/Save",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
