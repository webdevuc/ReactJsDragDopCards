import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableElement from '../DaggableElements/DraggableElement';
import './DragList.css';

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      // prefix,
      content: `item ${randomId}`,
    };
  });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ['todo', 'inProgress', 'done'];

const generateLists = () =>
  lists.reduce((acc, list) => ({ ...acc, [list]: getItems(10, list) }), {});

function DragList() {
  const [elements, setElements] = useState(generateLists());

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (id) => {
    console.log('id----------', id);

    const listCopy = { ...elements };

    console.log('ListCopy----------------', listCopy);

    const sourceList = listCopy[id.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      id.source.index
    );
    listCopy[id.source.droppableId] = newSourceList;
    const destinationList = listCopy[id.destination.droppableId];
    listCopy[id.destination.droppableId] = addToList(
      destinationList,
      id.destination.index,
      removedElement
    );

    setElements(listCopy);
  };
  console.log('Elements---------------', elements);
  return (
    <div className="dragDropContainer">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list-grid">
          {lists.map((list, i) => (
            <DraggableElement key={i} item={elements[list]} list={list} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default DragList;
