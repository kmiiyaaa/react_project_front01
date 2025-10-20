import "./Board.css";

function Board() {
  return (
    <div>
      <h2>게시판</h2>
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
          {post.length > 0 ? (
            <tr></tr>
          ) : (
            <tr>
              <td colSpan="4">게시물이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
