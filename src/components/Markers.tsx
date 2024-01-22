/* global kakao */
import { useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { StoreType } from "@/interface";

interface MarkersProps {
  map: any;
  storeDatas: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  storeDatas,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    // 식당 데이터 가져오기
    storeDatas?.map((store) => {
      const markerPosition = new window.kakao.maps.LatLng(
        store?.lat,
        store?.lng
      );

      const imageSrc = store?.category
        ? `/images/markers/${store?.category}.png`
        : `/images/markers/default.png`; // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      const content = `<div class="infowindow">${store?.name}</div>`; // 인포윈도우에 표시될 내용

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
        customOverlay.setMap(map);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
        customOverlay.setMap(null);
      });

      //선택한 가게 저장
      window.kakao.maps.event.addListener(marker, "click", function () {
        setCurrentStore(store);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, storeDatas]);

  useEffect(() => {
    if (!map) return;
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}