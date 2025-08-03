import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ produto, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={styles.title}>{produto.title}</Text>
        <Text style={styles.price}>R$ {produto.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, marginVertical: 5, borderWidth: 1, borderRadius: 5 },
  image: { width: 80, height: 80 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#888' },
});
