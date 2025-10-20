import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div>🏡 우리동네 커뮤니티</div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/board">게시판</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

export default Navbar;
