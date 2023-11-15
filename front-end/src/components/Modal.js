import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close Modal</button>
      </div>
    </ReactModal>
  );
};

export default Modal;
