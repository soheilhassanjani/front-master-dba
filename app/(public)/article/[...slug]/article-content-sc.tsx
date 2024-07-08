import React, { FC, Suspense } from "react";
import { HOST_ADDRESS } from "@/configs/baseUrl";
import ArticleContent from "@/app/(public)/article/[...slug]/article-content";

interface ArticleContentSCProps {
  articleId: number;
}

async function getData(articleId: number) {
  const res = await fetch(
    HOST_ADDRESS +
      "/Article/GetArticleDetail?" +
      new URLSearchParams({
        "ArticleViewModel.id": String(articleId),
      }).toString(),
    {
      method: "POST",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const ArticleContentSC: FC<ArticleContentSCProps> = async ({ articleId }) => {
  //
  const data = await getData(articleId);
  //
  return (
    <Suspense fallback={<></>}>
      <ArticleContent data={data} />
    </Suspense>
  );
};

export default ArticleContentSC;
