import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';

const detec1 = require("../cleaned-assets/carousel/detec1.png");
const detec2 = require("../cleaned-assets/carousel/detec2.png");
const detec3 = require("../cleaned-assets/carousel/detec3.png");
const detec4 = require("../cleaned-assets/carousel/detec4.png");
const detec5 = require("../cleaned-assets/carousel/detec5.png");
const detec6 = require("../cleaned-assets/carousel/detec6.png");
const detec7 = require("../cleaned-assets/carousel/detec7.png");
const detec8 = require("../cleaned-assets/carousel/detec8.png");
const detec9 = require("../cleaned-assets/carousel/detec9.png");
const detec10 = require("../cleaned-assets/carousel/detec10.png");
const detec11 = require("../cleaned-assets/carousel/detec11.png");
const kebosLogo = require("../cleaned-assets/kebosLogo.png");

const { width } = Dimensions.get('window');
const height = 400;

export default function Carousel2() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    kebosLogo, detec1, detec2, detec3, detec4, detec5,
    detec6, detec7, detec8, detec9, detec10, detec11
  ];

  // Scroll automático
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 30 }}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ width }}   // 🔥 garante alinhamento certinho
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={item}
              resizeMode="contain"
              style={{
                width: width * 0.8,
                height: height
              }}
            />
          </View>
        )}
        getItemLayout={(_, index) => (
          { length: width, offset: width * index, index }
        )}
      />

    </View>
  );
}
