import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { COLORS as GlobalColors } from '../styles/OnboardingStyles'; 

interface DashboardHeaderProps {
  userName: string;
  totalBalance: string;
  totalIncome: string;
  totalExpense: string;
}

const COLORS = {
  ...GlobalColors, 
  cardBackground: '#39393C', // Um cinza mais claro para o card
  textLight: GlobalColors.textPrimary, // Branco
  textMuted: '#AEAEB2', // Cinza claro
  income: '#00C853', // Verde para Renda
  expense: '#DC3545', // Vermelho para Despesa
  accent: GlobalColors.accent, // Verde-Limão
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  totalBalance, 
  totalIncome, 
  totalExpense 
}) => {

  const handleNotifications = () => console.log("Ver Notificações");
  const handleAccountSettings = () => console.log("Abrir Configurações");

  return (
    <View style={styles.container}>
      
      {/* 1. Header Superior (Saudação e Ícones) */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={handleNotifications}>
            <MaterialCommunityIcons 
              name="bell-outline" 
              size={24} 
              color={COLORS.textLight} 
              style={styles.iconSpacing}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAccountSettings}>
            <MaterialCommunityIcons 
              name="account-circle-outline" 
              size={24} 
              color={COLORS.textLight} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Card de Resumo de Saldo */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance}</Text>
        
        <View style={styles.detailsRow}>
          {/* Card de Renda */}
          <View style={styles.detailBox}>
            <View style={styles.iconCircle(COLORS.income)}>
              <MaterialCommunityIcons name="arrow-bottom-left" size={20} color={COLORS.cardBackground} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Income</Text>
              <Text style={styles.detailAmount(COLORS.income)}>{totalIncome}</Text>
            </View>
          </View>

          {/* Card de Despesa */}
          <View style={styles.detailBox}>
            <View style={styles.iconCircle(COLORS.expense)}>
              <MaterialCommunityIcons name="arrow-top-right" size={20} color={COLORS.cardBackground} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Expense</Text>
              <Text style={styles.detailAmount(COLORS.expense)}>{totalExpense}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 10,
  },
  
  // --- Top Bar ---
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  welcomeText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  userName: {
    color: COLORS.textLight,
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginRight: 15,
  },

  // --- Balance Card ---
  balanceCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    shadowColor: COLORS.background,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceTitle: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  balanceAmount: {
    color: COLORS.textLight,
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  
  // --- Income/Expense Details ---
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  detailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  iconCircle: (color: string) => ({
    backgroundColor: color,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  }),
  detailLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  detailAmount: (color: string) => ({
    color: color,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  }),
});

export default DashboardHeader;