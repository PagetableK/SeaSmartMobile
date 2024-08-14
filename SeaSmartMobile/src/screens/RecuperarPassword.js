import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/Constantes';

export default function RecuperarPassword({ navigation }) {
    const ip = Constantes.IP;
    const [correo, setCorreo] = useState('');

    const handleRecoverPassword = async () => {
        try {
            const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=recoverPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo }),
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('Correo enviado', 'Se ha enviado un enlace para recuperar tu contraseña a tu correo electrónico.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error || 'No se pudo enviar el correo.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al intentar recuperar la contraseña.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Recuperar Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu correo electrónico"
                    value={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Button title="Enviar correo de recuperación" onPress={handleRecoverPassword} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5F4',
        paddingTop: Constants.statusBarHeight + 5,
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    texto: {
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
});