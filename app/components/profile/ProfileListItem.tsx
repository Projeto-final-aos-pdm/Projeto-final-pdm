import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../styles/OnboardingStyles' 

interface ProfileListItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  text: string;
  onPress: () => void;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({ icon, iconColor, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
          <MaterialCommunityIcons name={icon} size={22} color={COLORS.textPrimary} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.itemBackground, 
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
})

export default ProfileListItem