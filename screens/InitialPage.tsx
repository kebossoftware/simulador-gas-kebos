import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { colors } from '../global/colors';
import { TitleAndInputText } from 'components/TitleAndInputText';
import { useState } from 'react';
import Carousel from 'components/Carousel';
import { Footer } from 'components/Footer';
import IconDanger from '../assets/icons/danger-dead-svgrepo-com.svg';
import IconLife from '../assets/icons/heart-svgrepo-com.svg';

interface OutputRange {
  value: {
    min?: number;
    max?: number;
  };
  risc: string;
  message: string;
}

interface Gas {
  gas: string;
  label: string;
  value: string | null;
  outputs: OutputRange[];
}

export default function InitialPage() {
  const [gases, setGases] = useState<Gas[]>([
    {
      gas: 'O2',
      label: '• Oxigênio (O2 - Vol/%)',
      value: null,
      outputs: [
        {
          value: { min: 23.5 },
          risc: "red",
          message:
            "Atmosfera rica com excesso de oxigênio, combinado com uma substância combustível pode causar uma explosão ou incêndio, causar danos ao pulmão, fazendo com que suas estruturas murchem, dificultando a troca gasosa pelo sangue até a perda da função do órgão."
        },
        {
          value: { min: 20.9, max: 23.5 },
          risc: "green",
          message: "Normal"
        },
        {
          value: { min: 19.5, max: 20.9 },
          risc: "green",
          message: "Efeitos fisiológicos adversos, mas não são percebidos."
        },
        {
          value: { min: 16, max: 19.5 },
          risc: "red",
          message:
            "Aumento da pulsação e da frequência respiratória. Diminuição da atenção, do raciocínio e da coordenação."
        },
        {
          value: { min: 14, max: 16 },
          risc: "red",
          message:
            "Fadiga anormal com qualquer esforço. Perturbação emocional. Falta de coordenação. Incapacidade de julgamento."
        },
        {
          value: { min: 12.5, max: 14 },
          risc: "red",
          message:
            "Capacidade de julgamento e coordenação motora reduzidas. Respiração prejudicada, com danos permanentes ao coração. Náusea e vômito"
        },
        {
          value: { min: 10, max: 12.5 },
          risc: "red",
          message:
            "Capacidade de julgamento e coordenação motora reduzidas. Respiração prejudicada, com danos permanentes ao coração. Náusea e vômito"
        },
        {
          value: { max: 10 },
          risc: "red",
          message:
            "Incapacidade de executar movimentos vigorosos. Perda de consciência. Convulsão e morte."
        }
      ]
    },
    {
      gas: 'CH4',
      label: '• Gás Metano (CH4 - %/LEL)',
      value: null,
      outputs: [
        {
          value: { min: 20 },
          risc: "red",
          message: "Alarme Alto - Risco Explosão e incêndio, morte."
        },
        {
          value: { min: 10, max: 20 },
          risc: "red",
          message: "Alarme Baixo - Risco Explosão e incêndio, morte."
        },
        {
          value: { min: 0.1, max: 10 },
          risc: "red",
          message: "Risco Explosão e incêndio, morte."
        },
        {
          value: { max: 0.1 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
    {
      gas: 'CO',
      label: '• Monóxido de Carbono (CO - ppm)',
      value: null,
      outputs: [
        {
          value: { min: 70 },
          risc: "red",
          message:
            "Alarme Alto - A intoxicação por monóxido de carbono causa sintomas agudos como cefaleia, náuseas, angina, fraqueza, dispneia, perda da consciência, convulsões, coma e morte por asfixia"
        },
        {
          value: { min: 35, max: 70 },
          risc: "red",
          message:
            "Alarme Baixo - A intoxicação por monóxido de carbono causa sintomas agudos como cefaleia, náuseas, angina, fraqueza, dispneia, perda da consciência, convulsões, coma e morte por asfixia"
        },
        {
          value: { min: 0.1, max: 35 },
          risc: "red",
          message:
            "A intoxicação por monóxido de carbono causa sintomas agudos como cefaleia, náuseas, angina, fraqueza, dispneia, perda da consciência, convulsões, coma e morte por asfixia"
        },
        {
          value: { max: 0.1 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
    {
      gas: 'H2S',
      label: '• Sulfeto de Hidrogênio (H2S - ppm)',
      value: null,
      outputs: [
        {
          value: { min: 20 },
          risc: "red",
          message:
            "Alarme Alto - Primeiramente, podem acontecer irritações nos olhos, no nariz ou na garganta. Os problemas atingem ainda o sistema respiratório, causando perdas de memória, dores de cabeça e até comprometimento da função motora, pelo fato de o gás atingir o sistema nervoso central provocando a morte"
        },
        {
          value: { min: 10, max: 20 },
          risc: "red",
          message:
            "Alarme Baixo - Primeiramente, podem acontecer irritações nos olhos, no nariz ou na garganta. Os problemas atingem ainda o sistema respiratório, causando perdas de memória, dores de cabeça e até comprometimento da função motora, pelo fato de o gás atingir o sistema nervoso central provocando a morte"
        },
        {
          value: { min: 0.1, max: 10 },
          risc: "red",
          message:
            "Primeiramente, podem acontecer irritações nos olhos, no nariz ou na garganta. Os problemas atingem ainda o sistema respiratório, causando perdas de memória, dores de cabeça e até comprometimento da função motora, pelo fato de o gás atingir o sistema nervoso central provocando a morte"
        },
        {
          value: { max: 0.1 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
    {
      gas: 'NH3',
      label: '• Amônia (NH3 - ppm)',
      value: null,
      outputs: [
        {
          value: { min: 20 },
          risc: "red",
          message:
            "A intoxicação NH3 AMÔNIA pode causar pelas diferentes vias de exposição: Toxicidade aguda: A inalação pode causar queimaduras na mucosa nasal, faringe e laringe, tosse, dor no peito, espasmo brônquico com dificuldade respiratória e edema pulmonar. \n\n Efeitos locais: O hidróxido de amônio quando em contato com a pele pode produzir necrose dos tecidos e profundas queimaduras. Enquanto prolongado ou repetido pode causar dermatite. Em contato com os olhos causa lacrimejamento, conjuntivite, irritação e ulceração da córnea, resultando em cegueira temporária ou permanente. Toxicidade crônica: Pode ocorrer bronquite crônica na exposição inalatória e ao , atingir o sistema nervoso central levando a morte. "
        },
        {
          value: { min: 10, max: 20 },
          risc: "green",
          message:
            "A intoxicação NH3 AMÔNIA pode causar irritação nos olhos, nariz e garganta em algumas pessoas, e pode levar a dificuldade respiratória e “sensação de intoxicação”."
        },
        {
          value: { min: 0.1, max: 10 },
          risc: "green",
          message:
            "A intoxicação NH3 AMÔNIA pode causar irritação leve a moderada nos olhos, nariz e garganta, com sintomas como sensação de queimação, tosse e desconforto e “sensação de intoxicação”."
        },
        {
          value: { max: 0 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
    {
      gas: 'SO2',
      label: '• Dióxido de Enxofre (SO2 - ppm)',
      value: null,
      outputs: [
        {
          value: { min: 2 },
          risc: "red",
          message:
            "\n• Inalação: Causa irritação grave do nariz e da garganta, endema pulmonar. Sintomas podem incluir tosse, falta de ar, dificuldade para respirar e aperto no peito, podem facilmente irritar as vias aéreas como falta de ar, aperto no peito e chiado no peito. \n\n•	Contato com a pele: CORROSIVO. O gás irrita ou queima a pele. Cicatrizes permanentes podem ocorrer a pele pode ficar branca ou amarelada como cera. Em casos graves, podem ocorrer bolhas, morte do tecido e infecção.\n\n•	Contato com os olhos: CORROSIVO. O gás irrita ou queima os olhos. Danos permanentes, incluindo cegueira, podem ocorrer. O contato direto com o gás liquefeito pode congelar os olhos. Danos oculares permanentes ou cegueira podem ocorrer.\n\n•	Efeitos da exposição prolongada (crônica): Pode causar danos ao sistema respiratório. Pode irritar e inflamar as vias aéreas inalatória e ao , atingir o sistema nervoso central levando a morte."
        },
        {
          value: { max: 2 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
    {
      gas: 'CO2',
      label: '• Dióxido de Carbono (CO2 - ppm)',
      value: null,
      outputs: [
        {
          value: { min: 5000 },
          risc: "red",
          message:
            "\n• Inalação: Altas concentrações podem afetar a função respiratória e causar excitação seguida de depressão do sistema nervoso central, podendo deslocar o oxigênio do ar. Se houver menos oxigênio disponível para respirar, podem ocorrer sintomas como dor de cabeça, respiração rápida, frequência cardíaca acelerada, falta de jeito, distúrbios emocionais e fadiga. À medida que menos oxigênio se torna disponível, podem ocorrer náuseas e vômitos, colapso, convulsões, coma e morte. "
        },
        {
          value: { max: 5000 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
    {
      gas: 'VOC',
      label: '• Compostos Orgânicos Voláteis (VOC - ppm)',
      value: null,
      outputs: [
        {
          value: { min: 30 },
          risc: "red",
          message:
            "A exposição a VOCs, especialmente em altas concentrações como 30 ppm (partes por milhão), pode apresentar riscos à saúde, incluindo irritação nos olhos, nariz e garganta, dores de cabeça, tonturas, náuseas e, em casos mais graves, danos aos órgãos e ao , atingir o sistema nervoso central pode levar a morte"
        },
        {
          value: { max: 30 },
          risc: "green",
          message: "Normal"
        },
      ]
    },
  ]);


  const [results, setResults] = useState<{ message: string; risc: string }[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (index: number, text: string) => {
    const updatedGases = [...gases];
    updatedGases[index].value = text;
    setGases(updatedGases);
  };

  const calcResult = () => {
    const newResults = gases.map((gas) => {
      if (!gas.value) {
        return { message: `${gas.label} → Valor não informado`, risc: 'gray' };
      }

      const val = parseFloat(gas.value.replace(',', '.'));
      if (isNaN(val)) {
        return { message: `${gas.label} → Valor inválido`, risc: 'gray' };
      }

      for (const range of gas.outputs) {
        const min = range.value.min ?? Number.NEGATIVE_INFINITY;
        const max = range.value.max ?? Number.POSITIVE_INFINITY;

        if (val >= min && val <= max) {
          return { message: `${gas.label} → ${range.message}`, risc: range.risc };
        }
      }

      return { message: `${gas.label} → Fora das faixas conhecidas`, risc: 'gray' };
    });

    setResults(newResults);
    setShowResult(true);
  };


  return (
    <View style={styles.mainCOntainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Simulador de Detecção de Gás</Text>

        {gases.map((gas, index) => (
          <TitleAndInputText
            key={gas.gas}
            title={gas.label}
            value={gas.value?.toString() || ""}
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}

        <TouchableOpacity style={styles.btnCalc} onPress={calcResult}>
          <Text style={styles.btnText}>SIMULAR</Text>
        </TouchableOpacity>

        {showResult && results
          .filter(res => !res.message.includes("Valor não informado"))
          .map((res, i) => (
            <View
              key={i}
              style={[styles.resultContainer, { borderLeftColor: res.risc, flexDirection: 'row', alignItems: 'center' }]}
            >
              {res.risc === 'red' && (
                <IconDanger width={30} height={30} fill={res.risc} />
              )}

              {res.risc === 'green' && (
                <IconLife width={30} height={30} stroke={res.risc} />
              )}


              <Text style={styles.resultText}>{res.message}</Text>
            </View>
          ))}



        <Carousel />

      </ScrollView>
      <Footer />
    </View>

  );
}

const styles = StyleSheet.create({
  mainCOntainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',

    paddingBottom: 30,
  },
  resultContainer: {
    marginTop: 30,
    width: '90%',
    borderLeftWidth: 5,
    paddingLeft: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.greenDark,

    marginTop: 40
  },
  btnCalc: {
    marginTop: 30,
    width: '90%',
    backgroundColor: colors.greenDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
  },
  btnText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
  resultText: {
    width: '90%',
    fontSize: 14,
    color: '#333',
    padding: 10,
    borderRadius: 6,
  },
});
