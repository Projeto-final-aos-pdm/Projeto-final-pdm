import { COLORS } from "@/app/styles/OnboardingStyles";
import { StyleSheet, Text, TextInput, View } from "react-native";

type ProfileInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function ProfileInput({
  label,
  value,
  onChangeText,
}: ProfileInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: COLORS.itemBackground,

    color: COLORS.textPrimary,

    height: 45,
    width: 300,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
