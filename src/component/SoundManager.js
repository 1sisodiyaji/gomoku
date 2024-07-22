import React from 'react';
import { Howl } from 'howler';

const sounds = { 
  click: new Howl({ src: ['/sounds/click.wav'] }),
  celebration: new Howl({ src: ['/sounds/celebration.mp3'] }),
};

const playSound = (type) => {
  if (sounds[type]) {
    sounds[type].play();
  }
};

export default playSound;
