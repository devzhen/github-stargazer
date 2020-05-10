import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IS_IPHONE_X } from '@helpers/deviceInfoHelper';

interface FooterProps {
  children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingHorizontal: 46,
    marginBottom: IS_IPHONE_X ? 100 : 80,
    marginTop: 20,
  },
});

export default Footer;
