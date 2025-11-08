import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SpendingChart from './components/charts/SpendingChart';
import { COLORS } from './styles/OnboardingStyles'; 

const CHART_DATA = [
  { category: 'Food', amount: 350.5, percentage: 40, color: '#FF7043' },
  { category: 'Shopping', amount: 200.0, percentage: 22.9, color: '#3F51B5' },
  { category: 'Transport', amount: 150.0, percentage: 17.2, color: '#00C853' },
  { category: 'Other', amount: 175.0, percentage: 19.9, color: '#FBC02D' },
];
const TOTAL_SPENT = CHART_DATA.reduce((sum, item) => sum + item.amount, 0);

const StatsScreen: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<'Month' | 'Week' | 'Year'>('Month');
  
  const handlePeriodChange = (period: 'Month' | 'Week' | 'Year') => {
    setTimePeriod(period);
    console.log(`Dados para o período: ${period}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen 
        options={{ 
          headerShown: false, 
        }} 
      /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
            <Text style={styles.screenTitle}>Spending Summary</Text>
            <TouchableOpacity onPress={() => console.log('Opções')}>
                <MaterialCommunityIcons name="cog-outline" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
        </View>

        {/* 1. Abas de Período (Segmented Control) */}
        <View style={styles.periodTabs}>
          {['Month', 'Week', 'Year'].map(period => (
            <TouchableOpacity
              key={period}
              style={timePeriod === period ? styles.tabActive : styles.tabInactive}
              onPress={() => handlePeriodChange(period as 'Month' | 'Week' | 'Year')}
            >
              <Text style={timePeriod === period ? styles.tabTextActive : styles.tabTextInactive}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. Gráfico */}
        <SpendingChart data={CHART_DATA} totalSpent={TOTAL_SPENT} />

        {/* 3. Detalhes de Gastos por Categoria */}
        <View style={styles.detailsListContainer}>
          <Text style={styles.listTitle}>Top Spending Categories</Text>
          
          {CHART_DATA.map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryLeft}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                <Text style={styles.categoryName}>{item.category}</Text>
              </View>
              <View style={styles.categoryRight}>
                <Text style={styles.categoryAmount}>${item.amount.toFixed(2)}</Text>
                <Text style={styles.categoryPercentage}>{item.percentage.toFixed(1)}%</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, 
  },
  
  // --- Header ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  // --- Abas de Período ---
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E', 
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  tabActive: {
    flex: 1,
    backgroundColor: COLORS.accent, 
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tabTextActive: {
    color: COLORS.background, 
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabTextInactive: {
    color: COLORS.textPrimary, 
  },

  // --- Lista de Detalhes ---
  detailsListContainer: {
    marginTop: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3C3C3C',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 10,
  },
  categoryPercentage: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
});

export default StatsScreen;