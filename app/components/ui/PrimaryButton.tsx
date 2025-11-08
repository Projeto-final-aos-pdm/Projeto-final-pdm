import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { COLORS } from '../../styles/OnboardingStyles'; 

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[]; 
  textStyle?: TextStyle | TextStyle[];
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',

},
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.buttonText,
  },
});

export default PrimaryButton;