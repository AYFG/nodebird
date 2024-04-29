import React from "react";
import wrapper from "../store/configureStore";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Avatar, Card } from "antd";
import { LOAD_USER_REQUEST } from "../reducer/user";
import { END } from "redux-saga";

const About = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉 <br /> {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워 <br /> {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

// 블로그 게시글,이벤트 페이지 등 빈번하게 수정되지 않는 상황,정적인 HTML 파일로 뽑아주는 getStaticProps
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
