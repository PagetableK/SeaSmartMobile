import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView, Image } from 'react-native';
import { TextInput, Button, Modal } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/Constantes';
import Buttons from '../components/Buttons/Buttons';
import DireccionCard from '../components/Cards/DireccionCard';
import ModalDirecciones from '../components/Modales/ModalDirecciones';

export default function Direcciones({ navigation }) {

    const ip = Constantes.IP;

    const [dataDirecciones, setDataDirecciones] = useState([]);
    const [idDireccion, setIdDireccion] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [direccionVieja, setDireccionVieja] = useState(null);

    useEffect(() => {
        getDirecciones();
    }, []);

    const getDirecciones = async () => {
        try {
            const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();

            console.log(data, "Data desde getDirecciones")

            if (data.status) {
                setDataDirecciones(data.dataset);
            } else {
                console.log("No hay direcciones disponibles")
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al cargar las direcciones');
        }
    }

    // Función para manejar la modificación de una dirección
    const handleEditarDireccion = (idDireccion, direccion) => {
        setModalVisible(true);
        setIdDireccion(idDireccion);
        setDireccion(direccion);
        setDireccionVieja(direccion);
    };


    // Función para manejar la acción de agregar de una dirección
    const handleAgregarDireccion = () => {
        setModalVisible(true);
        setIdDireccion(null);
        setDireccion('');
    }

    const renderItem = ({ item }) => (
        <DireccionCard
            item={item}
            accionBoton={() => handleEditarDireccion(item.id_direccion, item.direccion)}
            updateDataDireccion={setDataDirecciones} // Nueva prop para actualizar la lista
        />
    );

    return (
        <View style={styles.container}>

            <ModalDirecciones
                direccion={direccion}
                getDirecciones={getDirecciones}
                idDireccion={idDireccion}
                modalVisible={modalVisible}
                setDireccion={setDireccion}
                setModalVisible={setModalVisible}
                direccionVieja={direccionVieja}
            />

            {/* Título de la pantalla */}
            <Text style={styles.title}>Direcciones</Text>

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    width: Dimensions.get('window').width / 1.1,
                }}
            />
            {/* Lista de direcciones */}
            {dataDirecciones.length > 0 ? (
                <FlatList
                    data={dataDirecciones}
                    renderItem={renderItem}
                    style={{ width: Dimensions.get('window').width / 1.1, flex: 2 }}
                    keyExtractor={(item) => item.id_direccion.toString()}
                />
            ) : (
                <View style={{ display: 'flex', alignItems: 'center', gap: 100, flex: 1.7 }}>
                    <Text style={styles.titleAddress}>No se han agregado direcciones.</Text>
                    <Image source={require('../../assets/direccion_pregunta.png')} style={{ width: 200, height: 200 }} />
                </View>
            )}
            {/* Botón de finalizar pedido */}
            <View style={{}}>
                <Buttons
                    textoBoton='Agregar dirección'
                    accionBoton={handleAgregarDireccion}
                />
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        width: Dimensions.get('window').width,
        marginLeft: Dimensions.get('window').width / 10,
        marginTop: Dimensions.get('window').height / 30,
        flex: 0.1,
        color: '#000', // Brown color for the title
    },
    titleAddress: {
        marginTop: 20,
        fontSize: 17,
    }
});