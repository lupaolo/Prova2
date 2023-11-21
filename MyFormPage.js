import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


  // Function to handle button press and navigate to another screen
  const handleButtonPress = () => {
    // Replace 'AnotherScreen' with the actual name of the screen you want to navigate to
    navigation.navigate('CadProd');
  };


const MyFormPage = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cpf: '',
  });
  const [formList, setFormList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadFormList();
  }, []);

  const loadFormList = async () => {
    try {
      const storedForms = await AsyncStorage.getItem('formList');
      if (storedForms) {
        setFormList(JSON.parse(storedForms));
      }
    } catch (error) {
      console.error('Erro ao carregar formulários:', error);
    }
  };

  const saveForm = async () => {
    if (!formData.nome || !formData.email || !formData.telefone || !formData.endereco || !formData.cpf) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }

    const updatedFormList = [...formList];
    if (editingId) {
      const formIndex = updatedFormList.findIndex((form) => form.id === editingId);
      updatedFormList[formIndex] = formData;
    } else {
      const newForm = { ...formData, id: Date.now().toString() };
      updatedFormList.push(newForm);
    }

    setFormList(updatedFormList);
    setFormData({ id: '', nome: '', email: '', telefone: '', endereco: '', cpf:'' });
    setEditingId(null);

    try {
      await AsyncStorage.setItem('formList', JSON.stringify(updatedFormList));
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
    }
  };

  const deleteForm = async (formId) => {
    const updatedFormList = formList.filter((form) => form.id !== formId);
    setFormList(updatedFormList);

    try {
      await AsyncStorage.setItem('formList', JSON.stringify(updatedFormList));
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
    }
  };

  const editForm = (formId) => {
    const formToEdit = formList.find((form) => form.id === formId);
    setFormData(formToEdit);
    setEditingId(formId);
  };

  const handleButtonPress = () => {
    // Replace 'CadProd' with the actual name of the screen you want to navigate to
    navigation.navigate('CadProd');
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      
      <Image
  source={require('./assets/imagic.jpg')} // Substitua 'banner.png' pelo nome real do seu arquivo
  style={styles.banner}
/>
      <ScrollView>
      <Text style={styles.title}>Cadastre-se como beneficiário parceiro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={formData.nome}
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={formData.telefone}
        onChangeText={(text) => setFormData({ ...formData, telefone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={formData.endereco}
        onChangeText={(text) => setFormData({ ...formData, endereco: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={formData.cpf}
        onChangeText={(text) => setFormData({ ...formData, cpf: text })}
      />


      <Button title={editingId ? 'Atualizar' : 'Salvar'} onPress={saveForm} />

      <Text style={styles.texton}>Quando seu cadastro estiver concluído mandaremos um email. Anexe os documentos solicitados na resposta do email.</Text>
      <Text style={styles.texton}>Assim que a etapa de autenticação acabar você poderá usufruir das vantagens de ser um cliente beneficiário.</Text>
      <Text style={styles.textn}>Agora você já pode Cadastrar seu produto</Text>

       {/* Button */}
       <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Cadastre seu produto</Text>
        </TouchableOpacity>
      </ScrollView> 
      <FlatList
        style={styles.list}
        data={formList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item} onPress={() => editForm(item.id)}>
              <Text>{item.nome}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteForm(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4F4F'
  },
  banner: {
    width: '100%', // ou você pode definir uma largura específica
    height: 150,    // ou você pode definir uma altura específica
    resizeMode: 'cover', // ou 'contain' dependendo do que você precisa
    
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 16,
    color:'white'
  },

  textin:{
    fontSize: 20,
    fontWeight: '300',
    marginVertical: 10,
    color:'white'
  },
  texton:{
    fontSize: 20,
    fontWeight: '300',
    marginVertical: 5,
    color:'white'
  },
  textn:{
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color:'white'
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    marginLeft:5,
    marginRight:5,
    paddingHorizontal: 10,
    backgroundColor:'white'
  },
  button: {
    backgroundColor: 'black', // Change the background color as needed
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Change the text color as needed
    fontSize: 18,
    textAlign: 'center',
  },
  list: {
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff6666',
    padding: 10,
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MyFormPage;
