import { useRef, useState } from 'react';

import type { RoadmapInformation } from '@/views/Home/utils/types';
import type { SwiperRef } from 'swiper/react';

const useRoadmap = (roadmapsData: RoadmapInformation[]) => {
  const tabs = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    title: roadmap.title,
  }));

  const activeRoadmapRef = useRef(0);
  const swiperRef = useRef<SwiperRef>(null);

  const [activeTab, setActiveTab] = useState(roadmapsData[0].id);
  const handleActiveTab = (tabId: string) => {
    activeRoadmapRef.current = roadmapsData.findIndex((roadmap) => roadmap.id === tabId);
    setActiveTab(tabId);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0);
    }
  };

  return {
    tabs,
    activeRoadmapRef,
    swiperRef,
    activeTab,
    handleActiveTab,
  };
};

export default useRoadmap;
