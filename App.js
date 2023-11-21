import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigation from './AppNavigation'; // Certifique-se de fornecer o caminho correto

const App = () => {
  return (
    <View style={styles.container}>
      <AppNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Adicione estilos adicionais conforme necessário
  },
});

export default App;
