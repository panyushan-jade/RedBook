import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Dimensions,TouchableOpacity,Text} from 'react-native';
import Swiper from 'react-native-swiper';
import Mock from 'mockjs';

import icon_arrow from '@src/assets/icon_arrow.png';
import icon_share from '@src/assets/icon_share.png';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const generateRandomImage = () => {
  const width = Mock.Random.integer(200, 600);
  const height = Mock.Random.integer(200, 400);
  return `https://picsum.photos/${width}/${height}`;
};

const fetchData = () => {
  const mockData = Mock.mock({
    id: '@id',
    title: '@ctitle(5, 10)',
    'image|3-5': [
      {
        url: () => generateRandomImage(),
      },
    ],
    avatarUrl: () => generateRandomImage(),
    description: '@cparagraph(1, 3)',
    author: '@cname',
    date: '@date("yyyy-MM-dd")',
  });
  return mockData;
};

function ArticleDetail(): JSX.Element {
  const [detail, setDetail] = useState<any>({});

  useEffect(() => {
    const data = fetchData();
    setDetail(data);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.backButton}
                    // onPress={() => navigation.pop()}
                >
                    <Image style={styles.backImg} source={icon_arrow} />
                </TouchableOpacity>
                {detail.avatarUrl && <Image style={styles.avatarImg} source={{uri: detail.avatarUrl}} />}
                <Text style={styles.userNameTxt}>Jay丶</Text>
                <Text style={styles.followTxt}>关注</Text>
                <Image style={styles.shareImg} source={icon_share} />
            </View>
      {detail?.image && (
        <Swiper containerStyle={styles.containerStyle} activeDotColor="#ff2442">
          {detail?.image?.map((d: any) => {
            return (
              <Image style={styles.image} key={d.url} source={{uri: d.url}} />
            );
          })}
        </Swiper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
    resizeMode: 'cover',
  },
  containerStyle: {
    flex: 0,
    height: 400,
  },
  backButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  titleLayout: {
    width: '100%',
    height: 56,
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
},
backImg: {
  width: 20,
  height: 20,
},
avatarImg: {
  width: 40,
  height: 40,
  resizeMode: 'cover',
  borderRadius: 20,
},
userNameTxt: {
  fontSize: 15,
  flex: 1,
  color: '#333',
  marginLeft: 16,
},
followTxt: {
  paddingHorizontal: 16,
  height: 30,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: '#ff2442',
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 12,
  color: '#ff2442',
},
shareImg: {
  width: 28,
  height: 28,
  marginHorizontal: 16,
},
});

export default ArticleDetail;
