import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Sphere from './Sphere';
import MyCanvas from './MyCanvas';
import { AudioContext } from 'standardized-audio-context';

function App() {
  const [started, setStarted] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);
  }, []);

  const startExperience = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('Audio context resumed');
        setStarted(true);
      });
    } else {
      setStarted(true);
    }
  };

  return (
    <div className="App">
      <MyCanvas />
    </div>
  );
}

export default App;
