import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import SimpleButton from '../Buttons/SimpleButton';
import * as Constantes from '../../utils/Constantes'

const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, tallaProductoModal, idDetalleProductoModal, cantidad, setCantidad, existencias, precioProducto }) => {

    const ip = Constantes.IP;

    const cambiarCantidad = (operacion) => {
        if (operacion == -1 && cantidad > 1) {
            setCantidad(cantidad - 1);
        } else if (operacion == +1) {
            setCantidad(cantidad + 1);
        }
    }

    const handleAgregarDetalle = async () => {
        try {
            if (existencias == 0) {
                alert('El producto no se encuentra disponible');
            }
            else if (existencias < cantidad) {
                alert('Seleccione un máximo de ' + existencias + ' existencias.');
            } else {

                const response_start_order = await fetch(`${ip}/SeaSmart/api/services/public/pedido.php?action=startOrder`, {
                    method: 'GET'
                });

                const data_order = await response_start_order.json();

                if (data_order.status) {

                    const formData = new FormData();
                    formData.append('idDetalleProducto', idDetalleProductoModal);
                    formData.append('cantidadRequerida', cantidad);
                    formData.append('precioProducto', precioProducto);

                    const response_product_order = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=readCartWithDetail`, {
                        method: 'POST',
                        body: formData
                    });

                    const data_product_order = await response_product_order.json();

                    if (data_product_order.status) {
                        const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=addDetail`, {
                            method: 'POST',
                            body: formData
                        });

                        const data = await response.json();

                        console.log("data despues del response", data);

                        if (data.status) {
                            Alert.alert('Producto agregado al carrito');
                            cerrarModal(false);
                        } else {
                            Alert.alert('Error', data.error);
                        }
                    } else {
                        Alert.alert('Error', data_product_order.error);
                    }
                } else {
                    Alert.alert('Error', data_order.error);
                }
            }
        } catch (error) {
            console.log(error);
            Alert.alert(toString(error), 'Ocurrió un error al crear detalle');
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                cerrarModal(!visible);
            }}
        >
            <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={() => cerrarModal(!visible)}>
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <Text style={styles.modalText}>{nombreProductoModal}</Text>
                    <Text style={styles.modalText}>Talla: {tallaProductoModal}</Text>
                    <View style={styles.containerCantidad}>
                        <Text style={styles.modalText}>Cantidad:</Text>
                        <View style={styles.containerCantidad}>
                            <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                                <Image source={require('../../../assets/minus.png')} style={styles.image} />
                            </TouchableOpacity>
                            <Text style={styles.textoCantidad}>{cantidad}</Text>
                            <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                                <Image source={require('../../../assets/plus.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <SimpleButton
                        textoBoton='Agregar al carrito'
                        accionBoton={() => handleAgregarDetalle()} />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

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
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: 200,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
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
    textoCantidad: {
        fontSize: 20
    }
});

export default ModalCompra;
