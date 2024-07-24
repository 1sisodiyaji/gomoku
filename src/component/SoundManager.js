 import { Howl } from 'howler';

const sounds = { 
  alert : new Howl({src :['/sounds/notification.wav']}),
  click: new Howl({ src: ['/sounds/click.wav'] }),
  celebration: new Howl({ src: ['/sounds/celebration.mp3'] }),
  lose : new Howl({ src: ['/sounds/lose. mp3']}),
};

const playSound = (type) => {
  if (sounds[type]) {
    sounds[type].play();
  }
};

export default playSound;
