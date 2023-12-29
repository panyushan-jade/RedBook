import React,{ useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Linking
} from 'react-native';

import welcomeLogo from '@src/assets/icon_main_logo.png';
import wxLogo from '@src/assets/icon_wx.png'
import selected from '@src/assets/icon_selected.png';
import unSelected from '@src/assets/icon_unselected.png';

function DefaultLogin(): JSX.Element {

    const [check, setCheck] = useState<boolean>(false);


  return (
    <View style={styles.root}>
        <Image style={styles.welcomeLogo} source={welcomeLogo} />
        <TouchableOpacity style={[styles.oneClickLogin,styles.oneClickBtnColor]} activeOpacity={0.7}>
            <Text style={styles.loginTxt}>一键登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.oneClickLogin,styles.wxBtnColor]} activeOpacity={0.7}>
            <Image source={wxLogo} style={styles.wxIcon} />
            <Text style={styles.loginTxt}>微信登陆</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.otherLogin}>
            <Text style={styles.otherLoginTxt}>其他登陆方式 {'>'}</Text>
        </TouchableOpacity>
        <View style={styles.protocolLayout}>
            <TouchableOpacity
                onPress={() => {
                    setCheck(!check);
                }}
            >
                <Image
                    style={styles.radioButton}
                    source={check ? selected : unSelected}
                />
            </TouchableOpacity>
            <Text style={styles.lableTxt}>我已阅读并同意</Text>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL('https://www.baidu.com')
                }}
            >
                <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    lableTxt: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
    },
    protocolTxt: {
        fontSize: 12,
        color: '#1020ff',
    },
    radioButton: {
        width: 20,
        height: 20,
    },
    protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 'auto',
    },
    otherLogin:{
        marginTop:20
    },
    oneClickLogin:{
        width:'100%',
        height:56,
        borderRadius:28,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:20
    },
    oneClickBtnColor:{
        backgroundColor:'#ff203a',
        marginTop:250
    },
    wxBtnColor:{
        backgroundColor:'#02b856'
    },
    wxIcon:{
        width:32,
        height:32,
        resizeMode:'contain',
        marginRight:10
    },
    loginTxt:{
        color:'white',
        fontSize:20
    },
    otherLoginTxt:{
        color:'#3c3b3b',
        fontSize:16,
    },
  root:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    paddingHorizontal:90
  },
  welcomeLogo:{
    width:300,
    height:100,
    resizeMode:'contain',
    marginTop:150
  }
});

export default DefaultLogin;
