import React,{ useEffect } from 'react';
// import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loadStorage } from '@src/utils/storage'

import welcomeLogo from '@src/assets/icon_main_logo.png'


function Welcome(): JSX.Element {

  const navigation = useNavigation<NativeStackNavigationProp<any>>()


  useEffect(() => {
    setTimeout(() => {
      startLogin();
    }, 2000);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const startLogin = async () => {
  const userInfo = await loadStorage('userInfo')
  if(userInfo){
    navigation.replace('MainTab');
  }else{
    navigation.replace('Login');
  }
}

  return (
    <View style={styles.root}>
        <Image style={styles.welcomeLogo} source={welcomeLogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    width:'100%',
    height:'100%',
    alignItems:'center'
  },
  welcomeLogo:{
    width:300,
    height:100,
    resizeMode:'contain',
    marginTop:200
  }
});

export default Welcome;
