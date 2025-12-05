import TransactionInput from "@/app/components/transactions/TransactionInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { COLORS } from "@/app/styles/OnboardingStyles";
import { getAllCategories } from "@/src/services/category";
import {
  getTransactionById,
  updateTransaction,
} from "@/src/services/transaciton";
import { Category } from "@/src/types/categoryType";
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

export default function UpdateTransaction() {
  const { id } = useLocalSearchParams();

  const [load, setLoad] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<string | boolean>("");
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  async function handleUpdateTransaction() {
    try {
      setLoad(true);
      await updateTransaction(
        {
          description,
          value,
          type,
          date,
          category_id: categoryId as string,
        },
        id as string
      );
      Alert.alert("Success", "Transaction created successfully");

      setLoad(false);
      router.push({
        pathname: "/transaction/[id]",
        params: { id: id as string },
      });
    } catch (error) {
      Alert.alert("Error", "Server error");
    } finally {
      setLoad(false);
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch (error) {
      return String(dateString).split("T")[0];
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function load() {
        try {
          const categories = await getAllCategories();
          const transaction = await getTransactionById(id as string);

          setDescription(transaction.description);
          setValue(transaction.value);
          setType(transaction.type);
          setDate(formatDate(transaction.date));
          setCategoryId(transaction.category_id);

          setCategoryData(categories);
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
          headerTitle: "Update Transaction",
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <TransactionInput
            label="Descrição"
            onChangeText={setDescription}
            value={description}
            placeholder="Ex: Compras no mercado"
          />
          <TransactionInput
            label="Valor"
            onChangeText={setValue}
            value={value}
            keyboardType="numeric"
            placeholder="0,00"
          />
          <TransactionInput
            label="Tipo"
            onChangeText={setType}
            value={type}
            type="select"
            options={["income", "expense"]}
          />
          <TransactionInput
            label="Data"
            onChangeText={setDate}
            value={date}
            placeholder="DD/MM/AAAA"
          />
          <TransactionInput
            label="Categoria"
            onChangeText={setCategoryId}
            value={categoryId}
            type="selectCategory"
            options={categoryData}
            placeholder="Selecione uma categoria"
          />
          <PrimaryButton
            disabled={load}
            onPress={handleUpdateTransaction}
            title="Add Transaction"
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
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  formContainer: {
    gap: 8,
  },
  saveButton: {
    backgroundColor: COLORS.textPrimary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
