import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  const EMAIL_VALIDO = 'usuario@teste.com';
  const SENHA_VALIDA = '123456';

  const handleLogin = () => {
    Keyboard.dismiss(); // fecha teclado
    setErro('');

    if (email !== EMAIL_VALIDO || senha !== SENHA_VALIDA) {
      setErro('Username ou senha inválidos');
      return;
    }

    navigation.replace('Products', { user: { email } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.welcome}>Bem-vindo de volta!</Text>
        <Text style={styles.sub}>Insira seus dados para entrar na sua conta.</Text>
      </View>

      <View style={styles.card}>
        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.senhaContainer}>
          <TextInput
            placeholder="Digite sua senha"
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icone}>
            <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.hintBox}>
          <Text style={styles.hintTitle}>Acesso de exemplo:</Text>
          <Text style={styles.hint}>Email: {EMAIL_VALIDO}</Text>
          <Text style={styles.hint}>Senha: {SENHA_VALIDA}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topBox: {
    backgroundColor: '#2563eb',
    paddingVertical: 40,
    paddingHorizontal: 20,
   
  },

  welcome: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  sub: {
    fontSize: 14,
    color: '#e0e0e0',
  },

  card: {
backgroundColor: '#fff',
  marginTop: 20, // ou 0
  marginHorizontal: 20,
  padding: 20,
  borderRadius: 12,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  },

  erro: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },

  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingRight: 10,
    marginBottom: 15,
  },

  icone: {
    paddingLeft: 10,
  },

  botao: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  hintBox: {
    marginTop: 20,
    alignItems: 'center',
  },

  hintTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15,
  },

  hint: {
    fontSize: 13,
    color: '#555',
  },
});
