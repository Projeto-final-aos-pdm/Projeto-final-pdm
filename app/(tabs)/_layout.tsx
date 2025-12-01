import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarActiveBackgroundColor: "red",
          }}
        />
      </Tabs>
      <Tabs.Screen name="profile" options={{ href: null }}/>

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="add-budget-item" options={{ href: null }} />
      <Tabs.Screen name="add-transaction" options={{ href: null }} />
      <Tabs.Screen name="add-wallet" options={{ href: null }} />
      <Tabs.Screen name="budgets" options={{ href: null }} />
      <Tabs.Screen name="create-budget" options={{ href: null }} />

      <Tabs.Screen name="select-category" options={{ href: null }} />
      <Tabs.Screen name="stats" options={{ href: null }} />
      <Tabs.Screen name="wallets" options={{ href: null }} />

      <Tabs.Screen name="budget-details/[id]" options={{ href: null }} />
      <Tabs.Screen name="transaction/[id]" options={{ href: null }} />
    </Tabs>
  );
}
