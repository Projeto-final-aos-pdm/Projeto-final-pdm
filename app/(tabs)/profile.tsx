import { Stack, router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { deleteUser, getUserData } from "@/src/services/user";
import { User } from "@/src/types/userTypes";
import { logout } from "../../src/services/authentication";
import { useStore } from "../../src/store/storage";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileListItem from "../components/profile/ProfileListItem";
import { COLORS } from "../styles/OnboardingStyles";

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<User>();
  const token = useStore((state: any) => state.isToken);
  const clearToken = useStore((state: any) => state.clearToken);

  const handleConfirmLogout = () => {
    Alert.alert(
      "Confirmar ação",
      "Você realmente deseja sair da sua conta?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: handleLogout,
        },
      ],
      { cancelable: true }
    );
  };

  const handleConfirmDeleteAccount = () => {
    Alert.alert(
      "Confirmar ação",
      "Você realmente deseja deletar a sua conta?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleLogout = async () => {
    try {
      await logout(token);
      clearToken();
      router.replace("/login");
    } catch (error) {
      // Clear token locally even if backend request fails
      clearToken();
      router.replace("/login");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      Alert.alert("Aviso", "Usuário deletado");
      clearToken();
      router.replace("/login");
    } catch (error) {
      clearToken();
      router.replace("/login");
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function load() {
        try {
          const data = await getUserData();
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      }

      load();
    }, [])
  );

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
        <ProfileHeader
          name={userData?.name || "Carregando informações"}
          email={userData?.email || "Carregando informações"}
        />

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
            icon="delete"
            iconColor="#f33942ff"
            text="Delete Account"
            onPress={handleConfirmDeleteAccount}
          />
          <ProfileListItem
            icon="logout"
            iconColor={COLORS.expense}
            text="Logout"
            onPress={handleConfirmLogout}
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
    width: "100%",
  },
});

export default ProfileScreen;
