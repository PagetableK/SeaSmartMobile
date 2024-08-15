import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import SimpleButton from '../Buttons/SimpleButton';
import * as Constantes from '../../utils/Constantes'
import RNPickerSelect from 'react-native-picker-select';

const ModalCompra = ({ visible, cerrarModal, data, cantidad, setCantidad }) => {

    const ip = Constantes.IP;
    const [color, setColor] = useState(0);

    const cambiarCantidad = (operacion) => {
        if (operacion == -1 && cantidad > 1) {
            setCantidad(cantidad - 1);
        } else if (operacion == +1) {
            setCantidad(cantidad + 1);
        }
    }

    const handleAgregarDetalle = async () => {
        // Se inicializa la variable dónde se almacenará la existencia de un detalle de producto.
        var existencias = 0;
        // Se configura el valor de la constante.
        switch (true) {
            case data[2] && data[3]:
                break;
            case !data[2] && data[3]:
                break;
            case data[2] && !data[3]:
                existencias = data[1].existencia_producto;
                break;
            case !data[2] && !data[3]:
                existencias = data[1].existencia_producto;
                break;
        }

        const precioProducto = data[0].precio_producto;

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
                    formData.append('idDetalleProducto', data[1].id_detalle_producto);
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

                        if (data.status) {
                            Alert.alert('Producto agregado al carrito');
                            cerrarModal(false);
                        } else {
                            Alert.alert('Error', data.error);
                        }
                    } else if (data_product_order.error == "El detalle del producto ya ha sido agregado al carrito") {
                        Alert.alert('No se puede agregar el producto al carrito', 'El producto ya ha sido agregado al carrito');
                    }
                    else {
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

    // La función useEffect se ejecuta cada vez que se carga la pantalla.
    useEffect(() => {
    }, []);

    return (
        <>
            {
                data[2] && data[3] ?
                    <Modal
                        visible={visible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => {
                            cerrarModal(!visible);
                        }}
                    >

                    </Modal>
                    : data[2] && !data[3] ?
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
                                    <Text style={styles.modalText}>{data[0].nombre_producto}</Text>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Seleccione un color',
                                            value: null,
                                            color: '#000'
                                        }}
                                        onValueChange={(value) => setColor(value)}
                                        items={data[1].filter((row) => { return row.color_producto }).map((item) => { return { value: item.id_producto_color, label: item.color_producto, key: item.color_producto } })}
                                    />
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
                                        accionBoton={() => handleAgregarDetalle()}
                                        anchoBoton={'100'}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                        : !data[2] && data[3] ?
                            <Modal
                                visible={visible}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={() => {
                                    cerrarModal(!visible);
                                }}
                            >

                            </Modal>
                            :
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
                                        <Text style={styles.modalText}>{data[0].nombre_producto}</Text>
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
                                            accionBoton={() => handleAgregarDetalle()}
                                            anchoBoton={'100'}
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Modal>
            }
        </>
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
        width: '90%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 10
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
