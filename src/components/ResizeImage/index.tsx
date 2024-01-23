import React, { useEffect, useState } from "react";
import { Image, Dimensions } from 'react-native';

type Props = {
    uri: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WIDTH =  (SCREEN_WIDTH - 18) / 2;

export default ({ uri }: Props) => {

    const [height, setHeight] = useState<number>(200);

    useEffect(() => {
        Image.getSize(uri, (width: number, height: number) => {
            const showHeight = WIDTH * height / width;
            setHeight(showHeight);
        })
    }, [uri]);

    return (
        <Image
            style={{
                width: WIDTH,
                height: height,
                resizeMode: 'cover',
            }}
            source={{ uri: uri }}
        />
    );
}