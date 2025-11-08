import React from 'react';
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { COLORS } from '../../styles/OnboardingStyles'; 

interface AuthInputProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const AuthInput: React.FC<AuthInputProps> = ({ 
  iconName, 
  placeholder, 
  secureTextEntry = false, 
  value, 
  onChangeText, 
  keyboardType = 'default' 
}) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons 
        name={iconName} 
        size={24} 
        color={COLORS.textSecondary} 
        style={styles.icon} 
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
        selectionColor={COLORS.textPrimary} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E', 
    borderRadius: 12,
    height: 55,
    marginBottom: 16,
    paddingHorizontal: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
});

export default AuthInput;