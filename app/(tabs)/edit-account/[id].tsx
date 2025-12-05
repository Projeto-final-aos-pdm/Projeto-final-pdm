import AccountInput from "@/app/components/accounts/AccountInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { COLORS } from "@/app/styles/OnboardingStyles";
import { getAccountById, updateAccounts } from "@/src/services/account";
import { AccountRequest, AccountTypeValues } from "@/src/types/accountTypes";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditAccount() {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState<AccountRequest>({
    bank: "",
    type: "checking",
    is_active: true,
  });

  async function handleUpdateAccount() {
    if (!accountData.bank) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      await updateAccounts(
        {
          bank: accountData.bank,
          is_active: accountData.is_active,
          type: accountData.type,
        },
        id as string
      );

      Alert.alert("Sucesso", "Conta atualizada com sucesso!", [
        { text: "OK", onPress: () => router.push("/accounts") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      async function load() {
        try {
          const data = await getAccountById(id as string);
          console.log(data);
          setAccountData(data);
        } catch (error) {
          console.log(error);
        }
      }

      load();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "Edit Account",
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
              onPress={() => router.push("/accounts")}
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

          <AccountInput
            label="Conta ativa:"
            type="boolean"
            value={accountData.type}
            onChangeText={(text) =>
              setAccountData((prev) => ({
                ...prev,
                type: text as AccountTypeValues,
              }))
            }
          />

          <PrimaryButton
            title="Salvar Alterações"
            disabled={loading}
            onPress={handleUpdateAccount}
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
});
