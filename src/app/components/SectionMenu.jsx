import React from "react";

const HomeSection = ({ data }) => {
  return (
    <div className="section-menu">
      <ul id="menu">
        {data.map((item, index) => (
          <li key={index}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeSection;
