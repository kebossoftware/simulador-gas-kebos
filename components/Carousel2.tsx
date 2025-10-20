import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, FlatList, ListRenderItemInfo, Image as RNImage } from "react-native";
import { Image } from "expo-image";
import ImageResizer from "react-native-image-resizer";

// Importando imagens
const images = [
  require("../cleaned-assets/kebosLogo.png"),
  require("../cleaned-assets/carousel/detec1.png"),
  require("../cleaned-assets/carousel/detec2.png"),
  require("../cleaned-assets/carousel/detec3.png"),
  require("../cleaned-assets/carousel/detec4.png"),
  require("../cleaned-assets/carousel/detec5.png"),
  require("../cleaned-assets/carousel/detec6.png"),
  require("../cleaned-assets/carousel/detec7.png"),
  require("../cleaned-assets/carousel/detec8.png"),
  require("../cleaned-assets/carousel/detec9.png"),
  require("../cleaned-assets/carousel/detec10.png"),
  require("../cleaned-assets/carousel/detec11.png"),
];

type FlatListItem = string;

const { width } = Dimensions.get("window");
const height = 300;

export default function Carousel2() {
  const flatListRef = useRef<FlatList<FlatListItem>>(null);
  const [optimizedImages, setOptimizedImages] = useState<FlatListItem[]>([]);
  const currentIndexRef = useRef(0);

  // 🔹 Redimensiona imagens ao montar
  useEffect(() => {
    async function resizeImages() {
      const resized: FlatListItem[] = [];

      for (const img of images) {
        try {
          // Pega o URI da imagem local
          const uri = RNImage.resolveAssetSource(img).uri;

          // Redimensiona
          const result = await ImageResizer.createResizedImage(
            uri,
            800, // largura máxima
            600, // altura máxima
            "WEBP", // formato leve
            80 // qualidade
          );

          resized.push(result.uri);
        } catch (err) {
          console.warn("Erro redimensionando imagem:", err);
          resized.push(RNImage.resolveAssetSource(img).uri);
        }
      }

      setOptimizedImages(resized);
    }

    resizeImages();
  }, []);

  // 🔹 Carrossel automático
  useEffect(() => {
    if (optimizedImages.length === 0) return;

    const interval = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % optimizedImages.length;

      flatListRef.current?.scrollToIndex({
        index: currentIndexRef.current,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [optimizedImages]);

  // 🔹 Renderiza cada item
  const renderItem = ({ item }: ListRenderItemInfo<FlatListItem>) => (
    <View
      style={{
        width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item }}
        style={{
          width: width * 0.8,
          height,
          borderRadius: 10,
        }}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={300}
      />
    </View>
  );

  // 🔹 Placeholder enquanto carrega
  if (optimizedImages.length === 0) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  // 🔹 Carrossel principal
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ref={flatListRef}
        data={optimizedImages}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={2}
        keyExtractor={(_, idx) => idx.toString()}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={renderItem}
      />
    </View>
  );
}
