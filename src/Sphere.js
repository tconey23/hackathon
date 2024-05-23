import React, { useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import useSound from 'use-sound';
import kickDrum from './Assets/Sounds/kickDrum.wav';

const Sphere = (props) => {
  const [ref] = useSphere(() => ({
    mass: props.mass,
    position: props.position,
    args: [props.radius],
    type: props.type,
    onCollide: (e) => handleCollision(ref, e),
  }));

  const lightRef = useRef();

  const handleCollision = (ref, e) => {
    if (e.body) {
      console.log('Collision detected with:', e.body);
      if (lightRef.current) {
        lightRef.current.intensity = 100;
        setTimeout(() => {
          lightRef.current.intensity = 0;
        }, 100);
      }
    }
  };

  return (
    <group>
      <mesh ref={ref}>
        {/* <rectAreaLight ref={lightRef} intensity={10} width={10} height={10} position={[0, 10, 0]} /> */}
        <sphereGeometry name={props.type} args={[props.radius, 32, 32]} />
        <meshLambertMaterial color={props.color} transparent opacity={props.opacity} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={300} />
        </EffectComposer>
      </mesh>
    </group>
  );
};

export default Sphere;
