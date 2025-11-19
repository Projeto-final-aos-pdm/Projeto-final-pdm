import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  textPrimary: '#1C1C1E',
  textSecondary: '#6C757D',
  backgroundLight: '#FFFFFF',
  legendBlue: '#3F51B5',
  legendGreen: '#00C853',
};

const DUMMY_DATA = [
  { name: 'Living Room', color: COLORS.legendBlue },
  { name: 'Bathroom', color: COLORS.legendGreen },
];

const BudgetSummaryCard: React.FC<{ totalEstimate: number }> = ({ totalEstimate }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total Estimate: ${totalEstimate}</Text>
      
      <View style={styles.content}>
        {/* Placeholder para o Gráfico Donut */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>[Gráfico Donut]</Text>
        </View>

        {/* Legenda */}
        <View style={styles.legendContainer}>
          {DUMMY_DATA.map(item => (
            <View key={item.name} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chartPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  legendContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
});

export default BudgetSummaryCard;