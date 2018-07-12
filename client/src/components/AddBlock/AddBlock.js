import React from "react";
import {Entity} from 'aframe-react';

const AddBlock = props => (
    <Entity
      id='addBlock'
      geometry={{
        primitive: 'box',
        depth: 0.25,
        height: 0.5,
        width: 0.5
      }}
      position="-2 3.75 -5"
      material={{
        color: 'green',
        opacity: 0.3,
        side: 'double'
      }}
      shadow='receive: true;'
      {...props}
    >
      <Entity id="addItem"
              position="0 0.4 0"
              text={{
                color: 'white',
                align: 'center',
                value: 'Add Item',
                opacity: 1,
                width: 3,
                side: 'double'
              }}
      />
      <Entity
        geometry={{
          primitive: 'box',
          depth: 0.1,
          height: 0.1,
          width: 0.4
        }}
        material={{
          color: 'green',
          opacity: 0.9
        }}
        shadow='receive: true;'
      />
      <Entity
        geometry={{
          primitive: 'box',
          depth: 0.1,
          height: 0.4,
          width: 0.1
        }}
        material={{
          color: 'green',
          opacity: 0.9
        }}
        shadow='receive: true;'
      />
    </Entity>
);

export default AddBlock;