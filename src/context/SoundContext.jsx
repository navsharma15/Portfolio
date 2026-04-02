import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sounds = useRef({});

  useEffect(() => {
    // 1. Initial Countdown Ticks (Cinematic Bass Ticks)
    sounds.current.tick = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
      volume: 0.6,
    });

    // 2. Cinematic Impact (Countdown End)
    sounds.current.impact = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3'],
      volume: 0.8,
    });

    // 3. Ambient Intro Drone
    sounds.current.introDrone = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2834/2834-preview.mp3'],
      volume: 0.4,
      loop: true,
    });

    // 4. Main Soundtrack (Silent Deep Suspense Drone - DUNE Style Swell)
    sounds.current.soundtrack = new Howl({
      src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3'], // Placeholder for the deep atmospheric orchestral foundation
      volume: 0.1, // Start low
      loop: true,
      fade: [0, 0.3, 8000], // Long cinematic swell over 8 seconds
    });

    // 5. UI Interaction Sounds
    sounds.current.click = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
      volume: 0.5,
    });

    sounds.current.whoosh = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2831/2831-preview.mp3'],
      volume: 0.1, // Reduced for a more subtle transition experience
    });

    sounds.current.uiTick = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
      volume: 0.1,
    });

    return () => {
      // Cleanup sounds on unmount
      Object.values(sounds.current).forEach((sound) => sound.unload());
    };
  }, []);

  // Update mute state
  useEffect(() => {
    Object.values(sounds.current).forEach((sound) => {
      sound.mute(isMuted);
    });
  }, [isMuted]);

  const playSound = (name) => {
    if (sounds.current[name]) {
      sounds.current[name].play();
    }
  };

  const startSoundtrack = () => {
    if (!sounds.current.soundtrack.playing()) {
      sounds.current.soundtrack.play();
    }
  };

  const stopIntroDrone = () => {
    if (sounds.current.introDrone.playing()) {
      sounds.current.introDrone.fade(sounds.current.introDrone.volume(), 0, 1000);
      setTimeout(() => sounds.current.introDrone.stop(), 1000);
    }
  };

  return (
    <SoundContext.Provider value={{
      playSound,
      startSoundtrack,
      stopIntroDrone,
      isMuted,
      setIsMuted,
      hasInteracted,
      setHasInteracted
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundManager = () => useContext(SoundContext);
