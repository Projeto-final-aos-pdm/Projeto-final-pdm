import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/OnboardingStyles'; 

interface TypeSwitcherProps {
  selectedType: 'Expense' | 'Income';
  onSelect: (type: 'Expense' | 'Income') => void;
}

const TypeSwitcher: React.FC<TypeSwitcherProps> = ({ selectedType, onSelect }) => {
  return (
    <View style={styles.container}>
      {/* Botão Expense */}
      <TouchableOpacity 
        style={[
          styles.button, 
          selectedType === 'Expense' && { backgroundColor: COLORS.expense }
        ]} 
        onPress={() => onSelect('Expense')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name="arrow-up-circle" 
          size={20} 
          color={selectedType === 'Expense' ? '#FFF' : COLORS.textSecondary} 
        />
        <Text style={[
          styles.text, 
          selectedType === 'Expense' ? styles.textSelected : styles.textUnselected
        ]}>Expense</Text>
      </TouchableOpacity>

      {/* Botão Income */}
      <TouchableOpacity 
        style={[
          styles.button, 
          selectedType === 'Income' && { backgroundColor: COLORS.income }
        ]} 
        onPress={() => onSelect('Income')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name="arrow-down-circle" 
          size={20} 
          color={selectedType === 'Income' ? '#FFF' : COLORS.textSecondary} 
        />
        <Text style={[
          styles.text, 
          selectedType === 'Income' ? styles.textSelected : styles.textUnselected
        ]}>Income</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
  },
  text: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  textSelected: {
    color: '#FFFFFF',
  },
  textUnselected: {
    color: COLORS.textSecondary,
  },
});

export default TypeSwitcher;