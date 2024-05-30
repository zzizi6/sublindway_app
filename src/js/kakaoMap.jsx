import React, { useEffect, useRef } from 'react';
import '../css/LocationScreen.css';
import '../css/traininfo_user.css';

// 카카오 맵
const KakaoMap = (props) => {
  const { onSetTrainNumber, userId = "Default UserId", userName = "Default UserName", mapRef, markerRef } = props;

  const initializeMap = (newX, newY) => {
    const container = document.getElementById('map');
    if (!container) {
      console.error('Map container not found');
      return;
    }
    const options = {
      center: new window.kakao.maps.LatLng(newX, newY),
      level: 3
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    var icon = new window.kakao.maps.MarkerImage(
      'https://ifh.cc/g/f8DjJl.png',
      new window.kakao.maps.Size(50, 70),
      {
        offset: new window.kakao.maps.Point(50, 70),
        alt: "마커 이미지 예제",
        shape: "poly",
        coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
      });

    const marker = new window.kakao.maps.Marker({ position: options.center, image: icon });
    marker.setMap(map);
    markerRef.current = marker;

    window.kakao.maps.event.addListener(marker, 'click', async () => {
      const imageUrl = await fetchImageUrl(userId);
      if (imageUrl) {
        const content = `<div style="padding:10px;"><img src="${imageUrl}" width="250" height="200" alt="Loaded Image"></div>`;
        const infowindow = new window.kakao.maps.InfoWindow({ content, removable: true });
        infowindow.open(map, marker);
      } else {
        alert("Failed to load image.");
      }
    });
  };

  useEffect(() => {
    // 임의의 위치로 지도 초기화
    initializeMap(37.5665, 126.9780); // 서울 시청 좌표

    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.relayout();
      } else {
        initializeMap(37.5665, 126.9780);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mapRef, markerRef, userId]);

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

// 이미지 fetch
const fetchImageUrl = async (userId) => {
  const apiUrl = `http://15.164.219.39:8079/find-image-uuid?kakaoId=${userId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    const imageUrl = await response.text();
    return `https://greenboogiebucket.s3.ap-northeast-2.amazonaws.com/${imageUrl}`;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

export default KakaoMap;
