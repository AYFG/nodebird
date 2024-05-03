import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_POST_REQUEST } from "../reducer/post";
import ButtonGroup from "antd/lib/button/button-group";
import { Button } from "antd";

const PostCardContent = ({
  postData,
  editMode,
  onCancelUpdate,
  onChangePost,
}) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState(postData);
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          <textArea value={postData} oNChange={onChangeText} />
          <ButtonGroup>
            <Button
              loading={updatePostLoading}
              onClick={onChangePost(editText)}
            >
              수정
            </Button>
            <Button type="danger" onClick={onCancelUpdate}>
              취소
            </Button>
          </ButtonGroup>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
