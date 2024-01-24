import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Modal,
    Dimensions,
} from 'react-native'

import icon_arrow from '@src/assets/icon_arrow.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
    categoryList: Category[];
};

export interface CategoryModalRef {
    show: () => void;
    hide: () => void;
}

export default forwardRef((props: Props, ref) => {

    const { categoryList } = props;

    const [myList, setMyList] = useState<Category[]>([]);
    const [otherList, setOtherList] = useState<Category[]>([]);

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!categoryList) {
            return;
        }
        const list1 = categoryList.filter(i => i.isAdd);
        const list2 = categoryList.filter(i => !i.isAdd);

        setMyList(list1);
        setOtherList(list2);
    }, [categoryList]);

    const show = () => {
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    useImperativeHandle(ref, () => {
        return {
            show, hide,
        }
    });

    const renderMyList = () => {
        return (
            <>
            <View style={styles.row}>
                <Text style={styles.titleTxt}>我的频道</Text>
                <Text style={styles.subTitleTxt}>点击进入频道</Text>
                <TouchableOpacity
                    style={styles.editButton}
                >
                    <Text style={styles.editTxt}>
                         进入编辑
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={hide}
                >
                    <Image style={styles.closeImg} source={icon_arrow} />
                </TouchableOpacity>
            </View>
            <View style={styles.listContent}>
                {myList.map((item: Category) => {
                    return (
                        <TouchableOpacity
                            key={`${item.name}`}
                            style={item.default ? styles.itemLayoutDefault : styles.itemLayout}
                            // onPress={onMyItemPress(item)}
                        >
                            <Text style={styles.itemTxt}>{item.name}</Text>
                            {/* {edit && !item.default && <Image style={styles.deleteImg} source={icon_delete} />} */}
                        </TouchableOpacity>
                    );
                })}
            </View>
            </>
        );
    }

    const renderOtherList = () => {
        return (
            <>
            <View style={[styles.row, {marginTop: 32}]}>
                <Text style={styles.titleTxt}>推荐频道</Text>
                <Text style={styles.subTitleTxt}>点击添加频道</Text>
            </View>
            <View style={styles.listContent}>
                {otherList.map((item: Category) => {
                    return (
                        <TouchableOpacity
                            key={`${item.name}`}
                            style={styles.itemLayout}
                        >
                            <Text style={styles.itemTxt}>+ {item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            </>
        );
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
            animationType='fade'
            onRequestClose={hide}
            style={styles.modal}
        >
            <View style={styles.root}>
                <View style={styles.content}>
                    {renderMyList()}
                    {renderOtherList()}
                </View>
                <View style={styles.mask}/>
            </View>
        </Modal>
    );
})

const styles = StyleSheet.create({
    modal:{
        width:"60%",
        marginTop:200
    },
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 48 + (StatusBar.currentHeight || 0),
        paddingBottom: 40,
    },
    mask: {
        width: '100%',
        flex: 1,
        backgroundColor: '#00000060',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 16,
    },
    subTitleTxt: {
        fontSize: 13,
        color: '#999',
        marginLeft: 12,
        flex: 1,
    },
    editButton: {
        paddingHorizontal: 10,
        height: 28,
        backgroundColor: '#EEE',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editTxt: {
        fontSize: 13,
        color: '#3050ff',
    },
    closeButton: {
        padding: 16,
    },
    closeImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        transform: [{rotate: '90deg'}]
    },
    listContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemLayout: {
        width: SCREEN_WIDTH - 80 >> 2,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
        marginLeft: 16,
        marginTop: 12,
    },
    itemLayoutDefault: {
        width: SCREEN_WIDTH - 80 >> 2,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 6,
        marginLeft: 16,
        marginTop: 12,
    },
    itemTxt: {
        fontSize: 16,
        color: '#666',
    },
    deleteImg: {
        width: 16,
        height: 16,
        position: 'absolute',
        top: -6,
        right: -6,
    },
});

