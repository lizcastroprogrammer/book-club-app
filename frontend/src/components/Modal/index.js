import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export const Modal = ({ title, children, onClose, show }) => {
  const onCloseHandler = (e) => {
    onClose && onClose(e);
  };

  if (!show) {
    return null;
  }
  return (
    <div className="container" onClick={onCloseHandler}>
      <div class="modal" id="modal">
        <div class="content">{children}</div>
        <div class="actions"></div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
