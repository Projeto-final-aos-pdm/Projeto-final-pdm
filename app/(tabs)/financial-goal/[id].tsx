import {
  createFinancialGoal,
  getAllFinancialGoal,
  updateFinancialGoal,
} from "@/src/services/financial-goal";

import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FinancialGoalForm() {
  const { id } = useLocalSearchParams();

  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [deadline, setDeadline] = useState("");

  const isEditing = Boolean(id);

  useEffect(() => {
    const loadGoal = async () => {
      if (!isEditing) return;

      try {
        const result = await getAllFinancialGoal();
        const goal = result.data.find((g: any) => g.id == id);

        if (goal) {
          setDescription(goal.description ?? "");
          setTarget(String(goal.target_value ?? ""));
          setCurrent(String(goal.current_value ?? ""));
          setDeadline(String(goal.deadline ?? ""));
        }
      } catch (e) {
        console.log("Erro ao carregar meta:", e);
      }
    };

    loadGoal();
  }, [id]);

  const handleCreate = async () => {
    try {
      await createFinancialGoal({
        description,
        target_value: target,
        current_value: current,
        deadline,
      });

      router.push("/financial-goal");
    } catch (e) {
      console.log("Erro ao criar meta:", e);
    }
  };

  const handleUpdate = async () => {
    try {
      const goal: any = {
        description,
        target_value: target,
        current_value: current,
        deadline,
      };

      Object.keys(goal).forEach((key) => {
        if (!goal[key]) delete goal[key];
      });

      await updateFinancialGoal({
        id: String(id),
        ...goal,
      });

      router.push("/financial-goal");
    } catch (e) {
      console.log("Erro ao atualizar meta:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? "Editar Meta" : "Criar Meta"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#777"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor desejado"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={target}
        onChangeText={setTarget}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor atual"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={current}
        onChangeText={setCurrent}
      />

      <TextInput
        style={styles.input}
        placeholder="Prazo (dd/mm/aaaa)"
        placeholderTextColor="#777"
        value={deadline}
        onChangeText={setDeadline}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isEditing ? handleUpdate : handleCreate}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Salvar Alterações" : "Criar Meta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00c853",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
