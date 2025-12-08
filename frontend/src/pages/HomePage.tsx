import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>메인 화면</h1>
      <p>여기서 버튼 눌러서 다른 화면으로 이동할 수 있어.</p>

      <button onClick={() => navigate("/docs")}>문서 목록으로</button>
      <button style={{ marginLeft: "8px" }} onClick={() => navigate("/profile")}>
        프로필로
      </button>
    </div>
  );
}

export default HomePage;