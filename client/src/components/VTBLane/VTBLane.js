import React from 'react';
import { Entity } from 'aframe-react';

export const VTBLane = ({caption, children, pos}) => (
  <Entity geometry={{
    primitive: 'box',
    depth: 0.05,
    height: 5.5,
    width: 1.5
  }}
  position={pos}
  material={{
    color: '#696a6d',
    opacity: 1.0,
    side: 'double'
  }}>
    {children}
  </Entity>
);