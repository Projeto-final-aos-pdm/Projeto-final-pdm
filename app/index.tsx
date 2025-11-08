import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';

import styles, { COLORS } from './styles/OnboardingStyles'; 
import PrimaryButton from './components/ui/PrimaryButton';
import OnboardingContent from './components/OnboardingContent';

const OnboardingScreen = () => {
  const handleGetStarted = () => {
    // Para navegar para 'Sign Up' no Expo Router:
    // import { Link } from 'expo-router';
    // router.push('/signup');
    console.log("Navegar para Sign Up");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        
        {/* Conteúdo (Ilustração e Textos) */}
        <OnboardingContent />

        {/* Botão CTA (Call-to-Action) */}
        <PrimaryButton 
          title="Get Started" 
          onPress={handleGetStarted}
          style={styles.buttonSpacing} 
        />
        
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;