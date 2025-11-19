import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import BudgetProgress from '../components/budgets/BudgetProgress';
import BudgetItemList, { BudgetItem } from '../components/budgets/BudgetListItem';
import FabButton from '.././components/ui/FabButton'; 

const COLORS = {
  background: '#FFFFFF',
  textPrimary: '#000000',
  fabColor: '#6200EE', 
};

const BudgetDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const budgetData = {
    id: id,
    name: 'Travel',
    totalBudget: 2000,
    spentAmount: 400,
    icon: 'beach' as any,
    color: '#00C853', 
    items: [
        { id: '1', name: 'Hotel', cost: 400 }
    ] as BudgetItem[]
  };

  const handleAddItem = () => {
    router.push('/add-budget-item'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: "", 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.textPrimary, 
          headerBackTitle: "",
        }} 
      />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Progresso do Orçamento */}
            <BudgetProgress 
                categoryName={budgetData.name}
                itemCount={budgetData.items.length}
                spentAmount={budgetData.spentAmount}
                totalBudget={budgetData.totalBudget}
                color={budgetData.color}
                icon={budgetData.icon}
            />

            {/* Título da Lista */}
            <Text style={styles.listTitle}>Item List</Text>

            {/* Lista de Itens */}
            <BudgetItemList items={budgetData.items} />

        </ScrollView>

        {/* Botão Flutuante (FAB) */}
        <FabButton 
            onPress={handleAddItem} 
            style={{ backgroundColor: COLORS.fabColor }} 
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
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
});

export default BudgetDetailScreen;