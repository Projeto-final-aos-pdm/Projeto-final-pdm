import React from "react";
import { StyleSheet, Text, View } from "react-native";

const COLORS = {
  textPrimary: "#000000",
  textSecondary: "#BDBDBD",
  itemBg: "#FFFFFF",
};

export type BudgetItem = {
  id: string;
  name: string;
  cost: number;
  image?: string;
};

interface BudgetItemListProps {
  item: BudgetItem[];
}

const BudgetItemList: React.FC<BudgetItemListProps> = ({ item }) => {
  if (item.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Item Found</Text>
      </View>
    );
  }

  // Lista de Itens
  return (
    <View>
      {item.map((item) => (
        <View key={item.id} style={styles.itemCard}>
          <View style={styles.imagePlaceholder} />

          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCost}>${item.cost}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textSecondary,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.itemBg,
    borderRadius: 16,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#CFD8DC",
    marginRight: 15,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  itemCost: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
});

export default BudgetItemList;
