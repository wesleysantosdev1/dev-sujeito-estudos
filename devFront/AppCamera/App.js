import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, SafeAreaViewBase, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';


export default function App() {

  const [photo, setPhoto] = useState(null);

  async function openAlbum(){

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        alert("Permissão necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) {
      console.log("Cancelado");
      return;
    }

    console.log(result.assets);
    setPhoto(result.assets[0].uri)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity 
        style={styles.button}
        onPress={openAlbum}
        >
          <Text style={styles.text}>Abrir album</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Abrir camera</Text>
        </TouchableOpacity>
      </View>

      {photo !== null && (
        <Image 
          source={{ uri: photo}}
          style={styles.image}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center",
  },

  buttons: {
    marginTop: 44,
    flexDirection: "row", 
    gap: 14,
    marginBottom: 30
  }, 

  button: {
    backgroundColor: '#121212', 
    padding: 4, 
    paddingLeft: 16, 
    paddingRight: 16, 
    borderRadius: 4,
  }, 

  text: {
    color: '#fff'
  }, 

  image: {
    width: '90%', 
    height: 300, 
    objectFit: 'cover'
  }
});
