import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, TextInput, FlatList, Dimensions } from 'react-native';
import * as Constantes from '../utils/Constantes';
import fetchData from '../components/utils/fetchData';

const BASE_URL_IMG = "http://192.168.0.9/SeaSmart/api/images/categorias/";

export default function Inicio({ navigation }) {
  // Estados para manejar nombre del usuario, categorías, texto de búsqueda y categorías filtradas
  const [nombre, setNombre] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const ip = Constantes.IP;

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  // Función para obtener los datos del usuario
  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.username);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', toString(error));
    }
  };

  // Función para obtener las categorías desde la API
  const fetchCategories = async () => {
    try {
      const response = await fetchData('categorias', 'readAll');
      console.log('Categorías obtenidas:', response);

      if (response.status === 1 && Array.isArray(response.dataset)) {
        // Filtra las categorías únicas por id_categoria
        const uniqueCategories = response.dataset.filter((item, index, self) =>
          index === self.findIndex((t) => t.id_categoria === item.id_categoria)
        );
        setCategories(uniqueCategories);
        setFilteredCategories(uniqueCategories);
      } else {
        Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
    }
  };

  // Función para manejar la búsqueda de categorías
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = categories.filter((category) =>
      category.nombre_categoria.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  // Hook para ejecutar fetchCategories al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Función para renderizar cada ítem en la lista de categorías
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.nombre_categoria}</Text>
        <Image 
          source={item.imagen_categoria ? { uri: `${BASE_URL_IMG}${item.imagen_categoria}` } : `${BASE_URL_IMG}${item.imagen_categoria}`} 
          style={styles.cardImage} 
          onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
        />
        <Text style={styles.cardDescription}>{item.descripcion_categoria}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Productos', { idCategoria: item.id_categoria })}>
          <Text style={styles.buttonText}>Ver productos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Componente principal de renderizado
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar una categoría" 
          value={searchText} 
          onChangeText={handleSearch}
        />
      </View>
      <Text style={styles.categoryText}>Categorías</Text>
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_categoria.toString()}
        contentContainerStyle={styles.categoryContainer}
      />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9; // Ancho constante de la tarjeta

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
    marginTop: 20, // Ajuste para mostrar la barra de búsqueda más abajo
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  categoryContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  card: {
    width: '100%', // Ancho constante
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido de las tarjetas
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%', // Ajusta el ancho de la imagen al ancho de la tarjeta
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain', // Ajusta la imagen dentro de la tarjeta sin distorsionar
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5dade2',
    padding: 10,
    borderRadius: 5,
    width: '80%', // Asegura que todos los botones tengan el mismo ancho
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
