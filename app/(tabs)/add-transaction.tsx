import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ScrollViewWithInsets } from "../components/ScrollViewWithInset";
import PrimaryButton from "../components/ui/PrimaryButton";
import TypeSwitcher from "../components/ui/TypeSwitcher";
import { COLORS } from "../styles/OnboardingStyles";

const AddTransactionScreen: React.FC = () => {
  const [type, setType] = useState<"Expense" | "Income">("Expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState({
    name: "Select Category",
    icon: "shape-plus",
  });

  const handleSave = () => {
    console.log("Salvar Transação:", { type, amount, title, category });
    router.back();
  };

  const handleSelectCategory = () => {
    router.push("/select-category");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header Customizado na Stack */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: type === "Expense" ? "Add Expense" : "Add Income",
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.textPrimary,
          headerShadowVisible: false,
          //headerBackTitleVisible: false,
        }}
      />

      <ScrollViewWithInsets contentContainerStyle={styles.content}>
        {/* Seletor de Tipo */}
        <TypeSwitcher selectedType={type} onSelect={setType} />

        {/* Input de Valor (Grande) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              selectionColor={COLORS.accent}
            />
          </View>
        </View>

        {/* Input de Título */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What was it for?"
            placeholderTextColor={COLORS.textSecondary}
            value={title}
            onChangeText={setTitle}
            selectionColor={COLORS.accent}
          />
        </View>

        {/* Seletor de Categoria (Botão) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.categorySelector}
            onPress={handleSelectCategory}
          >
            <View style={styles.categoryLeft}>
              <View style={styles.iconBg}>
                <MaterialCommunityIcons
                  name={category.icon as any}
                  size={20}
                  color={COLORS.textPrimary}
                />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Botão Salvar Fixo no Fundo */}
        <View style={styles.footer}>
          <PrimaryButton
            title={type === "Expense" ? "Add Expense" : "Add Income"}
            onPress={handleSave}
            style={{
              backgroundColor:
                type === "Expense" ? COLORS.textPrimary : COLORS.income,
            }}
            textStyle={{ color: COLORS.background }}
            disabled={false}
          />
        </View>
      </ScrollViewWithInsets>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },

  // Inputs
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500",
  },

  // Input de Valor
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 70,
  },
  currencySymbol: {
    fontSize: 28,
    color: COLORS.textSecondary,
    marginRight: 10,
    fontWeight: "bold",
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },

  // Input de Texto Normal
  textInput: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  // Seletor de Categoria
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#3A3A3C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },

  // Footer
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#2C2C2E",
  },
});

export default AddTransactionScreen;
