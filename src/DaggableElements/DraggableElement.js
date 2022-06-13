import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ListItem from '../ListItem/ListItem';

import './DraggebleElement.css';

const DraggableElement = ({ list, item }) => (
  <>
    {console.log('items DraggableElement-------------------', item)}
    <div className="droppableStyle">
      <div className="column-header">{list}</div>
      <Droppable droppableId={`${list}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {item.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </>
);

export default DraggableElement;
