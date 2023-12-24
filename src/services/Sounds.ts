import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);


export const yellowSound = new Sound('yellow.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the yellow sound', error);
    return;
  }
})

export const greenSound = new Sound('green.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the green sound', error);
    return;
  }
});

export const redSound = new Sound('red.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the red sound', error);
    return;
  }
});

export const blueSound = new Sound('blue.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the blue sound', error);
    return;
  }
});

export const startSound = new Sound('start.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the start sound', error);
    return;
  }
});

export const loseSound = new Sound('lose.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the lose sound', error);
    return;
  }
});

export const highScoreSound = new Sound('high_score.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the high score sound', error);
    return;
  }
});

export type { Sound as default }