import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { signup } from "../../src/services/authentication";
import AuthHeader from "../components/AuthHeader";
import { ScrollViewWithInsets } from "../components/ScrollViewWithInset";
import AuthInput from "../components/ui/AuthInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { COLORS } from "../styles/OnboardingStyles";

const SignUpScreen: React.FC = () => {
  const insets = useSafeAreaInsets(); // ← importante!
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      if (!email || !name || !password) {
        Alert.alert("Erro", "Por favor, preencher os campos corretamente!!");
        return;
      }
      setLoading(true);
      await signup(name, email, password);
      router.push("/login");
    } catch (error) {
      Alert.alert("Erro", "Dados inválidos inválido");
      setLoading(false);
    }
  };

  const handleLoginNavigation = () => router.push("/login");
  const handleBack = () => router.back();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollViewWithInsets>
        {/* Botão voltar */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          {/* Cabeçalho */}
          <AuthHeader
            title="Let's Get Started"
            subtitle="Create an account to track your expenses"
          />

          {/* Formulário */}
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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Botão principal */}
          <PrimaryButton
            title="Sign Up"
            onPress={handleSignUp}
            disabled={loading}
          />

          {/* Footer com link de login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.loginLink} onPress={handleLoginNavigation}>
                Login
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
    backgroundColor: COLORS.background, // #1C1C1E
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backButton: {
    padding: 5,
    marginBottom: 15,
  },
  formContainer: {
    width: "100%",
    marginVertical: 20,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  loginLink: {
    color: COLORS.accent,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
