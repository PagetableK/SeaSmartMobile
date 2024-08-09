// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
// import trajeHombre4 from '../img/trajeHombre4.png'; // 
// import trajeMujer13 from '../img/trajeMujer13.png'; // 

// import fetchData from '../components/utils/fetchData';

// export default function Productos(){
// const data = [
//     {
//         category: 'Shorts',
//         items: [
//             {
//                 title: 'Short básico',
//                 price: '$15',
//                 available: 'Disponible',
//                 image: trajeHombre4, // imagen importada
//             },
//             {
//                 title: 'Lycra básica',
//                 price: '$20',
//                 available: 'Disponible',
//                 image: trajeHombre4, //  imagen importada
//             },
//             {
//                 title: 'Jammer básico',
//                 price: '$30',
//                 available: 'No disponible',
//                 image: trajeHombre4, //  imagen importada
//             },
//         ],
//     },
//     {
//         category: 'Lycra',
//         items: [
//             {
//                 title: 'Short básico',
//                 price: '$15',
//                 available: 'Disponible',
//                 image: trajeHombre4, // imagen importada
//             },
//             {
//                 title: 'Lycra básica',
//                 price: '$20',
//                 available: 'Disponible',
//                 image: trajeHombre4, // imagen importada
//             },
//             {
//                 title: 'Jammer básico',
//                 price: '$30',
//                 available: 'No disponible',
//                 image: trajeHombre4, //  imagen importada
//             },
//         ],
//     },
//     {
//         category: 'Jammers',
//         items: [
//             {
//                 title: 'Short básico',
//                 price: '$15',
//                 available: 'Disponible',
//                 image: trajeHombre4, //  imagen importada
//             },
//             {
//                 title: 'Lycra básica',
//                 price: '$20',
//                 available: 'Disponible',
//                 image: trajeHombre4, //  imagen importada
//             },
//             {
//                 title: 'Jammer básico',
//                 price: '$30',
//                 available: 'No disponible',
//                 image: trajeHombre4, //  imagen importada
//             },
//         ],
//     },
// ];


// const renderItem = ({ item }) => (
//     <View style={styles.card}>
//         <Image source={item.image} style={styles.image} />
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.price}>Precio: {item.price}</Text>
//         <Text style={styles.available}>{item.available}</Text>
//         <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Ver producto</Text>
//         </TouchableOpacity>
//     </View>
// );

// const renderCategory = ({ item }) => (
//     <View style={styles.categoryContainer}>
//         <Text style={styles.categoryTitle}>{item.category}</Text>
//         <FlatList
//             data={item.items}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.horizontalList}
//         />
//     </View>
// );

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.sectionTitle}>Hombres</Text>
//             <FlatList
//                 data={data}
//                 renderItem={renderCategory}
//                 keyExtractor={(item, index) => index.toString()}
//             />
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     sectionTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         margin: 10,
//     },
//     categoryContainer: {
//         marginBottom: 20,
//     },
//     categoryTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginLeft: 10,
//         marginBottom: 10,
//     },
//     horizontalList: {
//         paddingLeft: 10,
//     },
//     card: {
//         backgroundColor: '#3498db',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//         marginRight: 10,
//         width: 200,
//     },
//     image: {
//         width: 100,
//         height: 150,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginVertical: 10,
//     },
//     price: {
//         fontSize: 16,
//         color: '#fff',
//     },
//     available: {
//         fontSize: 14,
//         color: '#fff',
//     },
//     button: {
//         marginTop: 10,
//         backgroundColor: '#5dade2',
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         fontSize: 16,
//         color: '#fff',
//         textAlign: 'center',
//     },
// });
