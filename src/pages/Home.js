import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2>🏡 우리동네 맛집 커뮤니티</h2>
      <p>여기는 우리 동네 주민들이 소통하는 커뮤니티입니다.</p>
      <p>게시판을 통해 정보를 공유하고, 서로 의견을 나눌 수 있어요!</p>
      <div className="best-section">
  
  <h3>🍽️ 이번 주 인기 맛집</h3>
  <div className="best-list">
    <div className="best-card">
      <img src="https://source.unsplash.com/400x300/?koreanfood" alt="맛집1" />
      <div className="info">
        <h4>홍길동네 김치찌개집</h4>
        <p>매일 아침 끓이는 진한 김치찌개!</p>
      </div>
    </div>

    <div className="best-card">
      <img src="https://source.unsplash.com/400x300/?ramen" alt="맛집2" />
      <div className="info">
        <h4>라멘도깨비</h4>
        <p>진한 육수와 쫄깃한 면발이 일품 🍜</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Home;
