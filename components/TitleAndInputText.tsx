import { colors } from "global/colors";
import { Text, StyleSheet, TextInput, View } from "react-native";

interface props {
  title: string;
  onChangeText?: (text: string) => void;
  value?: string | null;
}

export const TitleAndInputText = ({ title, onChangeText, value }: props) => {
  const handleTextChange = (text: string) => {
    const cleaned = text.replace(',', '.'); // Substitui vírgula por ponto
    if (onChangeText) onChangeText(cleaned);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={value || ""}
        onChangeText={onChangeText} // passa direto, não troca vírgula por ponto aqui
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    height: 50,
  },
});
