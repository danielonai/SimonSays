import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GameBtn from "../components/GameBtn";
import {
  yellowSound,
  greenSound,
  redSound,
  blueSound,
  startSound,
  loseSound,
} from "../services/Sounds";
import { useReduxDispatch, useReduxSelector } from "../redux/store";
import { setCurrScore } from "../redux/generalSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/routes";

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, "Game">;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

const colors = ["green", "red", "yellow", "blue"];

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  const [isGreenHighlight, setIsGreenHighlight] = useState(false);
  const [isYellowHighlight, setIsYellowHighlight] = useState(false);
  const [isBlueHighlight, setIsBlueHighlight] = useState(false);
  const [isRedHighlight, setIsRedHighlight] = useState(false);

  const darkMode = useReduxSelector(state => state.darkMode);
  const dispatch = useReduxDispatch();

  const preloadSounds = async (): Promise<void> => {
    await Promise.all([
      yellowSound,
      greenSound,
      redSound,
      blueSound,
      startSound,
      loseSound,
    ]);
  };

  useEffect(() => {
    preloadSounds();
  }, []);

  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = async () => {
    if (sequence.length === 0) {
      startSound.play(async (success: any) => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
    }
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const playPressSound = (color: string) => {
    switch (color) {
      case "green":
        greenSound.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
        break;
      case "red":
        redSound.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
        break;
      case "yellow":
        yellowSound.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
        break;
      case "blue":
        blueSound.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
        break;
      default:
        greenSound.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
    }
  };

  const handleColorClick = async (color: string) => {
    if (playing) {
      const clickColor = color;

      if (sequence[playingIdx] === clickColor) {
        playPressSound(color);

        // clicked the last color of the sequence
        if (playingIdx === sequence.length - 1) {
          setTimeout(() => {
            setPlayingIdx(0);
            addNewColor();
          }, 250);
        }

        // missing some colors of the sequence to be clicked
        else {
          setPlayingIdx(playingIdx + 1);
        }
      }
      // clicked the incorrect color of the sequence
      else {
        loseSound.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
        gameOver();
      }
    }
  };

  const gameOver = () => {
    dispatch(setCurrScore(sequence.length - 1));
    resetGame();
    navigation.navigate("Scores");
  };

  const idxToColor = (color: string): Dispatch<SetStateAction<boolean>> => {
    switch (color) {
      case "green":
        return setIsGreenHighlight;
      case "red":
        return setIsRedHighlight;
      case "yellow":
        return setIsYellowHighlight;
      case "blue":
        return setIsBlueHighlight;
      default:
        return setIsGreenHighlight;
    }
  };

  useEffect(() => {
    // shows the sequence
    if (sequence.length > 0) {
      const showSequence = async (idx = 0) => {
        const booleanToActive = idxToColor(sequence[idx]);
        booleanToActive(true);
        playPressSound(sequence[idx]);
        await new Promise(resolve => setTimeout(resolve, 1000));

        booleanToActive(false);
        if (idx < sequence.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 250));
          showSequence(idx + 1);
        }
      };

      showSequence();
    }
  }, [sequence]);

  return (
    // Main container
    <View
      style={[
        { backgroundColor: darkMode ? "#333333" : "white" },
        styles.container,
      ]}
    >
      {/* Game container */}
      {sequence.length > 0 && (
        <Text style={styles.Title}>Score: {sequence.length - 1}</Text>
      )}
      <View style={styles.gameContainer}>
        {/* Green and red container */}
        <View style={styles.rowContainer}>
          {/* Green button */}
          <GameBtn
            color="green"
            onPress={() => handleColorClick("green")}
            isHighlight={isGreenHighlight}
          />

          {/* Red button */}
          <GameBtn
            color="red"
            onPress={() => handleColorClick("red")}
            isHighlight={isRedHighlight}
          />
        </View>

        {/* Yellow and blue container */}
        <View style={styles.rowContainer}>
          {/* Yellow button */}
          <GameBtn
            color="yellow"
            onPress={() => handleColorClick("yellow")}
            isHighlight={isYellowHighlight}
          />

          {/* Blue button */}
          <GameBtn
            color="blue"
            onPress={() => handleColorClick("blue")}
            isHighlight={isBlueHighlight}
          />
        </View>

        {/* Play button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.playButton}
          onPress={handleNextLevel}
        >
          <Text style={styles.playButtonText}>
            {sequence.length === 0 ? "Play" : `Round: ${sequence.length}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Title: {
    fontSize: 32,
    alignSelf: "center",
    position: "absolute",
    top: 30,
  },
  gameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  playButton: {
    position: "absolute",
    backgroundColor: "#333333",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 87.5,
    width: 175,
    height: 175,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default GameScreen;
