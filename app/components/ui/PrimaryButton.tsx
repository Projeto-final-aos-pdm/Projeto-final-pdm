import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { COLORS } from "../../styles/OnboardingStyles";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled ? styles.disable : ""]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disable: {
    backgroundColor: COLORS.disable,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.buttonText,
  },
});

export default PrimaryButton;
