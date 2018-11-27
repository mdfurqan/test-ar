import React from 'react';
import { Entity } from 'aframe-react';

export const VTBBoard = ({caption, children}) => (
  <Entity className='VTBBoard'
          geometry={{
            primitive: 'box',
            depth: 0.1,
            height: 6,
            width: 10
          }}
          position='0 0 -6'
          material={{
            color: '#8c8d92',
            opacity: 1,
            side: 'double'
          }}
          shadow='receive: true;'>
          {'Caption is ' + caption}
    {children}
  </Entity>
);