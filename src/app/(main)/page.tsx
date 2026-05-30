"use client";
import WarningModal from "@/components/Modal/WarningModal";
import SuccessModal from "@/components/Modal/SuccessModal";
import SuccessIconModal from "@/components/Modal/SuccessIconModal";
import { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const onClose = () => setIsOpen(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  const onClose2 = () => setIsOpen2(false);
  const handleClick2 = () => {
    setIsOpen2(true);
  };
  const onClose3 = () => setIsOpen3(false);
  const handleClick3 = () => {
    setIsOpen3(true);
  };
  return (
    <>
      <h1>홈페이지</h1>;<button onClick={handleClick}>모달</button>;
      <button onClick={handleClick2}>모달</button>;
      <button onClick={handleClick3}>모달</button>;
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message="test"
      ></SuccessModal>
      <br />
      <SuccessIconModal
        isOpen={isOpen2}
        onClose={onClose2}
        message="test"
      ></SuccessIconModal>
      <br />
      <WarningModal
        isOpen={isOpen3}
        onClose={onClose3}
        message="test"
      ></WarningModal>
    </>
  );
};

export default Home;
