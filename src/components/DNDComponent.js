import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "./Grid";
import { Image } from "./Image";
import { SortableImage } from "./ImageSort";
import UploadImage from "./AddImages";

const DragAndDrop = ({ images, checked, handleCheck }) => {
  const [items, setItems] = useState(
    [...images].map((item) => item?.id?.toString())
  );

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    setItems([...images].map((item) => item?.id?.toString()));
  }, [images]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={5}>
          {items.map((item, index) => {
            const [image] = images.filter((image) => image.id === item);

            return (
              <SortableImage
                key={item}
                sort={item}
                image={image}
                checked={checked}
                handleCheck={handleCheck}
                index={index}
              />
            );
          })}
          <UploadImage />
        </Grid>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Image
            image={activeId}
            checked={checked}
            handleCheck={handleCheck}
            overlay
            index={items.indexOf(activeId)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    const [active] = images.filter((item) => item.id === event.active.id);

    setActiveId(active);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};

export default DragAndDrop;
