import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';



function Mine(): JSX.Element {


  return (
    <View style={styles.root}>
        <Text>mine</Text>
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

export default Mine;
