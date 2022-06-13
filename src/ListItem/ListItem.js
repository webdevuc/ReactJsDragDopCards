import { Draggable } from 'react-beautiful-dnd';
import { LoremIpsum } from 'lorem-ipsum';
import { generateFromString } from 'generate-avatar';
import React, { useMemo, useState, useEffect } from 'react';

import './ListItem.css';

const lorem = new LoremIpsum();

const ListItem = ({ item, index }) => {
  const loremHeader = useMemo(() => lorem.generateWords(10), []);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const delay = imageUrl ? 2000 : 0;

    setTimeout(async () => {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        setImageUrl(data.message);
      } catch (e) {
        console.error('Error', e);
      }
    }, delay);
  }, [imageUrl]);
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            className="dragItem"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="cardHeader">{loremHeader}</div>

            <img src={imageUrl} alt="Random doggo!" className="images" />
            <div className="cardFooter">
              <span>{item.content}</span>
              <div className="author">
                <p className="item-id">{item.id}</p>
                <img
                  className="avatar-img"
                  src={`data:image/svg+xml;utf8,${generateFromString(item.id)}`}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
