import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import Wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>

      <Component />
    </>
  );
};
NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default Wrapper.withRedux(NodeBird);
