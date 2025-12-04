import { deleteAccount, getAllAccounts } from "@/src/services/account";
import { Account } from "@/src/types/accountTypes";
import { router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountListItem from "../components/accounts/AccountListItem";
import PrimaryButton from "../components/ui/PrimaryButton";
import { COLORS } from "../styles/OnboardingStyles";

export default function Accounts() {
  const [accountsData, setAccountsData] = useState<Account[]>();

  const loadAccounts = useCallback(async () => {
    try {
      const data = await getAllAccounts();
      setAccountsData(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleCreateAccountPage() {
    router.push("/create-account");
  }

  function handleConfirmDeleteAccount(accountId: string) {
    Alert.alert(
      "Confirmar ação",
      "Você realmente deseja deletar a sua conta?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () => handleDeleteAccount(accountId),
        },
      ],
      { cancelable: true }
    );
  }

  async function handleDeleteAccount(accountId: string) {
    try {
      await deleteAccount(accountId);
      Alert.alert("Sucesso", "Conta deletada com sucesso!");

      await loadAccounts();
    } catch (error) {
      Alert.alert("Erro", "Erro no servidor ao tentar deletar.");
    }
  }

  function handleUpdateAccount(accountId: string) {
    router.push({
      pathname: "/edit-account/[id]",
      params: { id: accountId },
    });
  }

  useFocusEffect(
    useCallback(() => {
      loadAccounts();
    }, [loadAccounts])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "Accounts",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.background },
          headerBackVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "#fff",
          },
        }}
      />
      <View style={styles.addAccountContain}>
        <Text style={styles.text}>For add account:</Text>
        <PrimaryButton
          title="Click Here"
          onPress={handleCreateAccountPage}
          disabled={false}
        />
      </View>
      <FlatList
        data={accountsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AccountListItem
            titleAccount={item.bank}
            accountID={item.id}
            is_active={item.is_active}
            handleDelete={() => handleConfirmDeleteAccount(item.id)}
            handleUpdate={() => handleUpdateAccount(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: COLORS.textPrimary }}>
            Nenhuma conta encontrada.
          </Text>
        )}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  addAccountContain: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 20,
  },
});
