// post/[id].js (다이나믹 라우팅)
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import wrapper from "../store/configureStore";
import axios from "axios";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../reducer/user";
import { LOAD_POST_REQUEST } from "../reducer/post";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={`${
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "http://woodbird.shop/favicon.ico"
          }님의 게시글`}
        />
        <meta property="og:url" content={`http://woodbird.shop/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    console.log(context);
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
