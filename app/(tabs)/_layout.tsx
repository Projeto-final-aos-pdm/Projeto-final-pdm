import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS } from "../styles/OnboardingStyles";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: "#C6C6C6",
        tabBarStyle: {
          backgroundColor: COLORS.itemBackground,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="financial-goal"
        options={{
          title: "Financial Goal",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="budgets"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="createMonthlyBudget"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="monthly-budget/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="monthly-budget"
        options={{
          title: "Monthly Budget",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "paper-plane" : "paper-plane"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createFinancialGoal"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="financial-goal/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="transaction/create-transaction/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="transaction/update-transaction/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen name="add-budget-item" options={{ href: null }} />
      <Tabs.Screen name="add-transaction" options={{ href: null }} />
      <Tabs.Screen name="add-wallet" options={{ href: null }} />
      <Tabs.Screen name="create-budget" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="create-account" options={{ href: null }} />
      <Tabs.Screen name="edit-account/[id]" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="select-category" options={{ href: null }} />
      <Tabs.Screen name="stats" options={{ href: null }} />
      <Tabs.Screen name="wallets" options={{ href: null }} />
      <Tabs.Screen name="budget-details/[id]" options={{ href: null }} />
      <Tabs.Screen name="transaction/[id]" options={{ href: null }} />
    </Tabs>
  );
}
