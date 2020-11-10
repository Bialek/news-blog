import React from "react";
import "./styles.scss";

export default function Articles(props) {
  return (
    <div className={`parent ${props.size}`}>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
      <div className="child"></div>
    </div>
  );
}
