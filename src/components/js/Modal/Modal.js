import React from 'react';
import './Modal.css';

export default function Modal(props) {
  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-modal">
          {props.children}
      </div>
    </div>
  );
}