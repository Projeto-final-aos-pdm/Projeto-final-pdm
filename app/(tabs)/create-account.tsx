import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createAccount } from "@/src/services/account";
import { AccountRequest, AccountTypeValues } from "@/src/types/accountTypes";
import AccountInput from "../components/accounts/AccountInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { COLORS } from "../styles/OnboardingStyles";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);

  const [accountData, setAccountData] = useState<AccountRequest>({
    bank: "",
    type: "checking",
    is_active: true,
  });

  async function handleCreateAccount() {
    if (!accountData.bank) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      setLoading(true);
      await createAccount({
        bank: accountData.bank,
        is_active: accountData.is_active,
        type: accountData.type,
      });
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => router.push("/accounts") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "Criar Conta",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: "#fff",
          headerBackVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputContain}>
          <AccountInput
            label="Banco:"
            value={accountData.bank}
            onChangeText={(text) =>
              setAccountData((prev) => ({ ...prev, bank: text }))
            }
          />

          <AccountInput
            label="Tipo de Conta:"
            type="select"
            value={accountData.type}
            onChangeText={(text) =>
              setAccountData((prev) => ({
                ...prev,
                type: text as AccountTypeValues,
              }))
            }
          />

          <PrimaryButton
            title="Create Account"
            disabled={loading}
            onPress={handleCreateAccount}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    alignItems: "center",
    padding: 24,
  },

  inputContain: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
