import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/OnboardingStyles'; 
interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    marginBottom: 30,
    marginTop: 20, 
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default AuthHeader;