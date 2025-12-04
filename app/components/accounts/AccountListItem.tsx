import { COLORS } from "@/app/styles/OnboardingStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AccountProps = {
  titleAccount: string;
  accountID: string;
  is_active: boolean;
  handleDelete: () => void;
  handleUpdate: () => void;
};

export default function AccountListItem({
  titleAccount,
  accountID,
  is_active,
  handleDelete,
  handleUpdate,
}: AccountProps) {
  function handleAccountDetails() {
    router.push(`/transaction/${accountID}`);
  }

  return (
    <TouchableOpacity style={styles.contain} onPress={handleAccountDetails}>
      <View style={styles.containData}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Ionicons name="card-outline" size={25} color="white" />
          <Text style={styles.text}>{titleAccount}</Text>
        </View>

        <Ionicons name="arrow-forward-outline" size={25} color="white" />
      </View>

      <View
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.text}>Status:</Text>

          <Text style={is_active ? styles.active : styles.disabled}>
            {is_active ? "True" : "False"}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleUpdate}>
            <Ionicons name="wallet-outline" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: COLORS.itemBackground,

    width: "100%",
    height: "auto",

    padding: 16,

    borderRadius: 8,
  },
  containData: {
    width: "100%",

    borderBottomWidth: 1,
    borderBlockColor: COLORS.buttonText,

    padding: 8,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: COLORS.textPrimary,
  },
  active: {
    color: COLORS.accent,
    fontWeight: "bold",
  },
  disabled: {
    color: COLORS.expense,
    fontWeight: "bold",
  },
});
