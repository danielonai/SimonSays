import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../screens/GameScreen';
import ScoresScreen from '../screens/ScoresScreen';
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  Game: undefined;
  Scores: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Scores" component={ScoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;