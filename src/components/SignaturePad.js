// SignatureComponent.js
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

const SignatureComponent = ({ onSignatureChange }) => {
  const [imageData, setImageData] = useState('');
  const signatureRef = useRef(null);

  const handleClear = () => {
    console.log('clear success!');
    setImageData('');
    onSignatureChange('');
  };

  const handleOK = (signature) => {
    console.log(signature);
    setImageData(signature);
    onSignatureChange(signature);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Here</Text>
      <SignatureCanvas
        ref={signatureRef}
        style={styles.signature}
        onOK={handleOK}
        onClear={handleClear}
      />
      {imageData && (
        <View style={styles.preview}>
          <Image source={{ uri: imageData }} style={styles.previewImage} />
          <Text>Preview of your signature</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  signature: {
    width: 300,
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  preview: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 100,
  },
});

export default SignatureComponent;
