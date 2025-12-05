import { COLORS } from "@/app/styles/OnboardingStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TransactionProps = {
  type: string;
  value: string | number;
  date: string;
  description: string;
  handleUpdate: () => void;
  handleDelete: () => void;
};

export default function TransactionListItem({
  type,
  value,
  date,
  description,
  handleDelete,
  handleUpdate,
}: TransactionProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch (error) {
      return String(dateString).split("T")[0];
    }
  };

  return (
    <View style={styles.contain}>
      <Text style={styles.text}>
        <Text style={styles.boldLabel}>Description:</Text> {description}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldLabel}>Type:</Text> {type}
      </Text>

      <View style={styles.containData}>
        <Text style={styles.text}>
          <Text style={styles.boldLabel}>Value:</Text> {value}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldLabel}>Date:</Text> {formatDate(date)}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleUpdate}>
          <MaterialCommunityIcons name="pencil" size={25} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: COLORS.itemBackground,
    width: "100%",
    height: "auto",
    padding: 16,
    borderRadius: 8,
  },
  containData: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.buttonText || "#444",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: COLORS.textPrimary,
  },
  boldLabel: {
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 8,
  },
});
