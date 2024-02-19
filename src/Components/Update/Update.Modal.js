import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  
 

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


export default Modal;
