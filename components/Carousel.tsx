import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const { width } = Dimensions.get('window');
const height = 285;
const imageWidth = 815;
const imageHeight = 285;
const STORAGE_KEY = '@downloaded_images';

export default function Carousel() {
  const [images, setImages] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const { isConnected } = await NetInfo.fetch();
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const cached = stored ? JSON.parse(stored) : {};

      try {
        const response = await axios.get("https://r5u2xdj485.execute-api.us-east-1.amazonaws.com/api-get-images/get-images");
        const urls: string[] = JSON.parse(response.data.body).slice(1);

        const displayUris: string[] = [];
        const updatedCache: Record<string, string> = { ...cached };

        await Promise.all(
          urls.map(async (url) => {
            if (typeof url !== 'string') return;

            const filename = (url.split('/').pop() || '').split('?')[0];
            const localPath = `${FileSystem.documentDirectory}${filename}`;
            const fileInfo = await FileSystem.getInfoAsync(localPath);

            if (fileInfo.exists) {
              displayUris.push(localPath);
              updatedCache[url] = localPath;
            } else {
              displayUris.push(url);
              if (isConnected) {
                try {
                  const downloadResumable = FileSystem.createDownloadResumable(url, localPath);
                  await downloadResumable.downloadAsync();
                  updatedCache[url] = localPath;
                } catch (err) {
                  console.error(`Erro ao baixar imagem ${url}:`, err);
                }
              }
            }
          })
        );

        setImages(displayUris);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCache));

      } catch (err) {
        console.error("Erro ao buscar imagens:", err);
        if (Object.values(cached).length > 0) {
          setImages(Object.values(cached));
        }
      }
    };

    loadImages();
  }, []);

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });

    if (nextIndex === images.length) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: 0, animated: false });
        setCurrentIndex(0);
      }, 300);
    }
  };

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const extendedImages = images.length <= 1 ? [...images] : [...images, ...images];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        horizontal
        ref={scrollRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ width, marginTop: 30 }}
        contentContainerStyle={{
          width: extendedImages.length * imageWidth,
          height: height,
        }}
      >
        {extendedImages.map((uri: string, idx: number) => (
          <View
            key={idx}
            style={{
              width, // largura da tela
              height: imageHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri }}
              style={{
                width: imageWidth,
                height: imageHeight,
                transform: [{ scale: 0.3 }],
              }}
              resizeMode="cover"
            />
          </View>
        ))}

      </ScrollView>
    </View>
  );
}
