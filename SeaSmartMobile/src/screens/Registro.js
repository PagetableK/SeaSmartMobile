
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/Constantes'
import Constants from 'expo-constants';
//Import de componentes
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Buttons';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';


export default function Registro({ navigation }) {
    const ip = Constantes.IP;

    const [show, setShow] = useState(false);

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [dui, setDui] = useState('')
    const [telefono, setTelefono] = useState('')
    const [telefonoMovil, setTelefonoMovil] = useState('')
    const [clave, setClave] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    /*
        Fin Codigo para mostrar el datetimepicker
        */

    //props que recibe input
    //placeHolder, setValor, contra, setTextChange

    const handleCreate = async () => {
        try {

            // Validar los campos
            if (!nombre.trim() || !apellido.trim() || !email.trim() ||
                !dui.trim() || !telefonoMovil.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } else if (!duiRegex.test(dui)) {
                Alert.alert("El DUI debe tener el formato correcto (########-#)");
                return;
            } else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            } else if (!telefonoRegex.test(telefonoMovil)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            }

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('duiCliente', dui);
            formData.append('telefonoCliente', telefono);
            formData.append('telefonoMovilCliente', telefonoMovil);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=signUp`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Registrar Usuario</Text>
                <Input
                    placeHolder='Nombre Cliente'
                    setValor={nombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder='Apellido Cliente'
                    setValor={apellido}
                    setTextChange={setApellido}
                />
                <InputEmail
                    placeHolder='Email Cliente'
                    setValor={email}
                    setTextChange={setEmail} />
                <MaskedInputDui
                    dui={dui}
                    setDui={setDui} />

                <MaskedInputTelefono
                    telefono={telefono}
                    placeholder={"Teléfono"}
                    setTelefono={setTelefono} />

                <MaskedInputTelefono
                    telefonoMovil={telefonoMovil}
                    placeholder={"Teléfono móvil"}
                    setTelefono={setTelefonoMovil} />
                <Input
                    placeHolder='Clave'
                    contra={true}
                    setValor={clave}
                    setTextChange={setClave} />
                <Input
                    placeHolder='Confirmar Clave'
                    contra={true}
                    setValor={confirmarClave}
                    setTextChange={setConfirmarClave} />

                <Buttons
                    textoBoton='Registrar Usuario'
                    accionBoton={handleCreate}
                />

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5F4',
        paddingTop: Constants.statusBarHeight + 5, // el 5 es para darle un pequeño margen cuando hay una camara en el centro de la pantalla
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#322C2B', fontWeight: '900',
        fontSize: 20
    },
    textRegistrar: {
        color: '#322C2B', fontWeight: '700',
        fontSize: 15
    },

    fecha: {
        fontWeight: '600',
        color: '#FFF'
    },
    fechaSeleccionar: {
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: '#A79277',
        color: "#fff", fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    }
});

