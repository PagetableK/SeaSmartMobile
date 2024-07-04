import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import Buttons from '../Buttons/Buttons';
import * as Constantes from '../../utils/Constantes';

const ModalDirecciones = ({ setModalVisible, modalVisible, idDireccion, direccion, setDireccion, getDirecciones, direccionVieja }) => {

    const ip = Constantes.IP;

    const handleUpdateDireccion = async () => {
        try {
            if (validarDireccion()) {
            } else if(direccion.trim() == direccionVieja){
                setModalVisible(!modalVisible);
            } else {
                const formData = new FormData();
                formData.append('idDireccion', idDireccion);
                formData.append('inputDireccion', direccion);

                const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=updateRow`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.status) {
                    Alert.alert('Dirección actualizada correctamente');
                    getDirecciones();
                } else {
                    Alert.alert('Ocurrió un error al actualizar la dirección', data.error);
                }
                setModalVisible(false);
            }
        } catch (error) {
            Alert.alert("Sucedió un error al editar la dirección", JSON.stringify(error));
            setModalVisible(false);
        }
    };

    const handleAddDireccion = async () => {
        try {
            if (validarDireccion()) {
            }
            else {
                const formData = new FormData();
                formData.append('inputDireccion', direccion);

                const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=createRow`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.status) {
                    Alert.alert('Dirección agregada correctamente');
                    getDirecciones();
                } else {
                    Alert.alert('Ocurrió un error al agregar la dirección', data.error);
                }
                setModalVisible(false);
            }
        } catch (error) {
            Alert.alert("Sucedió un error al agregar la dirección", JSON.stringify(error));
            setModalVisible(false);
        }
    }

    function validarDireccion() {
        if (direccion.trim() == "") {
            Alert.alert('La dirección no es válida', 'Asegúrese de agregar una dirección');
            return true;
        } else if (direccion.length < 10 || direccion.length > 100) {
            Alert.alert('La dirección no es válida', 'La longitud de la dirección debe ser de mínimo 10 caracteres y máximo 100');
            return true;
        } else {
            return false;
        }
    }

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <TextInput
                        style={styles.input}
                        label="Ingrese su dirección aquí"
                        value={direccion}
                        onChangeText={setDireccion}
                        mode='outlined'
                        outlineColor='white'
                        theme={{
                            colors: {
                                primary: '#4593EE'
                            },
                        }}>
                    </TextInput>
                    {idDireccion == null ? (
                        <Buttons textoBoton={'Agregar dirección'} accionBoton={handleAddDireccion}>
                        </Buttons>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleUpdateDireccion}>
                            <Text style={styles.buttonText}>Actualizar dirección</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalDirecciones;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: Dimensions.get('window').width / 1.2,
    },
    button: {
        borderWidth: 1,
        borderColor: "#5CB85C",
        width: 300,
        borderRadius: 20,
        backgroundColor: "#5CB85C",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF", fontWeight: '500', textTransform: 'uppercase'
    },
    containerCantidad: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20
    },
    image: {
        height: 40,
        width: 40
    },
});
