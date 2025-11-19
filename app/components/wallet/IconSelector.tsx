import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/OnboardingStyles';

const WALLET_ICONS: (keyof typeof MaterialCommunityIcons.glyphMap)[] = [
  'wallet', 'bank', 'piggy-bank', 'credit-card', 'cash', 
  'chart-line', 'bitcoin', 'safe', 'shopping', //'travel-bed',
];

interface IconSelectorProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wallet Icon</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {WALLET_ICONS.map((icon) => (
          <TouchableOpacity 
            key={icon}
            style={[
              styles.iconItem, 
              selectedIcon === icon && styles.iconSelected
            ]}
            onPress={() => onSelect(icon)}
          >
            <MaterialCommunityIcons 
              name={icon} 
              size={32} 
              color={selectedIcon === icon ? COLORS.background : COLORS.textPrimary} 
            />
            {selectedIcon === icon && (
              <View style={styles.checkmark}>
                 <MaterialCommunityIcons name="check-circle" size={16} color={COLORS.background} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  list: {
    paddingRight: 20,
  },
  iconItem: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconSelected: {
    backgroundColor: COLORS.accent, 
    borderColor: COLORS.accent,
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 2,
  }
});

export default IconSelector;