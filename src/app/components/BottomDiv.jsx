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
      divRef.current.classList.add("slide-out-bottom");
      divRef.current.classList.remove("slide-in-bottom");
      setTimeout(() => {
        divRef.current.classList.add("hidden");
        divRef.current.classList.remove("absolute");
      }, 200);
    }
    console.log("BottomDiv is open: ", props.isOpen);
  }, [props.isOpen]);

  return (
    <div
      ref={divRef}
      className=" bottom-0 left-0 right-0 hidden h-fit overflow-hidden rounded-lg border border-blue-200 bg-gray-100 p-2 px-2 py-4 shadow-md md:mx-auto md:mb-4 md:w-fit md:min-w-[40rem]"
    >
      {props.children}
    </div>
  );
}
