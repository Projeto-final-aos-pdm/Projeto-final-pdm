// app/monthly-budget/[id].tsx  (ou o nome que você estiver usando)

import {
  createMonthlyBudget,
  getAllMonthlyBudgets,
  updateMonthlyBudget,
} from "@/src/services/monthly-budget";

import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  accent: "#00C853",
  background: "#000",
  card: "#222",
  text: "#fff",
  placeholder: "#777",
};

export default function MonthlyBudgetForm() {
  const { id } = useLocalSearchParams();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(""); 

  const isEditing = Boolean(id);

  useEffect(() => {
    const loadBudget = async () => {
      if (!isEditing) {
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        setMonth(months[now.getMonth()]);
        setYear(now.getFullYear().toString());
        return;
      }

      try {
        const result = await getAllMonthlyBudgets();
        const budget = result.data?.find((b: any) => b.id === id) 
                    || (Array.isArray(result) ? result.find((b: any) => b.id === id) : null);

        if (budget) {
          setMonth(budget.month || "");
          setYear(budget.year || "");
          // Mostra o valor já formatado bonito pro usuário
          const valor = Number(budget.limit_value || 0);
          setLimit(valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
      } catch (e) {
        console.log("Erro ao carregar:", e);
      }
    };

    loadBudget();
  }, [id]);

  const handleSave = async () => {
    if (!month.trim() || !year.trim() || !limit) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // AQUI É O SEGREDO: remove ponto, vírgula e divide por 100 se precisar
    const cleanValue = limit.replace(/\D/g, ""); // "500000" (string sem nada)

    const payload = {
      month: month.trim(),
      year: year.trim(),
      limit_value: cleanValue, // ← agora vai certinho pro backend
    };

    try {
      if (isEditing) {
        await updateMonthlyBudget({
          id: String(id),
          ...payload,
        });
      } else {
        await createMonthlyBudget(payload);
      }

      Alert.alert("Sucesso!", "Orçamento salvo com sucesso");
      router.back();
    } catch (e: any) {
      console.log("Erro ao salvar:", e.response?.data || e.message);
      Alert.alert("Erro", "Não foi possível salvar. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>
        {isEditing ? "Editar Orçamento" : "Novo Orçamento Mensal"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Mês (ex: Jan, Fev...)"
        placeholderTextColor={COLORS.placeholder}
        value={month}
        onChangeText={setMonth}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Ano"
        placeholderTextColor={COLORS.placeholder}
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Limite (ex: 5.000,00)"
        placeholderTextColor={COLORS.placeholder}
        value={limit}
        onChangeText={(text) => {
          const nums = text.replace(/\D/g, "");
          if (nums) {
            const formatted = (Number(nums) / 100).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            setLimit(formatted);
          } else {
            setLimit("");
          }
        }}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {isEditing ? "Salvar Alterações" : "Criar Orçamento"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  title: { marginTop: 50, fontSize: 26, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "#222", padding: 15, borderRadius: 12, color: "#fff", fontSize: 16, marginBottom: 16 },
  button: { backgroundColor: "#00c853", padding: 16, borderRadius: 12, marginTop: 20 },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});