import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './js/login'; // 로그인 컴포넌트
import LocationMap from './js/locationMap'; // 위치 컴포넌트
import TrainMap from './js/trainMap'; // 열차 컴포넌트
import Yolo from './js/yolo';
import Riding from './js/riding';


function App() {
  /* 세션 통해 데이터 세팅 */
  const setUserInfo = (userId, userName) => {
    const userInfo = {
      userId: `${userId}`,
      userName: `${userName}`,
      trainNum: '',
    }
    sessionStorage.setItem('user', JSON.stringify(userInfo));
  }

  const setTrainNumber = (trainNum) => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const userInfo = {
      userId: `${user.userId}`,
      userName: `${user.userName}`,
      trainNum: `${trainNum}`,
    }
    sessionStorage.setItem('user', JSON.stringify(userInfo));
  }

  return (
    // login -> 아이디세팅
    // LocationMap -> 아이디, 열차번호세팅
    // trainMap -> 아이디, 열차번호

      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* /location 경로는 위치 페이지 */}
          <Route path="/login" element={<Login />} /> {/* 기본 경로는 로그인 페이지 */}
          <Route path="/locationMap" element={<LocationMap onSetUserInfo={setUserInfo} onSetTrainNumber={setTrainNumber} />} /> {/* /location 경로는 위치 페이지 */}
          <Route path="/trainMap" element={<TrainMap />} />
          <Route path="/riding" element={<Riding />} />
          <Route path="/yolo" element={<Yolo />} />
        </Routes>
      </Router>
  
  );
}

export default App;
