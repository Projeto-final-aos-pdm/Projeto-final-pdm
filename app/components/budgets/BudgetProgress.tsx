import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  cardBg: '#FFFFFF', 
  textPrimary: '#000000',
  textSecondary: '#757575',
  barBackground: '#E0E0E0',
  deleteIcon: '#D32F2F', 
};

interface BudgetProgressProps {
  categoryName: string;
  itemCount: number;
  spentAmount: number;
  totalBudget: number;
  color: string; 
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ 
  categoryName, itemCount, spentAmount, totalBudget, color, icon 
}) => {
  
  const progressPercent = Math.min((spentAmount / totalBudget) * 100, 100);

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho: Ícone + Nome + Lixeira */}
      <View style={styles.headerRow}>
        <View style={[styles.iconBox, { backgroundColor: color }]}>
           <MaterialCommunityIcons name={icon} size={32} color="#FFF" />
        </View>
        
        <View style={styles.titleBox}>
          <Text style={styles.categoryName}>{categoryName}</Text>
          <Text style={styles.itemCount}>{itemCount} Item{itemCount !== 1 ? 's' : ''}</Text>
        </View>

        <MaterialCommunityIcons name="trash-can-outline" size={24} color={COLORS.deleteIcon} />
      </View>

      {/* Linha de Valores */}
      <View style={styles.valuesRow}>
        <Text style={styles.spentText}>${spentAmount}</Text>
        <Text style={styles.totalText}>Total Budget: {totalBudget}</Text>
      </View>

      {/* Barra de Progresso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: color }]} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  titleBox: {
    flex: 1,
  },
  categoryName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  itemCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  
  // Valores
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  spentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  // Barra de Progresso
  progressBarContainer: {
    height: 12,
    backgroundColor: COLORS.barBackground,
    borderRadius: 6,
    overflow: 'hidden', 
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
});

export default BudgetProgress;