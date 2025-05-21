import { useState } from "react";

export function useDragGesture() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [direction, setDirection] = useState<"" | "left" | "right">("");
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setDragOffset(0);
    if (e.type === "touchstart") {
      setTouchStart((e as React.TouchEvent).touches[0].clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    let clientX: number;
    if (e.type === "touchmove") {
      clientX = (e as React.TouchEvent).touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    let newOffset: number;
    if (e.type === "touchmove" && touchStart !== null) {
      newOffset = clientX - touchStart;
    } else {
      newOffset = clientX - window.innerWidth / 2;
    }

    setDragOffset(newOffset);

    if (newOffset > 100) {
      setDirection("right");
    } else if (newOffset < -100) {
      setDirection("left");
    } else {
      setDirection("");
    }
  };

  const handleDragEnd = (onDirectionChange: (direction: "left" | "right" | "") => void) => {
    onDirectionChange(direction);

    setIsDragging(false);
    setDragOffset(0);
    setDirection("");
    setTouchStart(null);
  };

  return {
    isDragging,
    dragOffset,
    direction,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
