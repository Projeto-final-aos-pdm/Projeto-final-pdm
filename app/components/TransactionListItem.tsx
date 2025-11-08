import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { COLORS as GlobalColors } from '../styles/OnboardingStyles';

interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  title: string;
  description: string;
  amount: string;
  date: string;
  iconName: string | keyof typeof MaterialCommunityIcons.glyphMap; 
  iconColor: string;
}

interface TransactionListItemProps {
  transaction: Transaction;
  onPress: () => void;
}

const COLORS = {
  ...GlobalColors,
  itemBackground: '#2C2C2E', 
  textLight: GlobalColors.textPrimary,
  textMuted: GlobalColors.textSecondary,
  income: GlobalColors.income,
  expense: GlobalColors.expense,
};

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction, onPress }) => {
  
  const amountColor = transaction.type === 'Income' ? COLORS.income : COLORS.expense;
  const amountPrefix = transaction.type === 'Income' ? '+' : '-';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.leftContainer}>
        
        {/* Ícone da Categoria - Usa a função de estilo dinâmico */}
        <View style={dynamicStyles.iconWrapper(transaction.iconColor)}>
          <MaterialCommunityIcons 
            name={transaction.iconName as keyof typeof MaterialCommunityIcons.glyphMap} 
            size={24} 
            color={COLORS.textLight} 
          />
        </View>
        
        <View style={styles.textGroup}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.description}>{transaction.description}</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountPrefix}{transaction.amount}
        </Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const dynamicStyles = {
    iconWrapper: (color: string): ViewStyle => ({
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    }),
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.itemBackground,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textGroup: {
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  description: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});

export default TransactionListItem;