import React from 'react';

function CommentsCount(props: { count(): number }) {
  if (props.count() !== 0) {
    return <span className="card__comment-count">{props.count()}</span>;
  } else {
    return <></>;
  }
}
export default CommentsCount;
