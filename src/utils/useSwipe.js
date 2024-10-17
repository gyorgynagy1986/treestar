import { useState, useRef } from "react";

const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX, touchEndX);
  };

  const handleSwipe = (startX, endX) => {
    if (startX - endX > threshold) {
      onSwipeLeft();
    } else if (endX - startX > threshold) {
      onSwipeRight();
    }
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useSwipe;
