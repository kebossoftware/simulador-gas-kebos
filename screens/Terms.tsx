import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colors = {
    greenDark: "#325744",
    lightBg: "#ffffff",
    textLight: "#1a1a1a",
};

export default function TermsScreen({ navigation }: { navigation: NavigationProp<any> }) {

    const handleAccept = async () => {
        await AsyncStorage.setItem("userLogged", "true");

        return navigation.reset({
            index: 0,
            routes: [{ name: "APP" }],
        });
    };

    const handleDecline = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.lightBg }]}>

            {/* LOGO */}
            <Image
                source={require("../assets/kebosLogo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Termos de Uso</Text>
            <Text style={styles.subtitle}>
                Leia atentamente antes de utilizar o aplicativo
            </Text>

            <ScrollView style={styles.box}>
                <Text style={styles.text}>
                    Bem-vindo ao nosso aplicativo. Ao utilizar os nossos serviços, você
                    concorda com os seguintes termos e condições:

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>1. Coleta de Dados Pessoais</Text>
                    {"\n"}
                    Nosso software coleta informações fornecidas pelos usuários, como nome,
                    e-mail, telefone e dados de uso do aplicativo. Esses dados podem ser
                    utilizados para fins de marketing, comunicação, melhorias no sistema e
                    envio de novidades referentes ao aplicativo.

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>2. Dados dos Detectores de Gás</Text>
                    {"\n"}
                    O aplicativo recebe e exibe dados provenientes de detectores de gás
                    reais. O sistema **não interpreta, não altera e não calcula riscos
                    químicos**. Ele apenas **exibe os valores enviados pelos sensores e
                    apresenta alertas simples** para facilitar a visualização pelo usuário.

                    Os alertas exibidos são informativos e representam apenas a condição
                    reportada pelos próprios equipamentos.

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>3. Precisão das Informações</Text>
                    {"\n"}
                    As informações apresentadas dependem exclusivamente dos detectores de gás
                    utilizados pelo usuário. O aplicativo **não garante precisão,
                    integridade ou tempo real** dos dados emitidos pelos sensores. O usuário
                    reconhece que o aplicativo é uma ferramenta auxiliar e **não substitui
                    instrumentos profissionais**, inspeções técnicas ou especialistas
                    qualificados.

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>4. Uso Permitido</Text>
                    {"\n"}
                    O usuário concorda em utilizar o aplicativo apenas para fins legais,
                    em conformidade com normas de segurança e boas práticas no uso de
                    detectores de gás industriais.

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>5. Compartilhamento de Informações</Text>
                    {"\n"}
                    Podemos compartilhar dados anonimizados para fins estatísticos e de
                    melhoria do sistema. Informações pessoais só serão compartilhadas com
                    autorização do usuário ou quando exigido por lei.

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>6. Direitos do Usuário</Text>
                    {"\n"}
                    O usuário pode solicitar a exclusão, revisão ou correção de seus dados
                    pessoais conforme a legislação vigente (LGPD).

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>7. Alterações nos Termos</Text>
                    {"\n"}
                    Reservamo-nos o direito de alterar estes termos a qualquer momento,
                    mediante aviso dentro do próprio aplicativo.

                    {"\n\n"}
                    <Text style={styles.sectionTitle}>8. Aceitação</Text>
                    {"\n"}
                    Ao prosseguir, o usuário declara que leu, compreendeu e concorda com todos
                    os itens descritos acima.
                </Text>
            </ScrollView>

            {/* BOTÕES */}
            <View style={styles.buttonsRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#777" }]}
                    onPress={handleDecline}
                >
                    <Text style={styles.buttonText}>Recusar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.greenDark }]}
                    onPress={handleAccept}
                >
                    <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        paddingTop: 60,
    },

    logo: {
        width: 120,
        height: 120,
        alignSelf: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        color: "#1a1a1a",
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        color: "#444",
    },

    box: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 18,
        marginBottom: 20,
        maxHeight: "60%",
    },

    text: {
        fontSize: 14,
        lineHeight: 22,
        color: "#1a1a1a",
    },

    sectionTitle: {
        fontWeight: "700",
        fontSize: 15,
        marginTop: 12,
        color: "#1a1a1a",
    },

    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    button: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
