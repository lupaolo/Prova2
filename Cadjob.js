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
import { TextInputMask } from 'react-native-masked-text';


const Cadjob = () => {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cpf: '',
    rg:'',
  });
  const [formList, setFormList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const formatRg = (text) => {
    // Remove caracteres não numéricos
    const cleanedText = text.replace(/\D/g, '');

    // Aplica a máscara
    const formattedRg = cleanedText.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');

    return formattedRg;
  };
  const formatCpf = (text) => {
    // Remove caracteres não numéricos
    const cleanedText = text.replace(/\D/g, '');

    

// Aplica a máscara
    
    
const formattedCpf = cleanedText.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

    

return formattedCpf;

};

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
    if (!formData.nome || !formData.email || !formData.telefone || !formData.endereco || !formData.cpf, !formData.rg) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }
    if (!formData.email.includes('@gmail.com')) {
      Alert.alert('Atenção', 'O campo de email deve conter o caractere "@gmail.com"');
      
 
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
    setFormData({ id: '', nome: '', email: '', telefone: '', endereco: '', cpf:'',rg:'' });
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
  source={require('./assets/imagic3.png')} // Substitua 'banner.png' pelo nome real do seu arquivo
  style={styles.banner}
/>
    <ScrollView>

      <Text style={styles.title}>Trabalhe conosco:</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={formData.nome}
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInputMask
        style={styles.input}
        placeholder="CPF"
        type={'cpf'}
        value={formatCpf(formData.cpf)}
        onChangeText={(text) => setFormData({ ...formData, cpf: formatCpf(text) })}
      />

      <TextInputMask
        style={styles.input}
        placeholder="RG"
        type={'custom'}
        options={{ mask: '99.999.999-9' }}
        value={formatRg(formData.rg)}
        onChangeText={(text) => setFormData({ ...formData, rg: formatRg(text) })}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="endereçoo"
        value={formData.endereco}
        onChangeText={(text) => setFormData({ ...formData, endereco: text })}
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

export default Cadjob;
