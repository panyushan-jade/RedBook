/* eslint-disable react-native/no-inline-styles */
import React,{useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  // FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Mock from 'mockjs';
import ResizeImage from '@src/components/ResizeImage'
import AnimateHeart from '@src/components/Heart'
import MasonryList from 'react-native-masonry-list';

// 获取屏幕宽度
const { width: SCREEN_WIDTH } = Dimensions.get('window');

function Home(): JSX.Element {

  const [data,setData] = useState([])
  const [refreshing,setRefreshing] = useState(false);

  const generateRandomImage = () => {
    const width = Mock.Random.integer(200, 600);
    const height = Mock.Random.integer(200, 400);
    return `https://placekitten.com/${width}/${height}`;
  };
  
  const fetchData = () => {
    const mockData = Mock.mock({
      'list|15': [
        {
          'title': '@sentence(5, 10)', // 随机生成包含5-10个单词的句子
          // 'image': () => generateRandomImage(), // 调用自定义的生成随机图片的函数
          'uri': () => generateRandomImage(), // 调用自定义的生成随机图片的函数
          'userName': '@name', // 随机生成姓名
          'avatarUrl': () => generateRandomImage(), // 随机生成100x100大小的图片
          'favoriteCount': '@integer(1, 100)', // 随机生成1-100之间的整数
        }
      ]
    }).list || [];
    return mockData
  }


  useEffect(() => {
    onRefresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const renderItem = ({data }: any) => {
    return (
      <TouchableOpacity style={styles.item}>
        <ResizeImage uri={data.uri} />
        <Text style={styles.titleTxt}>{data.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: data.avatarUrl}} />
          <Text style={styles.nameTxt}>{data.userName}</Text>
          <AnimateHeart
            value={data.isFavorite}
            onValueChanged={(value: boolean) => {
              console.log(value);
            }}
          />
          <Text style={styles.countTxt}>{data.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      const newData = fetchData();
      setData(newData)
      setRefreshing(false)
    },500)
  }

  return (
    <View style={styles.root}>
      <MasonryList
        rerender={true}
        refreshing={refreshing}
        images={data}
        initialNumInColsToRender={2}
        initialColToRender={2}
        onRefresh={onRefresh}
        listContainerStyle={{
          width:'100%',
          height:'100%'
        }}
        backgroundColor="#f0f0f0"
        completeCustomComponent={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
      fontSize: 12,
      color: '#999',
      marginLeft: 6,
      flex: 1,
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
},
});

export default Home;
