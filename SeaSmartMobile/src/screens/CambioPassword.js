import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/Constantes';

export default function CambiarContrasena({ route, navigation }) {
    const { correo } = route.params; // Recibimos el correo desde la pantalla anterior
    const [codigo, setCodigo] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    const handleChangePassword = async () => {
        if (nuevaPassword !== confirmarPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo', correo);
            formData.append('codigo', codigo);
            formData.append('nuevaPassword', nuevaPassword);

            const response = await fetch(`${Constantes.IP}/SeaSmart/api/services/public/clientes.php?action=changePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('Éxito', 'Tu contraseña ha sido actualizada exitosamente.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error || 'No se pudo actualizar la contraseña.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al intentar cambiar la contraseña.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Cambiar Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa el código de recuperación"
                    value={codigo}
                    onChangeText={setCodigo}
                    keyboardType="numeric"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nueva contraseña"
                    value={nuevaPassword}
                    onChangeText={setNuevaPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirma tu nueva contraseña"
                    value={confirmarPassword}
                    onChangeText={setConfirmarPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <Button title="Actualizar Contraseña" onPress={handleChangePassword} />
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