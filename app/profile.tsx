import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';

import ProfileHeader from './components/profile/ProfileHeader';
import ProfileListItem from './components/profile/ProfileListItem';
import { COLORS } from './styles/OnboardingStyles'; 

const USER_DATA = {
  name: 'Syed Noman',
  email: 'syed@mail.com',
  avatarUrl: 'URL_DA_IMAGEM_AQUI',
};

const ProfileScreen: React.FC = () => {

  const handleEditProfile = () => {
    console.log("Navegar para Editar Perfil");
  };

  const handleLogout = () => {
    console.log("Executar Logout");
    router.replace('/login'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Profile",
          headerStyle: { backgroundColor: COLORS.background },
          headerTitleStyle: { color: COLORS.textPrimary },
          headerShadowVisible: false,
          headerBackVisible: false, 
        }} 
      /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho com Avatar */}
        <ProfileHeader 
          name={USER_DATA.name} 
          email={USER_DATA.email} 
          avatarUrl={USER_DATA.avatarUrl}
        />
        
        {/* Lista de Opções */}
        <View style={styles.menuContainer}>
          <ProfileListItem 
            icon="account-edit" 
            iconColor="#3F51B5" 
            text="Edit Profile" 
            onPress={handleEditProfile} 
          />
          <ProfileListItem 
            icon="cog" 
            iconColor="#00C853" 
            text="Settings" 
            onPress={() => {}} 
          />
          <ProfileListItem 
            icon="shield-lock" 
            iconColor="#FF9800" 
            text="Privacy Policy" 
            onPress={() => {}} 
          />
          <ProfileListItem 
            icon="logout" 
            iconColor={COLORS.expense} 
            text="Logout" 
            onPress={handleLogout} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  menuContainer: {
    width: '100%',
  },
});

export default ProfileScreen;