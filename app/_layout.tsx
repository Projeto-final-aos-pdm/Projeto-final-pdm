import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useStore } from "../src/store/storage";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const token = useStore((state) => state.isToken);
  const isHydrated = useStore((state) => state.isHydrated);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    setIsNavigationReady(true);
  }, []);

  useEffect(() => {
    if (!isNavigationReady || !isHydrated) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const inRoot = !inAuthGroup && !inTabsGroup;

    // Redirect authenticated users away from auth screens
    if (token && inAuthGroup) {
      router.replace("/(tabs)/home");
      return;
    }

    // Redirect authenticated users from root to home
    if (token && inRoot) {
      router.replace("/(tabs)/home");
      return;
    }

    // Redirect unauthenticated users away from protected routes
    if (!token && inTabsGroup) {
      router.replace("/");
      return;
    }
  }, [token, segments, isNavigationReady, isHydrated, router]);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000000" },
        }}
      />
    </SafeAreaProvider>
  );
}
