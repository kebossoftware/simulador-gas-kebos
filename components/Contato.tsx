import { Linking, Text, View, TouchableOpacity } from "react-native";

export default function Contato() {
    return (
        <View style={{ alignItems: "center" }}>
            {/* Site KEBOS */}
            <TouchableOpacity
                onPress={() => Linking.openURL("https://kebos.com.br/")}
                style={{ alignItems: "center", marginBottom: 10 }}
            >
                <Text style={{ color: "black", textDecorationLine: "none", textAlign: "center" }}>
                    🌐 Kebos-Especialistas em Detecção de Gases em Espaço Confinado
                </Text>
            </TouchableOpacity>


            {/* Endereço → abre Google Maps */}
            <TouchableOpacity
                onPress={() =>
                    Linking.openURL(
                        "https://www.google.com/maps/search/?api=1&query=Rua+da+Várzea+Paulista,+873,+Jundiaí+SP"
                    )
                }
                style={{ alignItems: "center", marginBottom: 10 }}
            >
                <Text style={{ color: "black", textDecorationLine: "none" }}>
                    📍 Kebos Detectores de Gás – Jundiaí/SP
                </Text>
                <Text style={{ color: "black", textDecorationLine: "none" }}>
                    Rua da Várzea Paulista, 873 – Subsolo – Prédio Kebos
                </Text>
            </TouchableOpacity>

            {/* Email comercial */}
            <TouchableOpacity
                onPress={() => Linking.openURL("mailto:comercial@kebos.com.br")}
                style={{ alignItems: "center", marginBottom: 10 }}
            >
                <Text style={{ color: "black", textDecorationLine: "none" }}>
                    📧 comercial@kebos.com.br
                </Text>
            </TouchableOpacity>

            {/* Telefone */}
            <TouchableOpacity
                onPress={() => Linking.openURL("tel:1145820207")}
                style={{ alignItems: "center", marginBottom: 10 }}
            >
                <Text style={{ color: "black", textDecorationLine: "none" }}>
                    📞 (11) 4582-0207
                </Text>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity
                onPress={() => Linking.openURL("https://wa.me/5511991918014")}
                style={{ alignItems: "center", marginBottom: 10 }}
            >
                <Text style={{ color: "black", textDecorationLine: "none" }}>
                    📱 Nascimento: (11) 9 9191-8014
                </Text>
            </TouchableOpacity>

            {/* Email Nascimento */}
            <TouchableOpacity
                onPress={() => Linking.openURL("mailto:nascimento@kebos.com.br")}
                style={{ alignItems: "center" }}
            >
                <Text style={{ color: "black", textDecorationLine: "none" }}>
                    📧 nascimento@kebos.com.br
                </Text>
            </TouchableOpacity>
        </View>
    );
}
