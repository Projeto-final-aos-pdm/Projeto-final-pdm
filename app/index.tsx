import { router } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import OnboardingContent from "./components/OnboardingContent";
import PrimaryButton from "./components/ui/PrimaryButton";

const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  return (
    <SafeAreaView
      style={[styles.container, { paddingBottom: insets.bottom }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.innerContainer}>
        <OnboardingContent />

        <PrimaryButton title="Get Started" onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
});

export default OnboardingScreen;
