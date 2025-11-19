import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import WalletListItem, { Wallet } from './components/wallet/WalletListItem';
import { COLORS } from './styles/OnboardingStyles';

// Dados Mockados 
const DUMMY_WALLETS: Wallet[] = [
  { id: '1', name: 'Side hustle', balance: 70.00, icon: 'piggy-bank' },
  { id: '2', name: 'Freelancing', balance: 335.00, icon: 'laptop' },
  { id: '3', name: 'Salary', balance: 79.00, icon: 'office-building' },
  { id: '4', name: 'Investments', balance: 1200.50, icon: 'chart-line' },
];

const WalletsScreen: React.FC = () => {
  
  const totalBalance = DUMMY_WALLETS.reduce((sum, item) => sum + item.balance, 0);

  const handleAddWallet = () => {
    router.push('/add-wallet'); 
  };

  const handleEditWallet = (id: string) => {
    console.log(`Editar Carteira: ${id}`);
    router.push({ pathname: '/add-wallet', params: { id } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Cabeçalho Personalizado */}
      <View style={styles.header}>
        {/* Botão Voltar */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Wallets</Text>
        
        {/* Placeholder para alinhar o título (vazio) */}
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Seção de Saldo Total */}
        <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>${totalBalance.toFixed(2)}</Text>
        </View>

        {/* Seção da Lista */}
        <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Wallets</Text>
            <TouchableOpacity onPress={handleAddWallet}>
                <MaterialCommunityIcons name="plus-circle" size={32} color={COLORS.accent} />
            </TouchableOpacity>
        </View>

        <FlatList 
            data={DUMMY_WALLETS}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <WalletListItem wallet={item} onPress={() => handleEditWallet(item.id)} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Saldo Total
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  balanceValue: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  // Lista
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  listContent: {
    paddingBottom: 50,
  },
});

export default WalletsScreen;