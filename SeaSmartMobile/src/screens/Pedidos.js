import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
// import Buttons from '../components/Buttons/Buttons';
import * as Constantes from '../utils/Constantes';

export default function Pedidos({ navigation }) {


  const ip = Constantes.IP;

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width, marginLeft: Dimensions.get('window').width / 10, marginTop: Dimensions.get('window').height / 30 }}>
        {/* Título de la pantalla */}
        <Text style={styles.title}>Pedidos</Text>
        <View style={{ flex: 0.6 }}>
          <TouchableOpacity style={{ backgroundColor: 'green', height: 50, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', borderRadius: 20, flexDirection: 'row', gap: 10, padding: 10 }}
            onPress={() => { navigation.navigate('Direcciones') }}>
            <Image source={require('../../assets/direccion_casa.png')} />
            <Text style={{ fontWeight: '900', color: 'white' }}>Gestionar direcciones</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: Dimensions.get('window').width / 1.1,
        }}
      />

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
    textAlign: 'flex',
    color: '#000',
    flex: 0.3
  },
});