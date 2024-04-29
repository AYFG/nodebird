import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";
import { backUrl } from "../config/config";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  });

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  });
  if (images.length === 1) {
    return (
      <>
        <img
          style={{ cursor: "pointer" }}
          role="presentation"
          src={`${backUrl}/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          style={{
            width: "50%",
            display: "inline-block",
          }}
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={`http://localhost:3065/${images[0].src}`}
          onClick={onZoom}
        />
        <img
          style={{
            width: "50%",
            display: "inline-block",
          }}
          role="presentation"
          src={`http://localhost:3065/${images[1].src}`}
          alt={`http://localhost:3065/${images[1].src}`}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          style={{ cursor: "pointer" }}
          width="50%"
          src={`http://localhost:3065/${images[0].src}`}
          alt={`http://localhost:3065/${images[0].src}`}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined style={{ cursor: "pointer" }} onClick={onZoom} />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
