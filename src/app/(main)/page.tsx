"use client";
import SuccessIconModal from "@/components/Modal/SuccessIconModal";
import { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <h1>홈페이지</h1>;<button onClick={handleClick}>모달</button>;
      <SuccessIconModal
        isOpen={isOpen}
        onClose={onClose}
        message="test"
      ></SuccessIconModal>
    </>
  );
};

export default Home;
