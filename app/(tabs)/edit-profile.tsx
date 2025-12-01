import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";

export default function EditProfile(){
    const router = useRouter()
    return<SafeAreaView>
        <Stack.Screen
            options={{
                headerShown: true,
                headerShadowVisible: false,
            headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                            {/* Se precisar de um ícone: */}
                        <Ionicons name="arrow-back" size={24} color="black" /> 
                    </TouchableOpacity>
                ),
            }}      
        />
        <Text>Edit Profile</Text>
    </SafeAreaView>
}