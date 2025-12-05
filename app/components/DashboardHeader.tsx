import { getAllAccounts } from "@/src/services/account";
import { getAllTransaction } from "@/src/services/transaciton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLORS as GlobalColors } from "../styles/OnboardingStyles";

interface DashboardHeaderProps {
  userName: string;
}

const COLORS = {
  ...GlobalColors,
  cardBackground: "#39393C",
  textLight: GlobalColors.textPrimary,
  textMuted: GlobalColors.textSecondary,
  income: GlobalColors.income,
  expense: GlobalColors.expense,
};

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter();
  const handleAccountSettings = () => router.push("/profile");

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useFocusEffect(
    useCallback(() => {
      async function load() {
        try {
          const accountsResult = await getAllAccounts();

          if (accountsResult && Array.isArray(accountsResult.data)) {
            const ids = accountsResult.data.map((account: any) => account.id);

            const promises = ids.map(async (accountId: string) => {
              const response = await getAllTransaction(accountId);
              return response.data ? response.data : response;
            });

            const results = await Promise.all(promises);
            const allTransactions = results.flat();

            const formattedTransactions = allTransactions.map((item: any) => ({
              type: item.type,
              value: Number(item.value),
            }));

            const totalIncome = formattedTransactions
              .filter((item: any) => item.type === "income")
              .reduce((acc: any, item: any) => acc + item.value, 0);

            const totalExpense = formattedTransactions
              .filter((item: any) => item.type === "expense")
              .reduce((acc: any, item: any) => acc + item.value, 0);

            const totalBalance = totalIncome - totalExpense;

            setIncome(totalIncome);
            setExpense(totalExpense);
            setBalance(totalBalance);

            console.log("Cálculos finalizados:", {
              totalIncome,
              totalExpense,
              totalBalance,
            });
          }
        } catch (error) {
          console.log("Erro ao carregar dashboard:", error);
        }
      }

      load();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={handleAccountSettings}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color={COLORS.textLight}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>

        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>

        <View style={styles.detailsRow}>
          <View style={styles.detailBox}>
            <View style={dynamicStyles.iconCircle(COLORS.income)}>
              <MaterialCommunityIcons
                name="arrow-bottom-left"
                size={20}
                color={COLORS.cardBackground}
              />
            </View>
            <View>
              <Text style={styles.detailLabel}>Income</Text>
              <Text style={dynamicStyles.detailAmount(COLORS.income)}>
                {formatCurrency(income)}
              </Text>
            </View>
          </View>

          <View style={styles.detailBox}>
            <View style={dynamicStyles.iconCircle(COLORS.expense)}>
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={20}
                color={COLORS.cardBackground}
              />
            </View>
            <View>
              <Text style={styles.detailLabel}>Expense</Text>
              <Text style={dynamicStyles.detailAmount(COLORS.expense)}>
                {formatCurrency(expense)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const dynamicStyles = {
  iconCircle: (color: string): ViewStyle => ({
    backgroundColor: color,
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  }),
  detailAmount: (color: string): TextStyle => ({
    color: color,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  }),
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 20,
    paddingTop: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  welcomeText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  userName: {
    color: COLORS.textLight,
    fontSize: 22,
    fontWeight: "bold",
  },
  iconGroup: {
    flexDirection: "row",
  },
  balanceCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: "auto",
    shadowColor: COLORS.background,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
  },
  balanceTitle: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  balanceAmount: {
    color: COLORS.textLight,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  detailBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  detailLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});
