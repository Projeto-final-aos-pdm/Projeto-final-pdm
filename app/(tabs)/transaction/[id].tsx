import TransactionListItem from "@/app/components/transactions/TransactionListItem";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { COLORS } from "@/app/styles/OnboardingStyles";
import { getAccountById } from "@/src/services/account";
import {
  deleteTransaction,
  getAllTransaction,
} from "@/src/services/transaciton";
import { Transaction } from "@/src/types/transactionTypes";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const [bankName, setbankName] = useState("");
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  function handleCreateTransactionPage() {
    router.push(`/transaction/create-transaction/${id}`);
  }

  function handleConfirmDeleteAccount(transactionId: string) {
    Alert.alert(
      "Confirmar ação",
      "Você realmente deseja deletar a sua transação?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () => handleDeleteTransaction(transactionId),
        },
      ],
      { cancelable: true }
    );
  }

  async function handleDeleteTransaction(transactionId: string) {
    await deleteTransaction(transactionId);
    Alert.alert("Sucessfulle", "Transaction deleted successfully");
    const transacitonsData = await getAllTransaction(id as string);
    setTransactionData(transacitonsData.data);
  }

  function handleCreateUpdateTransactionPage(transactionId: string) {
    console.log("update");
    router.push(`/transaction/update-transaction/${transactionId}`);
  }

  useFocusEffect(
    useCallback(() => {
      setTransactionData([]);
      async function load() {
        try {
          setbankName("");
          console.log("ID da conta:", id);
          const accountData = await getAccountById(id as string);
          setbankName(accountData.data.bank);

          const transacitonsData = await getAllTransaction(id as string);

          setTransactionData(transacitonsData.data);
        } catch (error) {
          console.log(error);
        }
      }

      load();
    }, [id])
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: bankName || "Loading datas...",
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
      <View style={styles.addAccountContain}>
        <Text style={styles.text}>For create a transaction:</Text>
        <PrimaryButton
          title="Click Here"
          onPress={handleCreateTransactionPage}
          disabled={false}
        />
      </View>
      <FlatList
        data={transactionData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionListItem
            date={item.date}
            description={item.description}
            handleDelete={() => handleConfirmDeleteAccount(item.id)}
            handleUpdate={() => handleCreateUpdateTransactionPage(item.id)}
            type={item.type}
            value={item.value}
          />
        )}
        ListEmptyComponent={() => {
          if (!transactionData) {
            return (
              <ActivityIndicator
                size="large"
                color="#ffffff"
                style={{ marginTop: 20 }}
              />
            );
          }

          return (
            <Text
              style={{
                color: COLORS.textPrimary,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Nenhuma transação encontrada.
            </Text>
          );
        }}
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
  scrollContent: {
    alignItems: "center",
    padding: 24,
  },
  addAccountContain: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
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
  text: {
    color: COLORS.textPrimary,
    fontSize: 20,
  },
});
