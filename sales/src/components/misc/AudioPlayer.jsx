import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ source }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeout(()=>{
        audioRef.current.play();
    },2000)
  }, []);

  return (
    <audio controls ref={audioRef}>
      <source src={source} type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
