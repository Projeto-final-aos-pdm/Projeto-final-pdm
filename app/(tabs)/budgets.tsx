import { Stack, router } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import BudgetListItem from "../components/budgets/BudgetListItem";
import BudgetSummaryCard from "../components/budgets/BudgetSummaryCard";
import FabButton from "../components/ui/FabButton";

const COLORS = {
  background: "#F4F6F9",
  textPrimary: "#1C1C1E",
};

type BudgetCategory = {
  id: string;
  name: string;
  itemCount: number;
  amount: number;
  icon: any;
  color: string;
};

const DUMMY_BUDGETS: BudgetCategory[] = [
  {
    id: "1",
    name: "Living Room",
    itemCount: 2,
    amount: 450,
    icon: "sofa",
    color: "#6A1B9A",
  },
  {
    id: "2",
    name: "Bathroom",
    itemCount: 1,
    amount: 700,
    icon: "bathtub",
    color: "#00C853",
  },
  {
    id: "3",
    name: "Travel",
    itemCount: 0,
    amount: 2000,
    icon: "beach",
    color: "#FF7043",
  },
];

const BudgetsScreen: React.FC = () => {
  const totalEstimate = DUMMY_BUDGETS.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const handleAddBudget = () => {
    router.push("/create-budget");
  };

  const handleOpenDetails = (item: BudgetCategory) => {
    router.push({
      pathname: "/budget-details/[id]",
      params: { id: item.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Meus Orçamentos",
          headerLargeTitle: true,
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
        }}
      />

      <FlatList
        data={DUMMY_BUDGETS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetListItem item={item} onPress={() => handleOpenDetails(item)} />
        )}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>Orçamentos Recentes</Text>
            <BudgetSummaryCard totalEstimate={totalEstimate} />
            <Text style={styles.listTitle}>Categorias</Text>
          </>
        )}
        contentContainerStyle={styles.listContent}
      />

      <FabButton onPress={handleAddBudget} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginVertical: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default BudgetsScreen;
