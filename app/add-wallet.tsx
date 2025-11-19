import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PrimaryButton from './components/ui/PrimaryButton';
import IconSelector from './components/wallet/IconSelector';
import { COLORS } from './styles/OnboardingStyles';

const AddWalletScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!id;

  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('wallet');

  useEffect(() => {
    if (isEditing) {
      setName('Side hustle'); 
      setBalance('70.00');    
      setSelectedIcon('piggy-bank'); 
    }
  }, [id]);

  const handleSave = () => {
    if (!name) {
      Alert.alert('Error', 'Please enter a wallet name');
      return;
    }
    
    const payload = { name, balance: parseFloat(balance) || 0, icon: selectedIcon };

    if (isEditing) {
      console.log('Atualizar Carteira:', id, payload);
    } else {
      console.log('Criar Carteira:', payload);
    }
    
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Wallet",
      "Are you sure you want to delete this wallet?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            console.log('Deletar Carteira:', id);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: isEditing ? 'Update Wallet' : 'New Wallet',
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.textPrimary,
          headerShadowVisible: false,
          headerBackTitle: "",
        }} 
      />

      <View style={styles.content}>
        
        {/* Input Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wallet Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Secret Vault"
            placeholderTextColor={COLORS.textSecondary}
            value={name}
            onChangeText={setName}
            selectionColor={COLORS.accent}
          />
        </View>

        {/* Input Saldo Inicial */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Initial Balance</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
            value={balance}
            onChangeText={setBalance}
            selectionColor={COLORS.accent}
          />
        </View>

        {/* Seletor de Ícone */}
        <IconSelector selectedIcon={selectedIcon} onSelect={setSelectedIcon} />

      </View>

      {/* Footer com Botões */}
      <View style={styles.footer}>
        {/* Botão de Deletar (Só aparece na edição) */}
        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <MaterialCommunityIcons name="trash-can-outline" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
        )}

        {/* Botão de Salvar */}
        <View style={{ flex: 1, marginLeft: isEditing ? 15 : 0 }}>
            <PrimaryButton 
                title={isEditing ? 'Update Wallet' : 'Add Wallet'} 
                onPress={handleSave} 
            />
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  
  // Footer
  footer: {
    padding: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    width: 55,
    height: 55,
    backgroundColor: '#FF3B30', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddWalletScreen;