// src/MyCanvas.js
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Sparkles, DirectionalLight } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Floor from './Floor';
import Sphere from './Sphere';
import Beats from './Beats';
import synth1 from './Assets/Sounds/001_C.wav'
import synth2 from './Assets/Sounds/002_C.wav'
import synth3 from './Assets/Sounds/010_C.wav'
import synth4 from './Assets/Sounds/024_G.wav'
import synth5 from './Assets/Sounds/025_F.wav'
import synth6 from './Assets/Sounds/027_C.wav'
import synth7 from './Assets/Sounds/034_C.wav'
import synth8 from './Assets/Sounds/039_E.wav'
import './MyCanvas.css'

const MyCanvas = () => {
  const camera = useRef();

  const [started, setStarted] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [volume, setVolume] = useState(0.1)

  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);
  }, []);

  const startExperience = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        setStarted(true);
      });
    } else {
      setStarted(true);
    }
  };

  const stopExperience = () => {
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend().then(() => {
        setStarted(false);
      });
    }
  };

  const randomTempo = (min, max) => {
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
      throw new Error("Invalid arguments: min and max should be numbers and min should be less than or equal to max.");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div id='appWrapper'>
        {!started && <button id='start' onClick={startExperience}>Start</button>}
        {started && <button id='stop' onClick={stopExperience}>Stop</button>}
    <Canvas style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <PerspectiveCamera ref={camera} rotation={[0.5, -1.5, 0]} position={[1, 0, -7]}>
        <directionalLight intensity={1} color={'white'} castShadow position={[-1, 100, 0]} />
        <directionalLight intensity={100} color={'#ffda9d'} castShadow position={[5, -50, 0]} />
        <Sparkles number={100} size={15} color={'blue'} scale={[50, 50, 50]} />
        <Sparkles number={100} size={15} color={'purple'} scale={[50, 50, 50]} />
        <Sparkles number={100} size={5} color={'white'} scale={[50, 50, 50]} />
        <Physics rotation={[0, Math.PI / 2, 0]} gravity={[0, -9.80, 0]}>
          {started && <>
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth1} mass={1} type={'Dynamic'} position={[0, 10, 0]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth2} mass={1} type={'Dynamic'} position={[5, 10, 0]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth3} mass={1} type={'Dynamic'} position={[-5, 10, 0]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth4} mass={1} type={'Dynamic'} position={[0, 10, 5]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth5} mass={1} type={'Dynamic'} position={[0, 10, -5]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth6} mass={1} type={'Dynamic'} position={[0, 10, 0]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth7} mass={1} type={'Dynamic'} position={[5, 10, 0]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth8} mass={1} type={'Dynamic'} position={[-5, 10, 0]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth4} mass={1} type={'Dynamic'} position={[0, 10, 5]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
            <Beats volume={volume} tempo={randomTempo(1,20)} offset={false} soundFile={synth5} mass={1} type={'Dynamic'} position={[0, 10, -5]} radius={0.5} color={'#6d29ff'} opacity={0.9} />
          </>}
          <Sphere mass={0} type={'Static'} position={[0, 0, 0]} radius={1} color={'#ec00ff'} opacity={0.1} />
          <Sphere mass={0} type={'Static'} position={[5, 0, 0]} radius={1} color={'#6d29ff'} opacity={0.1} />
          <Sphere mass={0} type={'Static'} position={[-5, 0, 0]} radius={1} color={'#ff7800'} opacity={0.1} />
          <Sphere mass={0} type={'Static'} position={[0, 0, 5]} radius={1} color={'#55ff00'} opacity={0.1} />
          <Sphere mass={0} type={'Static'} position={[0, 0, -5]} radius={1} color={'#6aa4ff'} opacity={0.1} />
          <Floor /> 
        </Physics>
      </PerspectiveCamera>
      <OrbitControls />
    </Canvas>
    </div>
  );
};

export default MyCanvas;
