import React, { useState, useEffect, useRef } from "react";

const useOutsideAlerter = (ref: any, close: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        close(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, close]);
};

const Dropdown = ({
  dropdownDefault,
  items,
  onSelect,
  className,
}: {
  dropdownDefault: any;
  items: { name: string; component: React.ReactNode }[];
  onSelect: (i: number) => void;
  className?: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShow);

  const toggle = () => {
    setShow(!show);
  };
  const handleSelectItem = (i: number) => {
    onSelect(i);
    setShow(false);
  };
  return (
    <div className="relative w-full">
      <button
        className="h-12 w-full flex justify-between items-center p-3"
        onClick={toggle}
      >
        <div className="flex gap-1 items-center">{dropdownDefault}</div>
        <div className="border-l-2 border-b-2 border-solid border-black p-[2px] -rotate-45" />
      </button>
      {show && items.length !== 0 && (
        <div
          className="absolute left-0 p-2 flex flex-col gap-1 w-[112px] bg-primary rounded-lg z-[100] shadow-[0_5px_5px_2px_rgba(0,0,0,0.3)] bg-white dark:bg-[#131740]"
          ref={wrapperRef}
        >
          {items.map((item, index) => (
            <button
              className="flex gap-1 p-1 w-full items-center hover:bg-jacarta-200 rounded-lg"
              key={index}
              onClick={() => handleSelectItem(index)}
            >
              {item.component}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
