import { useState } from "react";
import api from "../api/axiosConfig";

function PostEdit({ post, setPost, setEditing }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleUpdate = async () => {
    if (!window.confirm("정말 수정할까요?")) {
      return;
    }
    try {
      const res = await api.put(`/api/board/${post.id}`, { title, content });
      alert("게시글이 수정되었습니다!");
      setPost(res.data); // 새로 수정된글로 post 변수값 변경
      setEditing(false); //상세보기 화면(수정한 글)으로 전환
    } catch (err) {
      console.error(err);
      if (err.response.status === 403) {
        alert("수정 권한이 없습니다.");
      } else {
        alert("수정 실패");
      }
    }
  };

  return (
    <div>
      <h2>글 수정하기</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <div>
        <button onClick={handleUpdate}>저장</button>
        <button onClick={() => setEditing(false)}>취소</button>
      </div>
    </div>
  );
}

export default PostEdit;
