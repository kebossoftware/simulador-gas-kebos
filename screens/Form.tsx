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
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { colors } from "global/colors";
import axios from "axios";
import { RootStackParamList } from "../App";

interface FormData {
  name: string;
  phone: string;
  email: string;
}

export default function FormScreen() {
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "" });
  const [showTerms, setShowTerms] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [firstAccess, setFirstAccess] = useState(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 200));

        const [net, storedForm, storedTerms, storedFirstAccess] = await Promise.all([
          NetInfo.fetch(),
          AsyncStorage.getItem("formCompleted"),
          AsyncStorage.getItem("termsAccepted"),
          AsyncStorage.getItem("firstAccess"),
        ]);

        if (!isMounted) return;

        setConnected(net.isConnected ?? false);

        const hasForm = storedForm === "true";
        const hasTerms = storedTerms === "true";
        const firstAccessFlag = storedFirstAccess === null ? true : storedFirstAccess !== "false";

        setFormCompleted(hasForm);
        setTermsAccepted(hasTerms);
        setFirstAccess(firstAccessFlag);

        if (hasForm && !hasTerms) {
          setShowTerms(true);
          return;
        }

        if (hasForm && hasTerms) {
          setTimeout(() => {
            if (navigation && navigation.reset) {
              navigation.reset({
                index: 0,
                routes: [{ name: "APP" }],
              });
            }
          }, 300);
        }
      } catch (e) {
        console.log("Erro ao inicializar dados:", e);
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trimEnd();
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trimEnd();
    }
  };

  const handleSendEmail = async () => {
    // 🔹 Validações básicas
    if (!form.name || !form.phone || !form.email) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    if (!isValidEmail(form.email)) {
      Alert.alert("Email inválido!");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      Alert.alert("Telefone inválido!");
      return;
    }
    if (!connected) {
      Alert.alert("Sem conexão", "Não é possível enviar os dados no momento.");
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
              setLoading(true);

              const source = axios.CancelToken.source();
              const timeout = setTimeout(() => {
                source.cancel("Tempo de requisição excedido");
              }, 10000);

              const response = await axios.post(
                "https://r5u2xdj485.execute-api.us-east-1.amazonaws.com/api-18-08-02-32/send-email",
                form,
                {
                  headers: { "Content-Type": "application/json" },
                  cancelToken: source.token,
                }
              );

              clearTimeout(timeout);

              if (response.status === 200) {
                await Promise.all([
                  AsyncStorage.setItem("formCompleted", JSON.stringify(true)),
                  AsyncStorage.setItem("firstAccess", JSON.stringify(false)),
                ]);

                setFormCompleted(true);
                setShowTerms(true);
              } else {
                Alert.alert("Erro", "Não foi possível enviar os dados.");
              }
            } catch (error: any) {
              console.log("Erro ao enviar email:", error.response?.data || error.message);

              if (axios.isCancel(error)) {
                Alert.alert("Tempo esgotado", "A conexão demorou muito para responder.");
              } else {
                Alert.alert("Erro", "Falha ao enviar os dados.");
              }
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };


  const handleSkip = async () => {
    await AsyncStorage.setItem("firstAccess", "false");
    setFirstAccess(false);
    Alert.alert("Lembre-se", "Você poderá preencher o formulário a qualquer momento ao abrir o app novamente.");
  };

  const handleAcceptTerms = async () => {
    await AsyncStorage.setItem("termsAccepted", "true");
    setShowTerms(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "APP" }],
    });
  };

  if (!connected) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#000" }}>Conecte-se à internet para continuar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!formCompleted && (
        <>
          <Text style={styles.title}>
            Preencha para receber informações exclusivas do nosso software
          </Text>

          {/* Aviso sobre armazenamento local */}
          <Text style={styles.notice}>
            🔒 Seus dados serão salvos com segurança neste dispositivo para que você não precise preencher novamente.
          </Text>

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
            onChangeText={(t) => setForm({ ...form, phone: formatPhone(t) })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendEmail} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar</Text>}
          </TouchableOpacity>

          {/* Botão Pular só no primeiro acesso */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#999" }]}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "APP" }],
              });
            }}
          >
            <Text style={styles.buttonText}>Pular</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal animationType="slide" transparent={true} visible={showTerms}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Termos de Uso</Text>
            <ScrollView style={{ marginBottom: 20 }}>
              <Text style={styles.modalText}>
                Este simulador é um aplicativo que reproduz o comportamento de um sistema sob determinadas condições, permitindo simular cenários com base em dados fornecidos pelo usuário.
                {"\n\n"}
                ⚠️ Importante:
                <Text style={{ fontWeight: 'bold', color: "#000" }}> o simulador não deve ser utilizado como equipamento de medição oficial </Text>
                e
                <Text style={{ fontWeight: 'bold', color: "#000" }}> não pode ser usado para autorizar ou liberar serviços</Text>.
                {"\n\n"}
                Seu uso é estritamente para apoio à análise e tomada de decisão em campo, servindo apenas como referência.
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleAcceptTerms}>
              <Text style={styles.buttonText}>Concordo e Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "bold", textAlign: "center", color: "#000" },
  notice: { fontSize: 14, color: "#333", marginBottom: 15, textAlign: "center" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    backgroundColor: colors.greenDark,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center", color: "#000" },
  modalText: { fontSize: 16, lineHeight: 22, color: "#333" },
});
