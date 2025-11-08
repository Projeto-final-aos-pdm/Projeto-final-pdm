import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../styles/OnboardingStyles'; 

const OnboardingContent: React.FC = () => {
  return (
    <View style={styles.contentContainer}>
      
      <View style={styles.illustrationContainer}>
        {/* Placeholder para a ilustração 3D */}
        <Text style={styles.placeholderText}>[Ilustração 3D]</Text> 
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>
          Always take control of your finances
        </Text>
        <Text style={styles.subtitle}>
          Finances must be arranged to set a better lifestyle in future
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  illustrationContainer: { /* ... */ },
  placeholderText: { color: COLORS.textSecondary, fontSize: 16 },
  textBlock: { /* ... */ },
  title: { fontSize: 30, fontWeight: '800', color: COLORS.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center' },
});

export default OnboardingContent;