import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
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
  cardBackground: '#39393C', 
  textLight: GlobalColors.textPrimary,
  textMuted: GlobalColors.textSecondary,
  income: GlobalColors.income,
  expense: GlobalColors.expense,
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

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance}</Text>
        
        <View style={styles.detailsRow}>
          
          <View style={styles.detailBox}>
            <View style={dynamicStyles.iconCircle(COLORS.income)}>
              <MaterialCommunityIcons name="arrow-bottom-left" size={20} color={COLORS.cardBackground} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Income</Text>
              <Text style={dynamicStyles.detailAmount(COLORS.income)}>{totalIncome}</Text>
            </View>
          </View>

          <View style={styles.detailBox}>
            <View style={dynamicStyles.iconCircle(COLORS.expense)}>
              <MaterialCommunityIcons name="arrow-top-right" size={20} color={COLORS.cardBackground} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Expense</Text>
              <Text style={dynamicStyles.detailAmount(COLORS.expense)}>{totalExpense}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = {
    iconCircle: (color: string): ViewStyle => ({
        backgroundColor: color,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    }),
    detailAmount: (color: string): TextStyle => ({
        color: color,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 2,
    }),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 10,
  },
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
    fontSize: 16,
    color: COLORS.textMuted,
  },
  balanceAmount: {
    color: COLORS.textLight,
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
  },
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
  detailLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});

export default DashboardHeader;