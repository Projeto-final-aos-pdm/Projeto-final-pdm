import React from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, 
    StatusBar, FlatList, TouchableOpacity, 
    ListRenderItem 
} from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import DashboardHeader from './components/DashboardHeader'; 
import TransactionListItem from './components/TransactionListItem'; 
import { COLORS } from './styles/OnboardingStyles'; 

type TransactionData = {
  id: string;
  type: 'Income' | 'Expense';
  title: string;
  description: string;
  amount: string;
  date: string;
  iconColor: string;
  iconName: string | keyof typeof MaterialCommunityIcons.glyphMap;
};

const DUMMY_TRANSACTIONS: TransactionData[] = [
  { id: 'uuid-1', type: 'Expense', title: 'Health', description: 'checkup fee', amount: '25.00', date: '11 Dec', iconColor: '#E91E63', iconName: 'heart-outline' },
  { id: 'uuid-2', type: 'Income', title: 'Income', description: 'Gift from Family', amount: '60.00', date: '10 Dec', iconColor: '#00C853', iconName: 'currency-usd' },
  { id: 'uuid-3', type: 'Expense', title: 'Clothing', description: 'Winter Clothing', amount: '20.00', date: '10 Dec', iconColor: '#9C27B0', iconName: 'hanger' },
  { id: 'uuid-4', type: 'Income', title: 'Income', description: 'Cashback from CC', amount: '90.00', date: '9 Dec', iconColor: '#00C853', iconName: 'cash-usd' },
];

const HomeScreen: React.FC = () => {
  const userBalance = {
    userName: 'Syed Noman',
    totalBalance: '$484.00',
    totalIncome: '$2379.00',
    totalExpense: '$1895.00',
  };

  const handleAddTransaction = () => {
    router.push('/add-transaction');
  };

  const renderItem: ListRenderItem<TransactionData> = ({ item }) => (
    <TransactionListItem 
      transaction={item} 
      onPress={() => router.push({
        pathname: "/transaction/[id]",
        params: { id: item.id }
      })} 
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <FlatList 
        ListHeaderComponent={() => (
          <View style={styles.headerComponent}>
            <DashboardHeader 
              userName={userBalance.userName}
              totalBalance={userBalance.totalBalance}
              totalIncome={userBalance.totalIncome}
              totalExpense={userBalance.totalExpense}
            />
            <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
          </View>
        )}
        data={DUMMY_TRANSACTIONS}
        renderItem={renderItem}
        keyExtractor={(item: TransactionData) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity style={styles.fab} onPress={handleAddTransaction}>
        <MaterialCommunityIcons name="plus" size={30} color={COLORS.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerComponent: {
    paddingHorizontal: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  recentTransactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default HomeScreen;