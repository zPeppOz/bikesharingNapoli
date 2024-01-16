import React from "react";
import "../css/MainApp.css";

function SectionMenu({ data }) {
  return (
    <div
      className="section-menu"
      style={{
        zIndex: "1000",
      }}
    >
      <ul id="menu">
        {data.map((item, index) => (
          <li key={index}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SectionMenu;
