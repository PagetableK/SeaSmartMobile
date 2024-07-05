// Registro.js
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'; // Importar módulos de React Native
import { useState } from 'react'; // Importar useState para gestionar el estado en el componente
import * as Constantes from '../utils/Constantes'; // Importar constantes
import Constants from 'expo-constants'; // Importar constantes de Expo
// Importar componentes personalizados
import Input from '../components/Inputs/Input';
import InputEmail from '../components/Inputs/InputEmail';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import Buttons from '../components/Buttons/Buttons';

export default function SignUp({ navigation }) { // Componente principal para el registro de usuario
    const ip = Constantes.IP;

    // Estados locales para almacenar los valores de los inputs
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDui] = useState('');
    const [telefono_fijo, setTelefono_Fijo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contra, setContra] = useState('');
    const [confirmarContra, setConfirmarContra] = useState('');

    // Función para manejar el envío del formulario de registro
    const handleCreate = async () => {
        try {
            // Crear un FormData y agregar los datos del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('duiCliente', dui);
            formData.append('telefonoFijo', telefono_fijo); // nombre cambiado para coincidir con el PHP
            formData.append('telefonoMovil', telefono); // nombre cambiado para coincidir con el PHP
            formData.append('claveCliente', contra);
            formData.append('confirmarClave', confirmarContra);

            // Hacer la petición POST al servidor
            const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=signUp`, {
                method: 'POST',
                body: formData
            });

             // Parsear la respuesta como JSON
            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente'); // Mostrar alerta de éxito
                navigation.navigate('Login'); // Navegar a la pantalla de login
            } else {
                Alert.alert('Error', data.error); // Mostrar alerta de error
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario'); // Mostrar alerta de error en caso de excepción
        }
    };

    return (
        <View style={styles.container}> {/* Contenedor principal */}
            <ScrollView contentContainerStyle={styles.scrollViewStyle}> {/* Habilitar scroll */}
                <Text style={styles.texto}>Registrar Usuario</Text> {/* Título */}
                {/* Inputs para capturar datos del usuario */}
                <Input placeHolder='Nombre Cliente' setValor={nombre} setTextChange={setNombre} />
                <Input placeHolder='Apellido Cliente' setValor={apellido} setTextChange={setApellido} />
                <InputEmail placeHolder='Email Cliente' setValor={correo} setTextChange={setCorreo} />
                <MaskedInputDui dui={dui} setDui={setDui} />
                <MaskedInputTelefono telefono={telefono_fijo} placeholder="Teléfono fijo" setTelefono={setTelefono_Fijo} />
                <MaskedInputTelefono telefono={telefono} placeholder="Teléfono móvil" setTelefono={setTelefono} />
                <Input placeHolder='Contraseña' contra={true} setValor={contra} setTextChange={setContra} />
                <Input placeHolder='Confirmar contraseña' contra={true} setValor={confirmarContra} setTextChange={setConfirmarContra} />
                <Buttons textoBoton='Registrar Usuario' accionBoton={handleCreate} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Estilo del contenedor principal
        flex: 1,
        backgroundColor: '#F7F5F4',
        paddingTop: Constants.statusBarHeight + 5,
    },
    scrollViewStyle: { // Estilo del contenedor del ScrollView
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: { // Estilo del texto de título
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20
    },
    textRegistrar: { // Estilo del texto de registrar
        color: '#322C2B',
        fontWeight: '700',
        fontSize: 15
    },
    fecha: { // Estilo de la fecha
        fontWeight: '600',
        color: '#FFF'
    },
    fechaSeleccionar: { // Estilo de la fecha seleccionable
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: '#A79277',
        color: "#fff",
        fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    }
});
