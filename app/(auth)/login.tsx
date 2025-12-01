import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { ScrollViewWithInsets } from "../../src/components/ScrollViewWithInset";
import { login } from "../../src/services/authentication";
import { useStore } from "../../src/store/storage";
import AuthHeader from "../components/AuthHeader";
import AuthInput from "../components/ui/AuthInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { COLORS } from "../styles/OnboardingStyles";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useStore((state: any) => state.setToken);
  const getToken = useStore((state: any) => state.isToken);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Erro", "Por favor, preencher os campos corretamente!!");
        return;
      }

      const loginData = await login(email, password);

      setToken(loginData.token);
      console.log("Token guardado no zustand: " + getToken);

      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Email ou senha inválido");
    }
  };

  const handleSignUpNavigation = () => {
    router.push("/signup");
  };

  const handleForgotPassword = () => {
    console.log("Navegar para Esqueci a Senha");
    // router.push('/forgot-password');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollViewWithInsets keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <AuthHeader
            title="Hey, Welcome Back"
            subtitle="Login now to track all your expenses"
          />

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

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Login"
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
              <Text style={styles.signUpLink} onPress={handleSignUpNavigation}>
                {" "}
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollViewWithInsets>
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
    paddingTop: 20,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backButton: {
    padding: 5,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
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
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.accent,
    fontWeight: "bold",
  },
});

export default LoginScreen;
