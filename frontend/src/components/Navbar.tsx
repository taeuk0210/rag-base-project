import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "8px 16px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "12px" }}>
        홈
      </Link>
      <Link to="/docs" style={{ marginRight: "12px" }}>
        문서 목록
      </Link>
      <Link to="/profile">프로필</Link>
    </nav>
  );
}

export default Navbar;
