import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const HomeScreen = ({ navigation }) => {
  const carouselImages = [
    require('./assets/imag1.jpg'),
    require('./assets/imag2.jpg'),
    require('./assets/image3.jpg'),
    require('./assets/image4.webp'),
    require('./assets/image5.webp'),
  ];

  // Function to handle button press and navigate to another screen
  const handleButtonPress = () => {
    // Replace 'AnotherScreen' with the actual name of the screen you want to navigate to
    navigation.navigate('MyFormPage');
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image
        source={require('./assets/imag7.jpg')}
        style={styles.banner}
      />
      <ScrollView>

        <Text style={styles.textin}>Somos a SHOP utilizamos marketing digital para revender produtos por uma porcentagem do lucro.</Text>
        <Text style={styles.title}>Veja alguns dos nossos produtos parceiros:</Text>
        {/* Carousel */}
        <Swiper style={styles.carousel} showsButtons={false} autoplay={true} autoplayTimeout={4}>
          {carouselImages.map((image, index) => (
            <View key={index}>
              <Image source={image} style={styles.carouselImage} />
            </View>
          ))}
        </Swiper>

        <Text style={styles.textin}>Anuncie agora seu produto em nosso site.</Text>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Anunciar</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2F4F4F'
  },
  textin: {
    fontSize: 22,
    fontWeight: '300',
    marginVertical: 20,
    color:'white'
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  carousel: {
    marginTop: 20,
    height: 200,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
    color:'white'
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
});

export default HomeScreen;
