import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { Link } from 'expo-router'; 

import styles, { COLORS } from './styles/OnboardingStyles'; 
import PrimaryButton from './components/ui/PrimaryButton';
import OnboardingContent from './components/OnboardingContent';

const OnboardingScreen = () => {
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        
        <OnboardingContent />

        <Link href="/signup" asChild>
            <PrimaryButton 
              title="Get Started" 
              onPress={() => {}} 
              style={styles.buttonSpacing} 
            />
        </Link>
        
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;