import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView, Image, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../../utils/Constantes';
import Buttons from '../Buttons/Buttons';
import RNPickerSelect from 'react-native-picker-select';

const ModalSeleccionarDireccion = ({ setModalVisible, modalVisible, finalizarPedido, dataDirecciones, setDireccion, direccion }) => {

    // Se declara el objeto con las opciones de placeholder del RNPickerSelect de direcciones.
    const placeholder = {
        label: 'Seleccione una dirección',
        value: null,
        color: '#000'
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableOpacity activeOpacity={1} style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Seleccione una dirección</Text>
                    <RNPickerSelect
                    placeholder={placeholder}
                    onValueChange={(value)=>setDireccion(value)}
                    items={dataDirecciones.map( (item) => { return {value: item.direccion, label: item.direccion, key: item.direccion} })}
                    />
                    <Buttons textoBoton={'Finalizar pedido'} accionBoton={() => finalizarPedido(direccion)}></Buttons>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalSeleccionarDireccion;

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
});