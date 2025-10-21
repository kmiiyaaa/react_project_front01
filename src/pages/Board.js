import "./Board.css";
import api from "../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Board({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  //게시글 목록 불러오기

  const loadPost = async (page = 0) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/board?page=${page}&size=10`);
      setPosts(res.data.posts); // 전체 게시글 -> 개시글의 배열
      setCurrentPage(res.data.currentPage); //현재 페이지 번호
      setTotalPages(res.data.totalPages); //전체 페이지 수
      setTotalItems(res.data.setTotalItems); //모든 글의 갯수
    } catch (err) {
      console.error(err);
      setError("게시글을 불러오는데 실패하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  //글쓰기 버튼 클릭
  const handleWrite = () => {
    //로그인한 유저만 글쓰기
    if (!user) {
      alert("로그인 후 글 작성 가능");
      return;
    }
    navigate("/board/write");
  };

  useEffect(() => {
    loadPost(currentPage);
  }, [currentPage]);

  //페이지 번호 그룹 배열 반환 함수(10개까지만)
  const getPageNumbers = () => {
    const startPage = Math.floor(currentPage / 10) * 10;
    const endPage = startPage + 10 > totalPages ? totalPages : startPage + 10;

    const pages = [];
    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  //날짜 함수
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

      {/* 페이지 번호와 이동 화살표 출력 */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
          ◀◀
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          ◀
        </button>

        {/* 페이지 번호 그룹 10개씩 출력 */}
        {getPageNumbers().map((num) => (
          <button
            className={num === currentPage ? "active" : ""}
            key={num}
            onClick={() => setCurrentPage(num)}
          >
            {num + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || totalPages === 0}
        >
          ▶
        </button>

        <button
          onClick={() => setCurrentPage(totalPages - 1)}
          disabled={currentPage === totalPages - 1 || totalPages === 0}
        >
          ▶▶
        </button>
      </div>

      <div>
        <button onClick={handleWrite}>글쓰기</button>
      </div>
    </div>
  );
}

export default Board;
