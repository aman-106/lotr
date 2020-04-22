import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");
// component for creating modal using portal
export default function Modal(props) {
  const el = document.createElement("div");

  useEffect(function() {
    const clsx = !props.show ? "modal off" : "modal";
    modalRoot.className = clsx;
    modalRoot.appendChild(el);

    return function() {
      modalRoot.className = "modal off";
      modalRoot.removeChild(el);
    };
  }, []);

  useEffect(
    function() {
      const clsx = !props.show ? "modal off" : "modal";
      modalRoot.className = clsx;
    },
    [el, props.show]
  );

  return props.show
    ? ReactDOM.createPortal(
        <div className="modal-content">{props.children}</div>,
        modalRoot
      )
    : false;
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
