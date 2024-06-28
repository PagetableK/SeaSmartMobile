import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({ dui, setDui }) {
    return (
        <TextInputMask
            style={styles.Input}
            placeholder="Dui"
            placeholderTextColor="#090A0A"
            type={'custom'}
            options={{
                mask: '99999999-9' // Formato para el número de teléfono
            }}
            value={dui}
            onChangeText={setDui}
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