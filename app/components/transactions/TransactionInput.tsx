import { COLORS } from "@/app/styles/OnboardingStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardTypeOptions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type InputType = "text" | "select" | "selectCategory";

export type CategoryOption = {
  id: string;
  name: string;
};

type ProfileInputProps = {
  label: string;
  value: string | boolean;
  onChangeText: (value: any) => void;
  type?: InputType;
  options?: string[] | CategoryOption[];
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
};

export default function TransactionInput({
  label,
  value,
  onChangeText,
  type = "text",
  options = [],
  keyboardType = "default",
  placeholder,
}: ProfileInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const getDisplayLabel = () => {
    if (typeof value === "boolean") return value ? "Sim" : "Não";

    if (!value) return "";

    if (type === "selectCategory" && Array.isArray(options)) {
      const selectedOption = (options as CategoryOption[]).find(
        (opt) => opt.id === value
      );
      return selectedOption ? selectedOption.name : "Categoria não encontrada";
    }

    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  };

  const formatOptionLabel = (item: string | CategoryOption) => {
    if (typeof item === "object" && "name" in item) {
      return item.name;
    }
    const str = String(item);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSelect = (item: string | boolean | CategoryOption) => {
    if (typeof item === "object" && "id" in item) {
      onChangeText(item.id);
    } else {
      onChangeText(item);
    }
    setModalVisible(false);
  };

  const isSelectType = type === "select" || type === "selectCategory";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {isSelectType ? (
        <>
          <TouchableOpacity
            style={[styles.input, styles.selectButton]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.inputText,
                !value && value !== false && { color: "#999" },
              ]}
            >
              {value !== "" && value !== undefined
                ? getDisplayLabel()
                : placeholder || "Selecione uma opção"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={COLORS.textPrimary}
            />
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
                <Text style={styles.modalTitle}>{label}</Text>
                <FlatList
                  data={options as any[]}
                  keyExtractor={(item) =>
                    typeof item === "object" ? item.id : String(item)
                  }
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.optionText}>
                        {formatOptionLabel(item)}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: 20,
                      }}
                    >
                      Nenhuma opção disponível
                    </Text>
                  }
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        <TextInput
          style={styles.input}
          value={value ? String(value) : ""}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.itemBackground,
    color: COLORS.textPrimary,
    height: 50,
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputText: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.itemBackground,
    width: "100%",
    maxWidth: 340,
    borderRadius: 12,
    padding: 20,
    maxHeight: 400,
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
