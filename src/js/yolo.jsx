import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/gallery.css';

const user = JSON.parse(sessionStorage.getItem('user'));


const Yolo = () => {
  const navigate = useNavigate();
  let imageList = [];

  useEffect(() => {

    fetchImageUrl(user.userId);

  }, []);

  // 이미지 fetch
  const fetchImageUrl = async (userId) => {
    const apiUrl = `http://15.164.219.39:8079/find-image/by-kakaoId?kakaoId=${userId}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      imageList = await JSON.parse(response);

      // const imageUrl = await response.text();

      // return `https://greenboogiebucket.s3.ap-northeast-2.amazonaws.com/${imageUrl}`;

    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  return (
    <div className="container">
      {/* 메뉴 스크린 생성 */}
      <div className="menu-container">
        <div className="menu-screen">
          <h1 className="menu-title" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>GreenBoogie</h1>
          <h2 className="menu-id" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>{user.userName} 님</h2>
          <button className="menu-button" onClick={() => navigate('/locationMap')} style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>나가기</button>
        </div>
      </div>

      <div className='gallery'>
        {imageList.map((src, index) => (
          <div className='gallery-item' key={index} >
            <img src={`https://greenboogiebucket.s3.ap-northeast-2.amazonaws.com/${src.imageUUID}`} alt={`Gallery image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Yolo