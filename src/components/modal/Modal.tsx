import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import closeIcon from "../../assets/icons/close.png";

const modalRoot = document.getElementById("modal") as Element;

interface ModalProps extends PropsWithChildren {
  title: string;
  closeModal: () => void;
}

export const Modal = ({ title, closeModal, children }: ModalProps) => {
  return createPortal(
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) closeModal();
      }}
      className="modal__backdrop"
    >
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <img
            onClick={closeModal}
            src={closeIcon}
            alt="close"
            className="icon"
          />
        </div>
        <div className="modal__main">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
