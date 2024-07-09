import React from "react";
import ArticlesNavigationSC from "@/app/(public)/article/[...slug]/articles-navigation-sc";
import ArticleContentSC from "@/app/(public)/article/[...slug]/article-content-sc";
import ArticleBreadcrumbs from "@/app/(public)/article/[...slug]/article-breadcrumbs";
import Container from "@/components/core/Container";
import Grid from "@/components/core/Grid";

const ArticlePage = ({ params: { slug } }: { params: { slug: string[] } }) => {
  //
  const articleId = +slug?.[0];
  //
  return (
    <Container>
      <div className="pb-3 pt-4">
        <ArticleBreadcrumbs id={articleId} />
      </div>
      <Grid className="gap-6">
        <div className="col-span-3">
          <ArticlesNavigationSC />
        </div>
        <div className="col-span-9">
          <ArticleContentSC articleId={articleId} />

          {/* {isLogin ? (
              <Comment articleId={id} />
            ) : (
              <div className="mt-3 text-center alert alert-info" role="alert">
                <span className="font-bold">برای ثبت نظر باید وارد شوید</span>
              </div>
            )} */}

          {/* <CommentList
              articleId={id}
              articleComment={articleComment}
              islogin={isLogin}
            /> */}

          <div id="imgZoomModal" className="image-modal">
            {/* <span className="close" onClick={handleCloseImageModal}>
                &times;
              </span> */}
            <img className="image-modal-content" id="img02" />
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default ArticlePage;
