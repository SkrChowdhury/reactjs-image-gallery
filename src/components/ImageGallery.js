import React, { useState } from "react";

import DNDComponent from "./DNDComponent";
import { images as data } from "../utils/data";

const ImageGallery = () => {
  const [images, setImages] = useState([...data]);
  const [selected, setSelected] = useState([]);

  const handleCheck = (event) => {
    const updatedSelectedList = [...selected];

    if (event.target.checked) {
      updatedSelectedList.push(event.target.value);
    } else {
      const index = updatedSelectedList.indexOf(event.target.value);

      updatedSelectedList.splice(index, 1);
    }

    setSelected(updatedSelectedList);
  };

  const handleDelete = () => {
    const updatedImagess = images.filter((image) => {
      return !selected.includes(image.id.toString());
    });

    setImages(updatedImagess);

    setSelected([]);
  };

  const totalSelected = selected.length;

  return (
    <div className="bg-white rounded-md w-full h-full">
      <div className="w-full flex py-3 px-5 h-16 items-center justify-between">
        <div>
          {totalSelected > 0 ? (
            <p className="text-gray-600 font-semibold">
              {totalSelected} {totalSelected > 1 ? "Files" : "File"} Selected
            </p>
          ) : (
            <p className="text-gray-600 font-semibold"> Draggable Image Gallery</p>
          )}
        </div>
        <div>
          {totalSelected > 0 && (
            <button
              onClick={handleDelete}
              className="text-red-500 font-semibold"
            >
              Delete {totalSelected > 1 ? "Files" : "File"}
            </button>
          )}
        </div>
      </div>
      <hr />

      <section className="max-w-5xl w-screen p-4">
        <DNDComponent
          images={images}
          checked={selected}
          handleCheck={handleCheck}
        />
      </section>
    </div>
  );
};

export default ImageGallery;
