import React from 'react';
import { Entity } from 'aframe-react';

export const VTBCard = ({caption, children, pos, data, laneIndex}) => (
  <Entity geometry={{
    primitive: 'box',
    depth: 0.1,
    height: 0.8,
    width: 1.2
  }}
  position={pos}
  material={{
    color: 'white',
    opacity: 1,
    side: 'double'
  }}>
      <Entity geometry={{
        primitive: 'box',
        depth: 0.01,
        height: 0.79,
        width: 0.05
      }}
      position={{ x: -0.57, y: 0.005, z: 0.05 }}
      material={{
        color: 'orange',
        opacity: 1,
        side: 'double'
      }}/>
      <Entity position={{x: 0.13 - (laneIndex * 0.04), y: 0.2, z: 0.175}}
        text={{
          color: 'black',
          align: 'left',
          value: data.label,
          wrapCount: 18,
          opacity: 1,
          width: 1,
          side: 'double'
        }} />
  </Entity>
);