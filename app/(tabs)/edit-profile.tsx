import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity, View } from "react-native";

import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { getUserData, updateUser } from "@/src/services/user";
import { User } from "@/src/types/userTypes";
import ProfileInput from "../components/profile/ProfileInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { COLORS } from "../styles/OnboardingStyles";

export default function EditProfileScreen() {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);

  async function handleUpdateUser() {
    try {
      setLoading(true);
      await updateUser({ name: userData?.name, email: userData?.email });
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (error) {
      Alert.alert("Erro", "Erro no servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "Edit Profile",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.background },
          headerBackVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Ionicons
                name="arrow-back"
                size={24}
                style={{ marginLeft: 8, padding: 5 }}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputContain}>
          <ProfileInput
            label="Name:"
            value={userData?.name || "loading informations"}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev!, name: text }))
            }
          />
          <ProfileInput
            label="Email:"
            value={userData?.email || "loading informations"}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev!, email: text }))
            }
          />
          <PrimaryButton
            title="Change data"
            disabled={loading}
            onPress={handleUpdateUser}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  inputContain: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
