// SoundManager.js
import { Howl } from 'howler';

const sounds = {
  celebration: new Howl({ src: ['/sounds/celebration.mp3'] }),
  click: new Howl({ src: ['/sounds/click.wav'] }),
  alert: new Howl({ src: ['/sounds/notification.wav'] }),
  lose: new Howl({ src: ['/sounds/lose.mp3'] })
};

export const playSound = (sound) => {
  if (sounds[sound]) {
    sounds[sound].play();
  }
};

export const stopAllSounds = () => {
  Object.values(sounds).forEach((sound) => sound.stop());
};
