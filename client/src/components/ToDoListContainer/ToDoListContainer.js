import React from 'react';
import { Entity } from 'aframe-react';

export const ToDoListContainer = ({caption, children}) => (
  <Entity className='toDoListContainer'
          geometry={{
            primitive: 'box',
            depth: 0.1,
            height: 6,
            width: 10
          }}
          position='0 1 -5'
          material={{
            color: '#ff0000',
            opacity: 0.3,
            side: 'double'
          }}
          shadow='receive: true;' >
    <Entity geometry={{
              primitive: 'box',
              depth: 0.3,
              height: 5.9,
              width: 7.9
            }}
            material={{
              color: 'blue',
              opacity: 0.3,
              side: 'double'
            }} />
    <Entity className='toDoListHeader'
            position='0 3.5 0'
            text={{
              color: 'white',
              align: 'center',
              value: caption,
              opacity: 1,
              width: 6,
              side: 'double'
            }} />
    {children}
  </Entity>
);