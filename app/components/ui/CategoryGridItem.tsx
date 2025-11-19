import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  cardBg: '#FFFFFF',
  textPrimary: '#000000',
  border: '#F1F1F1',
  selectedBorder: '#AFFF00', 
};

interface CategoryGridItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  isSelected?: boolean;
}

const CategoryGridItem: React.FC<CategoryGridItemProps> = ({ icon, label, onPress, isSelected }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Ícone Colorido */}
      <MaterialCommunityIcons name={icon} size={32} color={isSelected ? '#000' : '#FFB74D'} />
      
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 110, 
  },
  selectedContainer: {
    borderColor: COLORS.selectedBorder,
    borderWidth: 2,
    backgroundColor: '#F9FFF0', 
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});

export default CategoryGridItem;