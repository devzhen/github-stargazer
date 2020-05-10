import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Theme from '@theme/index';

interface SideMenuProps {
  navigation: any;
}

const SideMenu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Availability</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Main Menu</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: Theme.colors.concrete,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 84,
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 22,
  },
  headerText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    color: Theme.colors.silverChalice,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 19,
    marginBottom: 22,
    marginLeft: 14,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    color: Theme.colors.silverChalice,
  },
  row: {
    width: '100%',
    paddingLeft: 14,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowImage: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  rowText: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '700',
    color: Theme.colors.mineShaft,
  },
});

export default SideMenu;
