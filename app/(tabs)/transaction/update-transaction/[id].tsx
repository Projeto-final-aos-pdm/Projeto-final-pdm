import TransactionInput from "@/app/components/transactions/TransactionInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { COLORS } from "@/app/styles/OnboardingStyles";
import { getAllCategories } from "@/src/services/category";
// ADICIONE AQUI: Importe a função que busca uma única transação pelo ID
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
      Alert.alert("Sucesso", "Transação atualizada com sucesso");

      setLoad(false);
      router.push({
        pathname: "/transaction/[id]",
        params: { id: id as string },
      });
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar");
      console.log(error);
    } finally {
      setLoad(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          setLoad(true);

          const categories = await getAllCategories();
          setCategoryData(categories);

          if (id) {
            const transaction = await getTransactionById(id as string);

            // 3. Preenche os inputs com os dados que vieram do banco
            setDescription(transaction.description);
            setValue(String(transaction.value)); // Converte para string para o input
            setType(transaction.type);
            setDate(transaction.date); // *Atenção ao formato da data (ex: DD/MM/AAAA)*
            setCategoryId(transaction.category_id);
          }
        } catch (error) {
          console.log(error);
          Alert.alert("Erro", "Não foi possível carregar os dados.");
        } finally {
          setLoad(false);
        }
      }

      loadData();
    }, [id])
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
            title={load ? "Salvando..." : "Salvar Alterações"}
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
  // O saveButton anterior não estava sendo usado no JSX, mas mantive o styles
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
