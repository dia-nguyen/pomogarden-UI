import React, { useState, useEffect } from "react";
import "./style.scss";

const Cursor = ({cursorClass}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      className={`cursor ${cursorClass}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default Cursor;
