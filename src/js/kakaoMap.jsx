import React, { useEffect, useRef } from 'react';
import '../css/LocationScreen.css';
import '../css/traininfo_user.css';

const KakaoMap = (props) => {
  const isFirstMessage = useRef(true);
  const { onSetTrainNumber, userId = "Default UserId", userName = "Default UserName", mapRef, markerRef } = props;

  useEffect(() => {
    // 서버에서 이벤트 스트림을 구독. (1) 승차 (2) 하차
    const eventSource1 = new EventSource(`http://15.164.219.39:8079/stream/${userId}`);
    const eventSource2 = new EventSource(`http://15.164.219.39:8079/stream/subway/${userId}`);

    eventSource1.onmessage = event1 => {
      const newMessage = JSON.parse(event1.data);

      if (newMessage.trainNum !== '') {
        console.log("탑승 위치 정보 :", newMessage.locationX, ",", newMessage.locationY);
        onSetTrainNumber(newMessage.trainNum);
        console.log("탑승 열차 정보 :", newMessage.trainNum);

        if (isFirstMessage.current) {
          initializeMap(userId, mapRef, markerRef, newMessage.locationX, newMessage.locationY);
          isFirstMessage.current = false;
        } else {
          updateMarkerPosition(mapRef, markerRef, newMessage.locationX, newMessage.locationY);
        }
      }
    };

    eventSource1.onerror = error => {
      console.error('EventSource failed:', error);
      eventSource1.close();
    };

    eventSource2.onmessage = event2 => {
      const newMessage = JSON.parse(event2.data);

      if (newMessage.trainNum === '') {
        console.log("하차 위치 정보 :", newMessage.locationX, ",", newMessage.locationY);
        onSetTrainNumber('');
        console.log("열차 번호 ''으로 세팅");

        if (isFirstMessage.current) {
          initializeMap(userId, mapRef, markerRef, newMessage.locationX, newMessage.locationY);
          isFirstMessage.current = false;
        } else {
          updateMarkerPosition(mapRef, markerRef, newMessage.locationX, newMessage.locationY);
        }
      }
    };

    eventSource2.onerror = error => {
      console.error('EventSource2 failed:', error);
      eventSource2.close();
    };

    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.relayout();
        mapRef.current.setCenter(markerRef.current.getPosition());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      eventSource1.close();
      eventSource2.close();
      window.removeEventListener('resize', handleResize);
    };
  }, [userId, mapRef, markerRef, userName, onSetTrainNumber]);

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

const updateMarkerPosition = (mapRef, markerRef, newX, newY) => {
  const newPosition = new window.kakao.maps.LatLng(newX, newY);
  if (markerRef.current && mapRef.current) {
    markerRef.current.setPosition(newPosition);
    mapRef.current.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
    mapRef.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
    mapRef.current.setCenter(newPosition);
  } else {
    console.error('Marker or Map ref is not initialized');
  }
};

const initializeMap = (userId, mapRef, markerRef, newX, newY) => {
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
