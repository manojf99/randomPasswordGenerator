import { View, Text, TextInput, Button, Alert, Clipboard } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'react-native-check-box'

export default function page() {
  const[uppercase ,setUppercase] = useState(false);
  const[lowercase ,setLowercase]= useState(false);
  const[number ,setNumber]= useState(false);
  const[symbol ,setSymbol]= useState(false);
  const[generatedPassword, setGeneratedPassword]=useState('');

  const generatePassword = ()=>{
    const selectedCriteria = [
      uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' :'',
      lowercase ? 'abcdefghijklmnopqrstuvwxyz' :'',
      number ? '0123456789' :'',
      symbol ? '!@#$%^&*()_+-*/~?' :''
    ].join('');
    let password ='';
    const lengthInt = parseInt(length)
    if(lengthInt> 0 && selectedCriteria.length >0)
    {
      for(let i=0 ;i<lengthInt;i++){
        const randomIndex=Math.floor(Math.random()*selectedCriteria.length);
        password += selectedCriteria[randomIndex];
  
      }
       setGeneratePassword(password);
    }else{
      Alert.alert('Invalid criteria or feild');
    }
  } 

  const copyToClipboard = async() => {
  try{
    await Clipboard.setString(generatePassword)
    Alert.alert('Password copied','The generated password copied to clipboad');
  } catch(error){
    console.error('Error copying to clipbord',error);
  }
  };
  
  return (
    <View>
      <Text> Generate Random password</Text>
      <Text> password length</Text>
      <TextInput
      placeholder='enter Password length'
      value='length'
      onChangeText={setLength}
      keyboardType='number-pad'
      />
    <Checkbox
      isChecked={uppercase}
      onClick={()=>setUppercase(!uppercase)}
      rightText='Uppercase'
      rightTextStyle={{fontSize: 19}}
      />
      <Checkbox
      isChecked={lowercase}
      onClick={()=>setLowercase(!lowercase)}
      rightText='Lowercase'
      rightTextStyle={{fontSize: 19}}
      />
      <Checkbox
      isChecked={number}
      onClick={()=>setNumber(!number)}
      rightText='Number'
      rightTextStyle={{fontSize:19}}
      />
      <Checkbox
      isChecked={symbol}
      onClick={()=>setSymbol(!symbol)}
      rightText='Symbol'
      rightTextStyle={{fontSize:19}}
      />

      <Button
      title='Generate password'
      onClick={()=>{generatePassword}}/>

      <Text>generated Password</Text>
      <Text> {generatePassword}</Text>
      <Button title='copy' 
      onPress={generatePassword} />

    

      
    </View>
  )
}