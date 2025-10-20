import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function PostView({ post, user, setEditing }) {
  const navigate = useNavigate();
  const isAuthor = user && user === post.author.username;

  const handleDelete = async () => {
    if (!window.confirm("정말삭제 하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/board/${post.id}`);
      alert("게시글 삭제 성공!");
      navigate("/board");
    } catch (err) {
      console.error(err);
      if (err.response.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else {
        alert("삭제 실패");
      }
    }
  };

  //날짜 format함수 -> 날짜, 시간 출력
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자 : {post.author.username}</p>
      <p>작성일 : {formatDate(post.createDate)}</p>
      <div>{post.content}</div>

      <div>
        <button onClick={() => navigate("/board")}>글목록</button>

        {isAuthor && (
          <>
            <button onClick={() => setEditing(true)}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PostView;
