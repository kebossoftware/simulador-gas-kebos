import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { colors } from 'global/colors';
const kebosLogo = require('../assets/kebosLogo.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'APP'>;

export default function AppScreen() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>

            <View style={styles.kebosContainer}>
                <Image source={kebosLogo} style={styles.logo} resizeMode="contain" />
            </View>

            <Text style={styles.title}>Simulador de Detecção de Gás</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('INICIAR')}>
                <Text style={styles.btnText}>INICIAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.greenDark,
        position: 'relative',
    },
    kebosContainer: {
        position: 'absolute',
        width: 450,
        height: 450,
        borderRadius: 225, // metade do tamanho pra ficar redondo
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        top: -150,
    },
    logo: {
        width: 300,
        height: 200,
        position: 'absolute',
        top: 200,
    },
    title: {
        fontSize: 38,
        marginBottom: 20,
        textAlign: 'center',
        color: colors.white,
    },
    button: {
        marginTop: 20,
        width: '90%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 80,
        position: 'absolute',
        bottom: 80,
    },
    btnText: {
        fontSize: 20,
        color: colors.greenDark,
        fontWeight: 'bold',
    },
});
