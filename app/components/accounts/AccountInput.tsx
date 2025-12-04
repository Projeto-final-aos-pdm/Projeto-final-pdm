import { COLORS } from "@/app/styles/OnboardingStyles";
import { accountTypeValues } from "@/src/types/accountTypes";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type InputType = "text" | "select" | "boolean";

type ProfileInputProps = {
  label: string;
  value: string | boolean;
  onChangeText: (value: any) => void;
  type?: InputType;
};

export default function AccountInput({
  label,
  value,
  onChangeText,
  type = "text",
}: ProfileInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const formatLabel = (item: string | boolean) => {
    if (typeof item === "boolean") {
      return item ? "Sim" : "Não";
    }
    if (!item) return "";
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  const handleSelect = (itemValue: string | boolean) => {
    onChangeText(itemValue);
    setModalVisible(false);
  };

  const isSelectOrBoolean = type === "select" || type === "boolean";

  const modalData = type === "boolean" ? [true, false] : accountTypeValues;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {isSelectOrBoolean ? (
        <>
          <TouchableOpacity
            style={[styles.input, styles.selectButton]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.inputText,
                typeof value === "string" && !value && { color: "#999" },
              ]}
            >
              {value !== "" && value !== undefined
                ? formatLabel(value)
                : "Selecione uma opção"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione uma opção</Text>
                <FlatList
                  data={modalData as any[]}
                  keyExtractor={(item) => String(item)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.optionText}>{formatLabel(item)}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        <TextInput
          style={styles.input}
          value={value as string}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: COLORS.itemBackground,
    color: COLORS.textPrimary,
    height: 45,
    width: 300,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  inputText: {
    color: COLORS.textPrimary,
  },
  selectButton: {
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.itemBackground,
    width: 300,
    borderRadius: 8,
    padding: 20,
    maxHeight: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
});
