import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  Clipboard,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
  
export default function App() {
  const [alength, setAlength] = useState(''); // Use an empty string to handle text input
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  

  const generatePassword = () => {
    const selectedCriteria = [
      uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '',
      number ? '0123456789' : '',
      symbol ? '!@#$%^&*()_-+=<>?' : '',
    ].join('');

    let password = '';
    const lengthInt = parseInt(alength);
    if (lengthInt > 0 && selectedCriteria.length > 0) {
      for (let i = 0; i < lengthInt; i++) {
        const randomIndex = Math.floor(Math.random() * selectedCriteria.length);
        password += selectedCriteria[randomIndex];
      }
      setGeneratedPassword(password);
    } else {
      Alert.alert('Invalid input or criteria.');
    }
  };


  // const copyToClipboard = () => {
  //   Clipboard.setString(generatePassword);
  //   setGeneratedPassword('password copy');
  //   setTimeout(() => setGeneratedPassword(''),3000);
  // };

  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(generatedPassword);
      Alert.alert('Password Copied', ' password copied to the clipboard.');
    } catch (error) {
      console.error('Error copying to clipboard: ', error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Generate Random Password</Text>
      <Text style={styles.text1}>Password Length</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Password length"
        onChangeText={setAlength}
        value={alength}
        keyboardType="number-pad"
      />

      <View style={{padding: 30}}>
        <Text style={styles.text1}>Criteria</Text>
        <CheckBox
          style={{marginBottom: 20}}
          isChecked={uppercase}
          onClick={() => setUppercase(!uppercase)}
          rightText="Uppercase"
          rightTextStyle={{fontSize: 19}}
        />
        <CheckBox
          isChecked={lowercase}
          onClick={() => setLowercase(!lowercase)}
          rightText="Lowercase"
          rightTextStyle={{fontSize: 19}}
        />
        <View style={styles.check}>
          <CheckBox
            style={{marginBottom: 20}}
            isChecked={number}
            onClick={() => setNumber(!number)}
            rightText="Number"
            rightTextStyle={{fontSize: 19}}
          />
          <CheckBox
            isChecked={symbol}
            onClick={() => setSymbol(!symbol)}
            rightText="Symbol"
            rightTextStyle={{fontSize: 19}}
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button
          color="#900C3F"
          title="Generate Password"
          onPress={generatePassword}
        />
      </View>
      {generatedPassword && (
        <View style={styles.box}>
          <Text style={{ margin:10, fontSize: 20, fontStyle:'italic' }}>Generated password : </Text>
          <Text style={{ padding:20, fontSize: 20 }}>{generatedPassword}</Text>
          <View style={styles.copy}>
            <Button title="Copy" onPress={copyToClipboard} />
          </View>
        </View>
      )}
    </View>
  );
}
      
  const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    top: 10,
    fontSize: 25,
    color: 'white',
    margin: 10,
    padding: 5,
    backgroundColor: '#900C3F',
    height: 40,
    borderRadius: 30,
  },
  text1: {
    fontSize: 20,
    margin: 15,
    top: 15,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 20,
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
  },
  check: {
    position: 'relative',
    margin: 27,
    bottom: 95,
    left: 170,
  },
  button: {
    //alignItems:'center',

    borderRadius: 2,
    margin: 10,
    bottom: 130,
    elevation: 2,
    //backgroundColor:'green'

    // justifyContent: 'center',
    //margin:5,
    //marginTop:30,
    // shadowColor: 'black',
    //shadowOffset:{width: 0,height:10},
    // shadowRadius:6,
    //shadowOpacity:1,
    //elevation:2,
    // padding:10,
    //borderRadius:20,
    //backgroundColor:'green'
  },
  copy: {
    width: 70,
    left: 200,
    bottom: 53,
  },
  card: {

    margin: 10,
    padding: 10,
  
    borderRadius:5,
    elevation:2,
  },
  box: {
    justifyContent: 'center',
    margin: 5,
    //marginTop:20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 2,
    padding: 0,
    borderRadius: 20,
    backgroundColor: 'green',
  },
});
