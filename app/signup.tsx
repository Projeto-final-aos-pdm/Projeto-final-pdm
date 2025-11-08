import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router'; 
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
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    console.log('Dados de Registro:', { name, email, password });
  };

  const handleLoginNavigation = () => {
    // Usar 'router.replace' ou 'router.push' do expo-router
    console.log("Navegar para Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Configuração do Status Bar e da Navegação (Header) */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          
          {/* Botão de Voltar - Componente simples (pode ser refatorado) */}
          <TouchableOpacity 
            onPress={() => console.log('Voltar')} 
            style={styles.backButton}
          >
             <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Cabeçalho */}
          <AuthHeader 
            title="Let's Get Started"
            subtitle="Create an account to track your expenses"
          />

          {/* Formulário de Inputs */}
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
          
          {/* Botão de Registro */}
          <PrimaryButton 
            title="Sign Up" 
            onPress={handleSignUp}
          />
          
          {/* Link para Login */}
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

  // Rodapé
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