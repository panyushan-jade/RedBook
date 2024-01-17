import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';



function Message(): JSX.Element {


  return (
    <View style={styles.root}>
        <Text>我是message</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    width:'100%',
    height:'100%',
    alignItems:'center'
  }
});

export default Message;
