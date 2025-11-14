import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";

const colors = {
  white: "#ffffff",
  greenDark: "#325744",
  lightBg: "#ffffff",
  lightInput: "#f2f2f2",
  textLight: "#1a1a1a",
};

export default function RegisterScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !telefone || !email || !senha) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://r5u2xdj485.execute-api.us-east-1.amazonaws.com/api-get-images/auth/register",
        { nome, telefone, email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        return navigation.reset({
          index: 0,
          routes: [{ name: "TERMS" }],
        });
      }

      Alert.alert("Erro", "Não foi possível cadastrar.");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.lightBg }]}>

      {/* Logo */}
      <Image
        source={require("../assets/kebosLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: colors.textLight }]}>
        Criar Conta
      </Text>

      <Text style={[styles.subtitle, { color: "#555" }]}>
        Preencha seus dados para continuar
      </Text>

      {/* Inputs */}
      <TextInput
        style={[styles.input, { backgroundColor: colors.lightInput }]}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.lightInput }]}
        placeholder="Telefone"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.lightInput }]}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.lightInput }]}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.white} /> : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.link, { color: colors.greenDark }]}>
          Já tenho uma conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1.3,
    borderColor: "#d4d4d4",
  },

  button: {
    backgroundColor: colors.greenDark,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600",
  },

  link: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 15,
    fontWeight: "500",
  },
});
