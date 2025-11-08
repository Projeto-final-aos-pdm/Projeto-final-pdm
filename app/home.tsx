import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import DashboardHeader from './components/DashboardHeader'; 
import TransactionListItem from './components/TransactionListItem'; 
import { COLORS } from './styles/OnboardingStyles'; 

const DUMMY_TRANSACTIONS = [
  { id: '1', type: 'Expense', title: 'Health', description: 'checkup fee', amount: '25.00', date: '11 Dec', iconColor: '#E91E63', iconName: 'heart-outline' },
  { id: '2', type: 'Income', title: 'Income', description: 'Gift from Family', amount: '60.00', date: '10 Dec', iconColor: '#00C853', iconName: 'currency-usd' },
  { id: '3', type: 'Expense', title: 'Clothing', description: 'Winter Clothing', amount: '20.00', date: '10 Dec', iconColor: '#9C27B0', iconName: 'hanger' },
  { id: '4', type: 'Income', title: 'Income', description: 'Cashback from CC', amount: '90.00', date: '9 Dec', iconColor: '#00C853', iconName: 'cash-usd' },
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
    console.log("Navegar para Adicionar Transação");
  };

  const renderItem = ({ item }) => (
    <TransactionListItem 
      transaction={item} 
      onPress={() => router.push(`/transaction/${item.id}`)} // Navegar para detalhes/edição
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      {/* Oculta o header nativo, pois usamos um componente customizado (DashboardHeader) */}
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <FlatList 
        ListHeaderComponent={() => (
          <View style={styles.headerComponent}>
            {/* 1. Componente de Cabeçalho e Card de Saldo */}
            <DashboardHeader 
              userName={userBalance.userName}
              totalBalance={userBalance.totalBalance}
              totalIncome={userBalance.totalIncome}
              totalExpense={userBalance.totalExpense}
            />
            {/* 2. Título da Lista */}
            <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
          </View>
        )}
        data={DUMMY_TRANSACTIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      {/* 3. Floating Action Button (FAB) */}
      <TouchableOpacity style={styles.fab} onPress={handleAddTransaction}>
        <MaterialCommunityIcons name="plus" size={30} color={COLORS.background} />
      </TouchableOpacity>

      {/* A TabBar seria renderizada pelo componente de layout do Expo Router (não neste arquivo) */}
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