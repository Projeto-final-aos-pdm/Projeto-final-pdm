import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/OnboardingStyles'; 

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap; 
}

interface WalletListItemProps {
  wallet: Wallet;
  onPress: () => void;
}

const WalletListItem: React.FC<WalletListItemProps> = ({ wallet, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.leftContent}>
        {/* Ícone da Carteira */}
        <View style={styles.iconContainer}>
           <MaterialCommunityIcons name={wallet.icon} size={28} color={COLORS.textPrimary} />
        </View>
        
        <View>
          <Text style={styles.name}>{wallet.name}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.balance}>${wallet.balance.toFixed(2)}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2E', 
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#3A3A3C', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 8,
  },
});

export default WalletListItem;