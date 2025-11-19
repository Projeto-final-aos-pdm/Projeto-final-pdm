import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FAB_COLOR = '#6A1B9A';
const ICON_COLOR = '#FFFFFF';

interface FabButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const FabButton: React.FC<FabButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress} activeOpacity={0.8}>
      <MaterialCommunityIcons name="plus" size={30} color={ICON_COLOR} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    backgroundColor: FAB_COLOR,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default FabButton;