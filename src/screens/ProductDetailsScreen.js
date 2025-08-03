import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    api.get(`products/${id}`).then((res) => {
      setProduto(res.data);
    });
  }, []);

  if (!produto) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{produto.title}</Text>
      <Text style={styles.desc}>{produto.description}</Text>
      <Text style={styles.price}>Preço: R$ {produto.price}</Text>
      <Text style={styles.discount}>Desconto: {produto.discountPercentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 250, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  desc: { marginVertical: 10 },
  price: { fontSize: 18, fontWeight: 'bold' },
  discount: { fontSize: 16, color: 'green' },
});
