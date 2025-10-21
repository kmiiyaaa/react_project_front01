import "./Board.css";
import api from "../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Board({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //게시글 목록 불러오기

  const loadPost = async () => {
    try {
      const res = await api.get("/api/board");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  //글쓰기 버튼 클릭
  const handleWrite = () => {
    if (!user) {
      alert("로그인 후 글 작성 가능");
      return;
    }
    navigate("/board/write");
  };

  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };

  return (
    <div>
      <h2>게시판</h2>
      {loading && <p>게시판 글 리스트 로딩 중...</p>}
      {/*로딩 중에는 로딩 메시지, 다 불러오면 실제 내용을 보여주는 역할*/}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts
              .slice() // 얕은 복사
              .map((p, index) => (
                <tr key={p.id}>
                  <td>{posts.length - index}</td>
                  <td
                    className="click-title"
                    onClick={() => navigate(`/board/${p.id}`)}
                  >
                    {p.title}
                  </td>
                  <td>{p.author.username}</td>
                  <td>{formatDate(p.createDate)}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="4">게시물이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={handleWrite}>글쓰기</button>
      </div>
    </div>
  );
}

export default Board;
