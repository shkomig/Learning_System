import { useRef, useCallback } from 'react';
import { useSettings } from '../stores/settings-store';

// Sound effect URLs (will be populated with actual files later)
const SOUNDS = {
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  click: '/sounds/click.mp3',
  levelUp: '/sounds/level-up.mp3',
  achievement: '/sounds/achievement.mp3',
};

type SoundKey = keyof typeof SOUNDS;

export function useSound() {
  const { soundEnabled, volume } = useSettings();
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Initialize audio elements
  const getAudio = useCallback((key: SoundKey) => {
    if (!audioRefs.current.has(key)) {
      const audio = new Audio(SOUNDS[key]);
      audio.preload = 'auto';
      audioRefs.current.set(key, audio);
    }
    const audio = audioRefs.current.get(key)!;
    audio.volume = volume;
    return audio;
  }, [volume]);

  const playSound = useCallback(
    (key: SoundKey) => {
      if (!soundEnabled) return;

      try {
        const audio = getAudio(key);
        audio.currentTime = 0; // Reset to start
        audio.play().catch((err) => {
          console.warn('Sound play failed:', err);
        });
      } catch (err) {
        console.warn('Sound initialization failed:', err);
      }
    },
    [soundEnabled, getAudio]
  );

  return {
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playClick: () => playSound('click'),
    playLevelUp: () => playSound('levelUp'),
    playAchievement: () => playSound('achievement'),
  };
}


