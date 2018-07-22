import React from "react";
import {Entity} from 'aframe-react';

const CameraCursor = (props) => (
  <Entity
    primitive='a-camera'
    wasd-controls-enabled='false'
  >
    <Entity
      cursor={{fuse: true, fuseTimeout: 500}}
      raycaster={{objects: '.clickable', far: 30}}
      position='0 0 -1'
      geometry='primitive: ring'
      material='color: orange'
      scale='.03 .03 .03'
      animation__scale={{
        property: 'scale',
        dur: 500,
        dir: 'alternate',
        loop: 2,
        easing: 'easeInCirc',
        startEvents: 'fusing',
        to: ' .005 .005 .005',
      }}
    />
    <Entity
      cursor={{
        rayOrigin: 'mouse'
      }}
    />
    {props.children}
  </Entity>
);

export default CameraCursor;