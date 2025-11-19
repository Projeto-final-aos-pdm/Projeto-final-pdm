import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BUDGET_COLORS = [
  '#3F51B5', 
  '#00C853', 
  '#9C27B0', 
  '#F44336', 
  '#FF9800', 
  '#795548', 
  '#607D8B', 
];

interface ColorSelectorProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {BUDGET_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.circle, 
              { backgroundColor: color },
              selectedColor === color && styles.selectedCircle
            ]}
            onPress={() => onSelect(color)}
            activeOpacity={0.8}
          >
            {selectedColor === color && (
              <MaterialCommunityIcons name="check" size={20} color="#FFF" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: '#E0E0E0', 
    transform: [{ scale: 1.1 }], 
  },
});

export default ColorSelector;