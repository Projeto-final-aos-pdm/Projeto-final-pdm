import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/OnboardingStyles";

const AVATAR_URL = require("@/assets/images/Robotface.png");

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
}) => {
  return (
    <View style={styles.container}>
      <Image source={AVATAR_URL} style={styles.avatar} />
      <Text style={styles.name}>{name} </Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.itemBackground,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default ProfileHeader;
