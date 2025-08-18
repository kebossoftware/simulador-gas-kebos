import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { colors } from "global/colors";
import axios from "axios";

// Defina as rotas do seu app
type RootStackParamList = {
  APP: undefined;
  FormScreen: undefined;
};

interface FormData {
  name: string;
  phone: string;
  email: string;
}

export default function FormScreen() {
  const [firstAccess, setFirstAccess] = useState<boolean | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "" });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const net = await NetInfo.fetch();
        setConnected(net.isConnected ?? false);

        const response = await AsyncStorage.getItem("isFirstAccess");

        if (response === null && net.isConnected) {
          await AsyncStorage.setItem("isFirstAccess", JSON.stringify(true));
          setFirstAccess(true);
        } else {
          setFirstAccess(false);
          navigation.navigate("APP");
        }
      } catch (e) {
        console.log("Erro ao verificar primeiro acesso:", e);
        setFirstAccess(false);
      }
    };

    checkAccess();
  }, [navigation]);

  const handleSendEmail = async () => {
    if (!form.name || !form.phone || !form.email) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    if (!connected) {
      Alert.alert("Sem conexão, não é possível enviar os dados.");
      return;
    }

    Alert.alert(
      "Confirmar envio",
      `Você deseja enviar os seguintes dados?\n\nNome: ${form.name}\nTelefone: ${form.phone}\nEmail: ${form.email}`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Enviar",
          onPress: async () => {
            try {
              const response = await axios.post(
                "https://r5u2xdj485.execute-api.us-east-1.amazonaws.com/api-18-08-02-32/send-email",
                form, // 👈 envia o JSON direto
                { headers: { "Content-Type": "application/json" } }
              );

              console.log("API response:", response.data);

              if (response.status === 200) {
                Alert.alert("Email enviado com sucesso!");
                navigation.navigate("APP");
              } else {
                Alert.alert("Erro ao enviar email.");
              }
            } catch (error: any) {
              console.log("Erro ao enviar email:", error.response?.data || error.message);
              Alert.alert("Erro ao enviar email.");
            }
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    navigation.navigate("APP");
  };

  if (firstAccess === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.greenDark} />
      </View>
    );
  }

  if (!connected) {
    return (
      <View style={styles.center}>
        <Text>Conecte-se à internet para continuar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {firstAccess && connected && (
        <>
          <Text style={styles.title}>🎉 Primeiro Acesso</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={handleSkip}
          >
            <Text style={[styles.buttonText, { color: colors.greenDark }]}>
              Pular
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.greenDark,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  skipButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.greenDark,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
