import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { useReduxDispatch, useReduxSelector } from '../redux/store';
import { setCurrScore } from '../redux/generalSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../routes/routes';

type ScoresScreenProps = NavigationProps<'Scores'>;

type ScoresList = UserScore[];
type UserScore = {
  name: string;
  score: number;
};

const ScoresScreen: React.FC<ScoresScreenProps> = ({navigation}) => {
  const [scoresList, setScoresList] = useState<ScoresList | []>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const currScore = useReduxSelector(state => state.currScore);
  const darkMode = useReduxSelector(state => state.darkMode);

  const dispatch = useReduxDispatch();


  useEffect(() => {
    setListFromStorage();
    if (currScore > 0) {
      checkForHighScore();
    }
  }, [currScore]);

  const setListFromStorage = async () => {
    const listFromStorage = await AsyncStorage.getItem('scores-list');

    setScoresList(listFromStorage ? JSON.parse(listFromStorage) : []);
  };

  const checkForHighScore = () => {
    const lowestScore = scoresList.pop();
    if (
      (lowestScore && lowestScore.score < currScore) ||
      scoresList.length < 10
    ) {
      setModalVisible(true);
    }
  };

  const handleInputChange = (text: string) => {
    setUserName(text);
  };

  const onSubmitName = async () => {
    const updatedScores = [...scoresList];
    let insertIndex = updatedScores.findIndex(score => currScore > score.score);

    if (insertIndex === -1) {
      insertIndex = updatedScores.length;
    }

    updatedScores.splice(insertIndex, 0, { name: userName.length > 0 ? userName : 'Anonymous', score: currScore });

    if (updatedScores.length > 10) {
      updatedScores.pop();
      setModalVisible(false);
    }

    setScoresList([...updatedScores]);
    dispatch(setCurrScore(0));
    setModalVisible(false);
    await AsyncStorage.setItem('scores-list', JSON.stringify(updatedScores));
  };

  return (
    <View style={[{ backgroundColor: darkMode ? '#333333' : 'white' },styles.container]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>High Score!</Text>
          <Text style={styles.modalText}>
            Please enter your name for the high scores list
          </Text>
          <TextInput
            value={userName}
            onChangeText={handleInputChange}
            placeholder="Enter your name"
            style={styles.input}
          />
          <Button title="Submit" onPress={onSubmitName} />
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.newGameButton}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={[styles.newGameButtonText]}>New Game</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={[{ color: darkMode ? "white" : "#333333" },styles.title]}>High Scores</Text>
      </View>
      <View style={styles.scoreList}>
        {scoresList.map((item, idx) => (
          <View key={item.name} style={styles.scoreItem}>
            <Text style={[{ color: darkMode ? "white" : "#333333" },styles.scoreText]}>{`${idx + 1}. ${item.name} (score: ${
              item.score
            })`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    display: 'flex',
    width: 300,
    height: 200,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    top: '30%',
    left: '10%',
    borderWidth:1,
    borderColor:'black',
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333333',
    paddingHorizontal: 10,
    paddingVertical:5,
    borderRadius:10,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 40,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  newGameButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 0,
  },
  newGameButtonText: {
    fontSize: 16,
    color: 'blue', 
  },
  scoreList: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scoreItem: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
  },
});

export default ScoresScreen;