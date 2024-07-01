// MaskedInputTelefono.js
import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputTelefono({ telefono, setTelefono, placeholder }) {
    const handleTelefonoChange = (text) => {
        if (placeholder === "Teléfono fijo" && text.length === 1 && text !== '2') {
            return;
        }
        if (placeholder === "Teléfono móvil" && text.length === 1 && text !== '7') {
            return;
        }
        setTelefono(text);
    };

    return (
        <TextInputMask
            style={styles.Input}
            placeholder={placeholder}
            placeholderTextColor="#090A0A"
            type={'custom'}
            options={{
                mask: '9999-9999' // Formato para el número de teléfono
            }}
            value={telefono}
            onChangeText={handleTelefonoChange}
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#FFF',
        color: "#090A0A",
        fontWeight: '800',
        width: 300,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    },
});
