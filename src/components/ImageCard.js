import React, { useEffect } from "react";

const ImageCard = ({ image, handleCheck, checked, isDragging, overlay }) => {
  const isSelected = checked.includes(image?.id.toString());

  useEffect(() => {
    const handleCheckboxMouseDown = (event) => {

      event.stopPropagation();
    };

    const checkbox = document.getElementById(`checkbox-${image?.id}`);

    checkbox.addEventListener("mousedown", handleCheckboxMouseDown);
    checkbox.addEventListener("touchstart", handleCheckboxMouseDown);

    return () => {
      checkbox.removeEventListener("mousedown", handleCheckboxMouseDown);
      checkbox.removeEventListener("touchstart", handleCheckboxMouseDown);
    };
  }, [image?.id]);

  return (
    <div className=" border rounded-lg overflow-hidden shadow relative group w-full h-full">
      <div
        className={`absolute h-full w-full bg-black/40 flex items-center transition-all duration-300 justify-center   ${
          isDragging || overlay ? "" : "group-hover:opacity-100"
        }  ${
          isDragging && isSelected
            ? "opacity-0"
            : isSelected
            ? "opacity-40"
            : "opacity-0"
        }`}
      ></div>

      <div
        className={`w-full h-full border-lg ${
          isDragging ? "invisible" : "visible"
        }`}
      >
        <div>
          <img src={image?.img} alt={image?.name} className="w-full" />
        </div>

        <label htmlFor={`product_${image?.id}`}>
          <input
            type="checkbox"
            name="image"
            className={`absolute top-2 left-3  ${
              !overlay ? "group-hover:block" : ""
            } cursor-pointer z-50 ${
              isSelected && !overlay ? "block" : "hidden"
            }`}
            id={`checkbox-${image?.id}`}
            checked={isSelected}
            onChange={handleCheck}
            value={image?.id}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageCard;
