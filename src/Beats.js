import React, { useState, useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import useSound from 'use-sound';

const Beat = ({ id, position, radius, color, opacity, onCollide, soundFile, volume }) => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: position,
    args: [radius],
    type: 'Dynamic',
    restitution: 10,
    onCollide: (e) => onCollide(id, e),
  }));

  return (
    <group>
      <mesh ref={ref}>
        {/* <ambientLight color={color} intensity={1} /> */}
        <directionalLight position={[0,0,0]} intensity={1}/>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshLambertMaterial color={color} transparent opacity={opacity} />
      </mesh>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} height={300} />
      </EffectComposer>
    </group>
  );
};

const Beats = (props) => {
  const [beats, setBeats] = useState([]);
  const [play] = useSound(props.soundFile, { volume: props.volume });
  const idCounter = useRef(0);


  const randomTempo = (min, max) => {
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
      throw new Error("Invalid arguments: min and max should be numbers and min should be less than or equal to max.");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    let interval;
    if(props.offset){
      interval = setInterval(() => {
        setBeats((prevBeats) => [
          ...prevBeats,
          {
            id: idCounter.current++,
            position: props.position,
            radius: props.radius,
            color: props.color,
            opacity: props.opacity,
          },
        ]);
      }, 120000 / props.tempo);
    } else {
      interval = setInterval(() => {
        setBeats((prevBeats) => [
          ...prevBeats,
          {
            id: idCounter.current++,
            position: props.position,
            radius: props.radius,
            color: props.color,
            opacity: props.opacity,
          },
        ]);
      }, 60000 / randomTempo(1,60));
    }
    return () => clearInterval(interval);
  }, [props.position, props.radius, props.color, props.opacity, props.tempo]);

  const handleCollision = (id, e) => {
    if (e.body) {
      play();
        setBeats((prevBeats) => prevBeats.filter((beat) => beat.id !== id));
  
    }
  };

  return (
    <group>
      {beats.map((beat) => (
        <Beat
          key={beat.id}
          id={beat.id}
          position={beat.position}
          radius={beat.radius}
          color={beat.color}
          opacity={beat.opacity}
          onCollide={handleCollision}
          soundFile={props.soundFile}
          volume={props.volume}
        />
      ))}
    </group>
  );
};

export default Beats;
