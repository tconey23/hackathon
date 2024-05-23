import { usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import React from 'react';

const Floor = (props) => {
  const [ref] = usePlane(() => ({
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0,-10,0],
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={'purple'} transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Floor;
