import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import ImageViewer from './Components/ImageViewer';
import Button from './Components/Button';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import CircleButton from './Components/CircleButton';
import IconButton from './Components/IconButton';
const PlaceholderImage = require('./assets/images/background-image.png');

const App = () => {
  //Creating a sync function:
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false);
  const handleReset = () => {
    setShowAppOptions(false)
  }
  const handleAddSticker = () => {

  }
  const handleSaveImageSync = async () => {

  }
  const handleShowAppOptions = () => {
    setShowAppOptions(true)
  }
  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
        setShowAppOptions(true);
        // console.log(result);
      } else {
        alert("You did not select an image.")
      }
    } catch (error) {
      console.log('ERROR Picking image:', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {/* <View style={styles.footerContainer}>
        <Button theme="primary" label='Choose a photo' onPress={pickImageAsync} />
        <Button label='Use this photo' onPress={handleShowAppOptions} />
      </View> */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={handleReset} />
            <CircleButton onPress={handleAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={handleSaveImageSync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label='Choose a photo' onPress={pickImageAsync} />
          <Button label='Use this photo' onPress={handleShowAppOptions} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default App;