import React,{ useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Linking,
  TextInput,
  LayoutAnimation
} from 'react-native';

import icon_triangle from '@src/assets/icon_triangle.png';
import icon_eye_open from '@src/assets/icon_eye_open.png';
import icon_eye_close from '@src/assets/icon_eye_close.png';
import icon_exchange from '@src/assets/icon_exchange.png';
import icon_wx from '@src/assets/icon_wx.png';
import icon_qq from '@src/assets/icon_qq.webp';
import icon_close_modal from '@src/assets/icon_close_modal.png';
import icon_unselected from '@src/assets/icon_unselected.png';
import icon_selected from '@src/assets/icon_selected.png';

type PwdLogingProps = {
    setLoginType: React.Dispatch<React.SetStateAction<"input" | "quick">>
}


function PwdLogin(props: PwdLogingProps): JSX.Element {
    const { setLoginType } = props;

    const [check, setCheck] = useState<boolean>(false);
    const [eyeOpen, setEyeOpen] = useState<boolean>(true);

    const [phone, setPhone] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const canLogin = phone?.length === 11 && pwd?.length === 6;
    const onLoginPress = async () => {
        if (!canLogin || !check) {
            return;
        }

        // UserStore.requestLogin(replaceBlank(phone), pwd, (success: boolean) => {
        //     if (success) {
        //         navigation.replace('MainTab');
        //     } else {
        //         Toast.show('登陆失败，请检查用户名和密码');
        //     }
        // })
    }
  return (
    <View style={styles.root}>
                <Text style={styles.pwdLogin}>密码登陆</Text>
                <Text style={styles.tip}>
                    未注册的手机号登陆成功后将自动注册
                </Text>
                <View style={styles.phoneLayout}>
                    <Text style={styles.pre86}>+86</Text>
                    <Image style={styles.triangle} source={icon_triangle} />
                    <TextInput
                        style={styles.phoneInput}
                        placeholderTextColor="#bbb"
                        placeholder='请输入手机号码'
                        autoFocus={false}
                        keyboardType='number-pad'
                        maxLength={13}
                        value={phone}
                        onChangeText={(text: string) => {
                            setPhone(text);
                        }}
                    />
                </View>

                <View style={styles.pwdLayout}>
                    <TextInput
                        style={[styles.phoneInput, styles.pwdInput]}
                        placeholderTextColor="#bbb"
                        placeholder='输入密码'
                        autoFocus={false}
                        keyboardType='number-pad'
                        maxLength={6}
                        secureTextEntry={!eyeOpen}
                        value={pwd}
                        onChangeText={(text: string) => {
                            setPwd(text);
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setEyeOpen(!eyeOpen)
                        }}
                    >
                        <Image
                            style={styles.iconEye}
                            source={eyeOpen ? icon_eye_open : icon_eye_close}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.changeLayout}>
                    <Image style={styles.exchangeIcon} source={icon_exchange} />
                    <Text style={styles.codeLoginTxt}>验证码登陆</Text>
                    <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={canLogin ? 0.7 : 1}
                    style={canLogin ? styles.loginButton : styles.loginButtonDisable}
                    onPress={onLoginPress}
                >
                    <Text style={styles.loginTxt}>登陆</Text>
                </TouchableOpacity>

                <View style={styles.protocolLayout}>
                    <TouchableOpacity
                        onPress={() => {
                            setCheck(!check);
                        }}
                    >
                        <Image
                            style={styles.radioButton}
                            source={check ? icon_selected : icon_unselected}
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

                <View style={styles.wxqqLayout}>
                    <Image style={styles.iconWx} source={icon_wx} />
                    <Image style={styles.iconQQ} source={icon_qq} />
                </View>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setLoginType('quick')
                    }}
                >
                    <Image style={styles.closeImg} source={icon_close_modal} />
                </TouchableOpacity>
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
    protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 12,
    },
    radioButton: {
        width: 20,
        height: 20,
    },
    root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48,
    },
    pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56,
    },
    tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
    },
    phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
    },
    pre86: {
        fontSize: 24,
        color: '#bbb',
    },
    triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
    },
    phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
    },
    pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
    },
    pwdInput: {
        marginLeft: 0,
        marginRight:16,
    },
    iconEye: {
        width: 30,
        height: 30,
    },
    changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    exchangeIcon: {
        width: 16,
        height: 16,
    },
    codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4,
    },
    forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
    },
    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
    },
    loginButtonDisable: {
        width: '100%',
        height: 56,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
    },
    loginTxt: {
        fontSize: 20,
        color: 'white',
    },
    wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
    },
    iconWx: {
        width: 50,
        height: 50,
        marginRight: 60,
    },
    iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60,
    },
    closeButton: {
        position: 'absolute',
        left: 36,
        top: 24,
    },
    closeImg: {
        width: 28,
        height: 28,
    },
});

export default PwdLogin;
