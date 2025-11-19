import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CategoryGridItem from './components/ui/CategoryGridItem';

// Dados de Categorias Mock
const CATEGORIES = [
  { id: '1', name: 'Food', icon: 'hamburger' },
  { id: '2', name: 'Bills', icon: 'lightbulb-on' },
  { id: '3', name: 'Family', icon: 'account-group' },
  { id: '4', name: 'Healthcare', icon: 'hospital-box' },
  { id: '5', name: 'Fuel', icon: 'gas-station' },
  { id: '6', name: 'Internet', icon: 'wifi' },
  { id: '7', name: 'Education', icon: 'book-open-variant' },
  { id: '8', name: 'Entertainment', icon: 'movie-open' },
  { id: '9', name: 'Shopping', icon: 'shopping' },
  { id: '10', name: 'Travel', icon: 'airplane' },
];

const SelectCategoryScreen: React.FC = () => {
  
  const handleSelect = (categoryName: string) => {
    console.log(`Categoria Selecionada: ${categoryName}`);
    router.back(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Configuração do Header Modal */}
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: "", 
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
               <MaterialCommunityIcons name="close" size={28} color="#000" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: '#F5F5F5' },
          headerShadowVisible: false,
          presentation: 'modal', 
        }} 
      />

      <View style={styles.container}>
        {/* Título Grande */}
        <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Select Category</Text>
            <Text style={styles.subtitle}>
                Select a category that best describes what you spent money on.
            </Text>
        </View>

        {/* Grid de Categorias */}
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row} 
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CategoryGridItem 
              icon={item.icon as any} 
              label={item.name} 
              onPress={() => handleSelect(item.name)} 
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between', 
  },
});

export default SelectCategoryScreen;