import React from 'react';
import { render, screen } from '@testing-library/react';
import GameScreen from '../src/screens/GameScreen.tsx';
import Sound from 'react-native-sound';
import {
  yellowSound,
  greenSound,
  redSound,
  blueSound,
  startSound,
  loseSound,
  highScoreSound,
} from '../src/services/Sounds.ts';

// Mock dependencies
jest.mock('../services/Sounds'); // Mock sound functions
jest.mock('../redux/store'); // Mock Redux store and dispatch
jest.mock('../redux/generalSlice'); // Mock specific Redux actions

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock sound instance methods
const mockSoundInstance = {
  play: jest.fn(),
  release: jest.fn(),
  setCategory: jest.fn(),
};

// Mock the Sound constructor
jest.mock('react-native-sound', () => {
  return jest.fn(() => mockSoundInstance);
});

describe('GameScreen Component', () => {
  test('renders initial state correctly', () => {
    render(<GameScreen />);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.queryByText('Round: 1')).not.toBeInTheDocument(); // Round text not visible
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByTestId('green-button')).not.toHaveStyle({ backgroundColor: 'green' }); // No highlights
    expect(screen.getByTestId('red-button')).not.toHaveStyle({ backgroundColor: 'red' });
    expect(screen.getByTestId('yellow-button')).not.toHaveStyle({ backgroundColor: 'yellow' });
    expect(screen.getByTestId('blue-button')).not.toHaveStyle({ backgroundColor: 'blue' });
  });

  test('renders playing state correctly', () => {
    render(<GameScreen sequence={['green', 'red']} playing={true} playingIdx={0} />);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Round: 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Round: 1' })).toBeInTheDocument(); // Play button changes
    expect(screen.getByTestId('green-button')).toHaveStyle({ backgroundColor: 'green' }); // Green highlighted
    expect(screen.getByTestId('red-button')).not.toHaveStyle({ backgroundColor: 'red' });
    expect(screen.getByTestId('blue-button')).not.toHaveStyle({ backgroundColor: 'blue' });
    expect(screen.getByTestId('yellow-button')).not.toHaveStyle({ backgroundColor: 'yellow' });
  });

  test('renders game over state correctly', () => {
    render(<GameScreen sequence={['green', 'red']} playing={false} />);
    expect(screen.getByText('Score: 1')).toBeInTheDocument(); // Score updated
    expect(screen.queryByText('Round: 1')).not.toBeInTheDocument(); // Round text not visible
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByTestId('green-button')).not.toHaveStyle({ backgroundColor: 'green' }); // No highlights
    expect(screen.getByTestId('red-button')).not.toHaveStyle({ backgroundColor: 'red' });
    expect(screen.getByTestId('blue-button')).not.toHaveStyle({ backgroundColor: 'blue' });
    expect(screen.getByTestId('yellow-button')).not.toHaveStyle({ backgroundColor: 'yellow' });
  });
});

describe('Sounds', () => {
  test('loads sounds successfully', async () => {
    // All sounds should load without errors
    await Promise.all([
      yellowSound,
      greenSound,
      redSound,
      blueSound,
      startSound,
      loseSound,
      highScoreSound,
    ]);

    expect(Sound).toHaveBeenCalledTimes(7); // Verify each sound was created
    expect(Sound.mock.calls).toMatchSnapshot(); // Snapshot for specific calls
  });

  test('plays sounds successfully', async () => {
    const playSound = jest.fn();
    mockSoundInstance.play.mockImplementationOnce(playSound);

    // ... (your assertions)
  });

  // Test error handling
  test('handles loading errors', async () => {
    const errorCallback = jest.fn();
    Sound.mockImplementationOnce(() => {
      throw new Error('Failed to load sound');
    });

    await expect(yellowSound).rejects.toThrow('Failed to load sound');
    // ... (your assertions)
  });

  test('handles playback errors', async () => {
    mockSoundInstance.play.mockImplementationOnce(() => {
      throw new Error('Playback failed');
    });

    await expect(yellowSound.play()).rejects.toThrow('Playback failed');
    // ... (your assertions)
  });

  // Test release method
  test('releases sounds', async () => {
    await yellowSound; // Load the sound
    await yellowSound.release();
    // ... (your assertions)
  });
});
