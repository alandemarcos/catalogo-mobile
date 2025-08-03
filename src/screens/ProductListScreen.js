
import { Alert } from 'react-native';
import NOMES_CATEGORIAS from '../utils/categories';


import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const CATEGORIES = {
  masculino: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  feminino: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
};

export default function ProductListScreen({ navigation }) {
  const [categoriaAtual, setCategoriaAtual] = useState('mens-shirts');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genero, setGenero] = useState('masculino'); // masculino ou feminino


  const carregarProdutos = async (categoria) => {
    setLoading(true);
    try {
      const res = await api.get(`products/category/${categoria}`);
      setProdutos(res.data.products);
    } catch (e) {
      console.error('Erro ao carregar produtos:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos(categoriaAtual);
  }, [categoriaAtual]);

  // const logout = () => navigation.replace('Login');


  

// ...

const logout = () => {
  Alert.alert(
    'Sair da conta',
    'Você tem certeza que deseja sair da conta?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ],
    { cancelable: true }
  );
};



  const categorias = CATEGORIES[genero];

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.topBar}>
  <View style={styles.generoContainer}>
    <TouchableOpacity onPress={() => setGenero('masculino')} style={styles.generoTouch}>
     <Text
  style={[
    styles.generoBtn,
    genero === 'masculino' && styles.generoBtnAtivoMasculino,
  ]}
>
  Masculino
</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setGenero('feminino')} style={styles.generoTouch}>
     <Text
  style={[
    styles.generoBtn,
    genero === 'feminino' && styles.generoBtnAtivoFeminino,
  ]}
>
  Feminino
</Text>
    </TouchableOpacity>
  </View>
  <TouchableOpacity onPress={logout}>
    <Text style={styles.logout}>Sair</Text>
  </TouchableOpacity>
</View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasBar}>
      
  {categorias.map((cat) => (
  <TouchableOpacity
    key={cat}
    style={[styles.categoriaBtn, categoriaAtual === cat && styles.categoriaBtnAtivo]}
    onPress={() => setCategoriaAtual(cat)}
  >
    <Text
      style={[styles.categoriaText, categoriaAtual === cat && styles.categoriaTextAtivo]}
    >
      {NOMES_CATEGORIAS[cat] || cat}
    </Text>
  </TouchableOpacity>
))}

        
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard produto={item} onPress={() => navigation.navigate('Details', { id: item.id })} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  generoContainer: {
    flexDirection: 'row',
    gap: 8, // ou use marginHorizontal
  },

  generoTouch: {
    marginRight: 5,
  },

  generoBtnAtivo: {
    backgroundColor: '#ccc',
    fontWeight: 'bold',
  },

  logout: {
    fontSize: 16,
    color: 'red',
  },

  generoBtn: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#eee',
    color: '#444',
  },
  generoBtnAtivoMasculino: {
    backgroundColor: '#4287f5', // azul
    color: '#fff',
    fontWeight: 'bold',
  },

  generoBtnAtivoFeminino: {
    backgroundColor: '#f54291', // rosa
    color: '#fff',
    fontWeight: 'bold',
  },
  logout: {
    fontSize: 16,
    color: 'red',
  },
  categoriasBar: {
    flexGrow: 0,
    marginBottom: 10,
  },
  categoriaBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    alignContent: 'center',
    justifyContent: 'center',
  },
  categoriaBtnAtivo: {
    backgroundColor: '#333',
  },
  categoriaText: {
    color: '#333',
    textTransform: 'capitalize',
  },
  categoriaTextAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
