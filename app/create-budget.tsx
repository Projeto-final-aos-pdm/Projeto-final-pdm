import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ColorSelector from './components/budgets/ColorSelector';

const COLORS = {
  background: '#F5F5F5',
  primary: '#6200EE', 
  textPrimary: '#000000',
  textSecondary: '#757575',
  inputBg: '#FFFFFF',
};

const CreateBudgetScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [selectedColor, setSelectedColor] = useState('#9C27B0'); 
  const [selectedIcon] = useState<keyof typeof MaterialCommunityIcons.glyphMap>('sofa'); 

  const handleCreate = () => {
    if (!name || !limit) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    console.log("Criar Orçamento:", { name, limit, selectedColor, selectedIcon });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: "", 
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerTintColor: COLORS.textPrimary,
          headerBackTitle: "", 
        }} 
      />

      <View style={styles.container}>
        
        {/* Pré-visualização */}
        <View style={styles.previewContainer}>
          <View style={[styles.previewCircle, { backgroundColor: selectedColor }]}>
             <MaterialCommunityIcons name={selectedIcon} size={40} color="#FFF" />
          </View>
          
          {/* Seletor de Cores logo abaixo */}
          <ColorSelector selectedColor={selectedColor} onSelect={setSelectedColor} />
        </View>

        {/* Inputs */}
        <View style={styles.form}>
          
          {/* Nome */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="tag-outline" size={24} color={COLORS.textSecondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Category Name"
              placeholderTextColor={COLORS.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Valor Limite */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="currency-usd" size={24} color={COLORS.textSecondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Total Budget"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              value={limit}
              onChangeText={setLimit}
            />
          </View>

        </View>

        {/* Botão Criar */}
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={handleCreate}
          activeOpacity={0.9}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>

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
    paddingHorizontal: 20,
    justifyContent: 'space-between', 
    paddingBottom: 30,
  },
  
  previewContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  previewCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  form: {
    flex: 1, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  createButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateBudgetScreen;