import React from 'react';
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

interface CustomImageProps extends Omit<ImageProps, 'source'> {
  source: string | { uri: string } | number;
  placeholder?: string;
  showLoader?: boolean;
}

const Image: React.FC<CustomImageProps> = ({
  source,
  placeholder,
  showLoader = true,
  style,
  ...props
}) => {
  return (
    <ExpoImage
      source={source}
      placeholder={placeholder}
      style={[styles.image, style]}
      transition={200}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#F0F0F0',
  },
});

export default Image;
