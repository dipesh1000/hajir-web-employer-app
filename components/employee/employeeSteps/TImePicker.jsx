"use client";
import React, { useState } from "react";

const TimePicker = () => {
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(0);

  const handleIncrement = () => {
    const newMinutes = (minutes + 30) % 60;
    const newHours = hours + Math.floor((minutes + 30) / 60);
    setHours(newHours % 24);
    setMinutes(newMinutes);
  };

  const handleDecrement = () => {
    const newMinutes = (minutes - 30 + 60) % 60;
    const newHours = hours - Math.floor((30 - minutes) / 60);
    setHours((newHours + 24) % 24);
    setMinutes(newMinutes);
  };

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>{`${formatTime(hours)}:${formatTime(minutes)}`}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default TimePicker;
