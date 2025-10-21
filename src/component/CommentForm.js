import { useState } from "react";
import api from "../api/axiosConfig";

function CommentForm({ user, loadComments, boardId }) {
  const [newComment, setNewComment] = useState("");
  const [commentErrors, setCommentErrors] = useState({});

  //댓글 쓰기 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); //초기화
    setCommentErrors({});

    if (!user) {
      alert("로그인 후 댓글 작성 가능");
      return;
    }

    if (!newComment) {
      alert("댓글을 입력해주세요");
      return;
    }

    try {
      alert("댓글을 입력하시겠습니까?");
      await api.post(`/api/comments/${boardId}`, { content: newComment }); // boardId = 게시글id
      setNewComment("");

      //댓글 리스트 불러오기 호출 -> 새 댓글 기존리스트에 반영
      loadComments();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setCommentErrors(err.response.data);
      } else {
        console.error(err);
        alert("댓글 등록 실패!");
      }
    }
  };

  return (
    <div>
      <h3>댓글 쓰기</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default CommentForm;
