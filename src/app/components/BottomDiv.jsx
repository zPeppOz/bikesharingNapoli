import React, { useEffect, useRef } from "react";
import "../css/BottomDiv.css";
export function BottomDiv(props) {
  const divRef = useRef();

  useEffect(() => {
    if (props.isOpen) {
      divRef.current.classList.remove("hidden");
      divRef.current.classList.remove("slide-out-bottom");
      divRef.current.classList.add("absolute");
      divRef.current.classList.add("slide-in-bottom");
    }
    if (!props.isOpen) {
      divRef.current.classList.remove("slide-in-bottom");
      divRef.current.classList.add("slide-out-bottom");
      setTimeout(() => {
        divRef.current.classList.add("hidden");
        divRef.current.classList.remove("absolute");
      }, 450);
    }
  }, [props.isOpen]);

  return (
    <div
      ref={divRef}
      className=" bottom-0 left-0 right-0 mx-auto mb-4 hidden h-40 w-2/3 overflow-hidden rounded-lg border border-blue-200 bg-slate-200 p-2 shadow-md"
    >
      {props.children}
    </div>
  );
}
