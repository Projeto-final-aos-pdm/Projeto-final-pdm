import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/OnboardingStyles'; 
interface SpendingChartProps {
  data: { category: string; amount: number; percentage: number; color: string }[];
  totalSpent: number;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data, totalSpent }) => {
  // Simulação: Aqui entra o código real do gráfico 

  return (
    <View style={styles.chartContainer}>
      {/* 1. Área do Gráfico (Simulação Visual) */}
      <View style={styles.chartArea}>
        <Text style={styles.totalLabel}>Total Spent</Text>
        <Text style={styles.totalAmount}>${totalSpent.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
    height: 300, 
  },
  chartArea: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3C3C3C', 
    
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 5,
  },
});

export default SpendingChart;