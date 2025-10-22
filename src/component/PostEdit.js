import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function PostEdit({ post, setPost, setEditing }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  // post가 바뀔 때마다 title, content에 기존값 설정
  useEffect(() => {
    setErrors({});

    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
    }
  }, [post]);

  const handleUpdate = async () => {
    if (!window.confirm("정말 수정할까요?")) {
      return;
    }
    try {
      const res = await api.put(`/api/board/${post.id}`, { title, content });
      alert("게시글이 수정되었습니다!");
      setPost({ ...res.data, authorName: post.authorName }); // 새로 수정된글로 post 변수값 변경
      //setPost(res.data) 하게되면 변경된 내용만 들어간다.

      setEditing(false); //상세보기 화면(수정한 글)으로 전환
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrors(err.response.data);
      }
      if (err.response.status === 403) {
        alert("수정 권한이 없습니다.");
      } else {
        alert("수정 실패");
      }
    }
  };

  return (
    <div className="edit-form">
      <h2>글 수정하기</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p style={{ color: "red" }}>{errors.title}</p>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <p style={{ color: "red" }}>{errors.content}</p>
      <div className="button-group">
        <button className="edit-button" onClick={handleUpdate}>
          저장
        </button>
        <button className="delete-button" onClick={() => setEditing(false)}>
          취소
        </button>
      </div>
    </div>
  );
}
export default PostEdit;
