import { createFinancialGoal } from "@/src/services/financial-goal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  background: "#121212",
  cardBg: "#2A2A2D",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA",
  accent: "#00C853",
};

export default function CreateFinancialGoal() {
  const router = useRouter();

  // Estados dos campos
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSave = async () => {
    if (!description || !target || !deadline) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const body = {
      description,
      target_value: target,
      current_value: current || "0",
      deadline,
    };

    try {
      await createFinancialGoal(body);

      Alert.alert("Sucesso", "Meta criada com sucesso!");

      router.push("/financial-goal"); // ajuste para o nome da sua tela
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível criar a meta.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.pageTitle}>Criar Nova Meta Financeira</Text>

      {/* Campo - Descrição */}
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Ex: Comprar notebook"
          placeholderTextColor="#777"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Campo - Valor alvo */}
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Valor alvo</Text>
        <TextInput
          placeholder="4000"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={target}
          onChangeText={setTarget}
        />
      </View>

      {/* Campo - Valor atual */}
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Valor atual</Text>
        <TextInput
          placeholder="1000"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={current}
          onChangeText={setCurrent}
        />
      </View>

      {/* Campo - Prazo */}
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Prazo</Text>
        <TextInput
          placeholder="10/10/2026"
          placeholderTextColor="#777"
          style={styles.input}
          value={deadline}
          onChangeText={setDeadline}
        />
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <MaterialCommunityIcons name="plus" size={28} color="#000" />
        <Text style={styles.saveText}>Salvar Meta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  pageTitle: {
    marginTop: 60,
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 20,
  },

  inputBlock: {
    marginBottom: 18,
  },

  label: {
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontSize: 14,
  },

  input: {
    backgroundColor: COLORS.cardBg,
    color: COLORS.textPrimary,
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  saveButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },

  saveText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
