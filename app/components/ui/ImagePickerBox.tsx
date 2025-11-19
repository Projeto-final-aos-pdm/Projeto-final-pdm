import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ImagePickerBoxProps {
  onPress: () => void;
  hasImage?: boolean; 
}

const ImagePickerBox: React.FC<ImagePickerBoxProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="image-outline" size={40} color="#BDBDBD" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    backgroundColor: '#E0E0E0', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center', 
  },
  iconBox: {
  },
});

export default ImagePickerBox;