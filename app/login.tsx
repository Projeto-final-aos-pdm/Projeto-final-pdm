import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PrimaryButton from './components/ui/PrimaryButton';
import AuthInput from './components/ui/AuthInput'; 
import AuthHeader from './components/AuthHeader'; 

import { COLORS } from './styles/OnboardingStyles'; 

const LoginScreen: React.FC = () => {
  // Estado para os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }
    
    console.log('Tentativa de Login:', { email, password });
    
    // router.replace('/'); // Navegar para a Home (ou outra tela)
  };

  const handleSignUpNavigation = () => {
    // Navegar para a tela de Registro (Tela 2)
    router.push('/signup'); 
  };

  const handleForgotPassword = () => {
    // Navegar para a tela de Recuperação de Senha
    console.log("Navegar para Esqueci a Senha");
    // router.push('/forgot-password'); 
  };
  
  const handleGoBack = () => {
      // Voltar para a tela anterior (Onboarding)
      router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Configuração da Barra de Status e Cabeçalho */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          
          {/* Botão de Voltar */}
          <TouchableOpacity 
            onPress={handleGoBack}
            style={styles.backButton}
          >
             <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Cabeçalho */}
          <AuthHeader 
            title="Hey, Welcome Back"
            subtitle="Login now to track all your expenses"
          />

          {/* Formulário de Inputs */}
          <View style={styles.formContainer}>
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
          
          {/* Link Esqueci a Senha */}
          <TouchableOpacity 
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Botão de Login */}
          <PrimaryButton 
            title="Login" 
            onPress={handleLogin}
            style={styles.loginButton}
          />
          
          {/* Link para Sign Up */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account? 
              <Text 
                style={styles.signUpLink}
                onPress={handleSignUpNavigation}
              >
                {' '}Sign up
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
    marginBottom: 10,
  },
  
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30, 
  },
  forgotPasswordText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  loginButton: {
    marginTop: 10,
    marginBottom: 20,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.accent, 
    fontWeight: 'bold',
  },
});

export default LoginScreen;