import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";

const colors = {
  white: "#ffffff",
  greenDark: "#325744",
  text: "#111111",
  subtitle: "#555555",
  inputBg: "#f3f3f3",
  border: "#cccccc",
};

export default function LoginScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha email e senha!");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://r5u2xdj485.execute-api.us-east-1.amazonaws.com/api-get-images/auth/login",
        { email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.statusCode === 200) {
        return navigation.reset({
          index: 0,
          routes: [{ name: "TERMS" }],
        });
      }

      Alert.alert("Erro", "Credenciais inválidas");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha no login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      
      {/* LOGO */}
      <Image
        source={require("../assets/kebosLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: colors.text }]}>
        Bem-vindo
      </Text>

      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        Entre para continuar
      </Text>

      {/* EMAIL */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Email
        </Text>
        <TextInput
          style={[
            styles.input, 
            {
              backgroundColor: colors.inputBg,
              borderColor: colors.border,
              color: colors.text
            }
          ]}
          placeholder="Digite seu email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* SENHA */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Senha
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBg,
              borderColor: colors.border,
              color: colors.text
            }
          ]}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {/* BOTÃO LOGIN */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.greenDark }
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* LINK CADASTRO */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={[styles.link, { color: colors.greenDark }]}>
          Criar uma conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 35,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.9,
  },

  input: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 16,
  },

  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },

  link: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 15,
    fontWeight: "500",
  },
});
