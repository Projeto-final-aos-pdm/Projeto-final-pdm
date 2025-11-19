import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PrimaryButton from './components/ui/PrimaryButton';
import AuthInput from './components/ui/AuthInput'; 
import AuthHeader from './components/AuthHeader'; 
import { COLORS } from './styles/OnboardingStyles'; 

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name || !email || !password) {
      // alert('Por favor, preencha todos os campos.'); 
      // return;
    }
    
    console.log('Dados de Registro:', { name, email, password });
    
    // router.replace('/home'); 
    
     router.push('/login'); 
  };

  const handleLoginNavigation = () => {
    router.push('/login'); 
  };
  
  const handleBack = () => {
      router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          
          <TouchableOpacity 
            onPress={handleBack} 
            style={styles.backButton}
          >
             <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <AuthHeader 
            title="Let's Get Started"
            subtitle="Create an account to track your expenses"
          />

          <View style={styles.formContainer}>
            <AuthInput 
              iconName="account" 
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <AuthInput 
              iconName="email" 
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <AuthInput 
              iconName="lock" 
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <PrimaryButton 
            title="Sign Up" 
            onPress={handleSignUp}
          />
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account? 
              <Text 
                style={styles.loginLink}
                onPress={handleLoginNavigation}
              >
                {' '}Login
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 5,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.accent, 
    fontWeight: 'bold',
  },
});

export default SignUpScreen;