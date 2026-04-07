'use client'
import { useState } from "react";
import Modal from "./loginmodal";
import LoginModalContent from "./loginClient";
import RegisterModalContent from "./registermodal";

interface Props {
  modalType: "login" | "register" | null;
  setModalType: (type: "login" | "register" | null) => void;
}

export default function AuthModals({ modalType, setModalType }: Props) {
  return (
    <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
      {modalType === "login" && (
        <LoginModalContent
          onClose={() => setModalType(null)}
          openRegister={() => setModalType("register")}
        />
      )}

      {modalType === "register" && (
        <RegisterModalContent
          onClose={() => setModalType("login")}
        />
      )}
    </Modal>
  );
}
