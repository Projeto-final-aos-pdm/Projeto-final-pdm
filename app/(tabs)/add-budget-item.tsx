import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import ImagePickerBox from "../components/ui/ImagePickerBox";
import PrimaryButton from "../components/ui/PrimaryButton";

const COLORS = {
  background: "#FFFFFF",
  textPrimary: "#000000",
  textSecondary: "#757575",
  inputBorder: "#E0E0E0",
  primaryButton: "#6200EE",
};

const AddBudgetItemScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!name || !cost) {
      Alert.alert("Error", "Name and Cost are required");
      return;
    }
    console.log("Adicionar Item:", { name, cost, url, note });
    router.back();
  };

  const handlePickImage = () => {
    console.log("Abrir Galeria");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Add New Item",
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.textPrimary,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Seletor de Imagem */}
        <ImagePickerBox onPress={handlePickImage} />

        {/* Formulário */}
        <View style={styles.form}>
          {/* Item Name */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="tag-outline"
              size={24}
              color={COLORS.textSecondary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Cost */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={24}
              color={COLORS.textSecondary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Cost"
              keyboardType="numeric"
              value={cost}
              onChangeText={setCost}
            />
          </View>

          {/* Url */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="link"
              size={24}
              color={COLORS.textSecondary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Url"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
            />
          </View>

          {/* Note */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color={COLORS.textSecondary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Note"
              value={note}
              onChangeText={setNote}
              multiline
            />
          </View>
        </View>

        {/* Botão Add */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Add"
            onPress={handleAdd}
            style={{ backgroundColor: COLORS.primaryButton }}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      </ScrollView>
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
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AddBudgetItemScreen;
