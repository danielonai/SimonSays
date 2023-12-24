import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";

interface GameBtnProps extends TouchableOpacityProps {
  color?: string;
  border?: string;
  isHighlight?: boolean;
  onClick?: ((event: GestureResponderEvent) => void) | undefined;
  brightness?: number;
}

const GameBtn: React.FC<GameBtnProps> = ({ color, isHighlight, onPress }) => {

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: isHighlight ? "#c8d3e4" : color,
          borderTopRightRadius: color === 'red' ? 100 : 0,
          borderBottomRightRadius:  color === 'blue' ? 100 : 0,
          borderBottomLeftRadius: color === 'yellow' ? 100 : 0,
          borderTopLeftRadius:  color === 'green' ? 100 : 0,
          width: 175,
          height: 175,
          margin: 2,
        },
        styles.button,
      ]}
      onPress={onPress}
    />
  );
};

export default GameBtn;

const styles = StyleSheet.create({
  button: {},
});
