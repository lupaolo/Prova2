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
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


const Avalia = () => {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    email: '',
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
    if (!formData.nome || !formData.email || !formData.endereco ) {
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

  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image
  source={require('./assets/imagic4.png')} // Substitua 'banner.png' pelo nome real do seu arquivo
  style={styles.banner}
/>
    <ScrollView>

      <Text style={styles.title}>Avalie nossos serviços:</Text>

      <TextInput
        style={styles.input}
        placeholder="Como está sendo sua experiência com a SHOP?"
        value={formData.nome}
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Você recomendaria a SHOP para sua família, amigos e etc?"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Como você se sente em relação ao marketing digital?"
        value={formData.endereco}
        onChangeText={(text) => setFormData({ ...formData, endereco: text })}
      />
    <Text style={styles.texton}>Que nota você daria para os nossos serviços:</Text>

      <Picker
          style={styles.input}
          selectedValue={formData.valorProduto}
          onValueChange={(itemValue) => setFormData({ ...formData, valorProduto: itemValue })}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
            <Picker.Item key={value} label={`${value}`} value={`${value}`} />
          ))}
        </Picker>
    <Text style={styles.texton}>Caso tenha alguma reclamação ou elogio faça aqui:</Text>
      <TextInput
        style={styles.input}
        placeholder="Reclame aqui"
        value={formData.cpf}
        onChangeText={(text) => setFormData({ ...formData, cpf: text })}
      />

      <Button title={editingId ? 'Atualizar' : 'Salvar'} onPress={saveForm} />
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
    fontSize: 18,
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
  list: {
    marginTop: 20,
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

export default Avalia ;
