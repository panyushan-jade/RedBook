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
// import MasonryList from 'react-native-masonry-list';
import MasonryList from '@react-native-seoul/masonry-list';
import CategoryList from './components/CategoryList'
import TitleBar from './components/TitleBar'
import Toast from 'react-native-root-toast';

const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  { name: '推荐', default: true, isAdd: true },
  { name: '视频', default: true, isAdd: true },
  { name: '直播', default: true, isAdd: true },
  { name: '摄影', default: false, isAdd: true },

  { name: '穿搭', default: false, isAdd: true },
  { name: '读书', default: false, isAdd: true },
  { name: '影视', default: false, isAdd: true },
  { name: '科技', default: false, isAdd: true },

  { name: '健身', default: false, isAdd: true },
  { name: '科普', default: false, isAdd: true },
  { name: '美食', default: false, isAdd: true },
  { name: '情感', default: false, isAdd: true },

  { name: '舞蹈', default: false, isAdd: true },
  { name: '学习', default: false, isAdd: true },
  { name: '男士', default: false, isAdd: true },
  { name: '搞笑', default: false, isAdd: true },

  { name: '汽车', default: false, isAdd: true },
  { name: '职场', default: false, isAdd: true },
  { name: '运动', default: false, isAdd: true },
  { name: '旅行', default: false, isAdd: true },

  { name: '音乐', default: false, isAdd: true },
  { name: '护肤', default: false, isAdd: true },
  { name: '动漫', default: false, isAdd: true },
  { name: '游戏', default: false, isAdd: true },

  // 默认添加频道
  { name: '家装', default: false, isAdd: false },
  { name: '心理', default: false, isAdd: false },
  { name: '户外', default: false, isAdd: false },
  { name: '手工', default: false, isAdd: false },

  { name: '减脂', default: false, isAdd: false },
  { name: '校园', default: false, isAdd: false },
  { name: '社科', default: false, isAdd: false },
  { name: '露营', default: false, isAdd: false },

  { name: '文化', default: false, isAdd: false },
  { name: '机车', default: false, isAdd: false },
  { name: '艺术', default: false, isAdd: false },
  { name: '婚姻', default: false, isAdd: false },

  { name: '家居', default: false, isAdd: false },
  { name: '母婴', default: false, isAdd: false },
  { name: '绘画', default: false, isAdd: false },
  { name: '壁纸', default: false, isAdd: false },

  { name: '头像', default: false, isAdd: false },
];


// 获取屏幕宽度
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const generateRandomImage = () => {
  const width = Mock.Random.integer(200, 600);
  const height = Mock.Random.integer(200, 400);
  return `https://picsum.photos/${width}/${height}`;
};

function Home(): JSX.Element {

  const [data,setData] = useState([])
  const [refreshing,setRefreshing] = useState(false);

  
  const fetchData = () => {
    const mockData = Mock.mock({
      'list|10': [
        {
          'id': '@id',
          'title': '@sentence(5, 10)', // 随机生成包含5-10个单词的句子
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

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.item}>
        <ResizeImage uri={item.uri} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <AnimateHeart
            value={item.isFavorite}
            onValueChanged={(value: boolean) => {
              console.log(value);
            }}
          />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
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
      Toast.show('加载完成~',{
        position:Toast.positions.CENTER
      })
    },500)
  }
  
  
  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = () => {
    return (
        <Text style={styles.footerTxt}>没有更多数据</Text>
    );
}

  return (
    <View style={styles.root}>
      <TitleBar
                tab={1}
                onTabChanged={(tab: number) => {
                    console.log(`tab=${tab}`)
                }}
            />
      <MasonryList
        style={styles.flatList}
        refreshing={refreshing}
        data={data}
        onRefresh={onRefresh}
        numColumns={2}
        ListFooterComponent={<Footer />}
        keyExtractor={(item): string => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <CategoryList
              categoryList={DEFAULT_CATEGORY_LIST}
              // allCategoryList={store.categoryList}
              onCategoryChange={(category: Category) => {
                  console.log(JSON.stringify(category));
              }}
          />
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    height: '100%',
  },
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
footerTxt: {
  width: '100%',
  fontSize: 14,
  color: '#999',
  marginVertical: 16,
  textAlign: 'center',
  textAlignVertical: 'center',
},
});

export default Home;
