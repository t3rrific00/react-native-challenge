import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MediumFont } from "../util/Poppins";

function Header({
  leftIcon,
  rightIcon,
  onPressRightIcon,
  children,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <Pressable onPress={() => navigation.goBack()}>{leftIcon}</Pressable>
      <MediumFont style={styles.title}>{children}</MediumFont>
      <Pressable onPress={() => onPressRightIcon != "search" ? nav.goBack() : nav.goBack() }>{rightIcon}</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightIcon: {
    flex: 1,
    height: 24,
    width: 24,
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  LeftIcon: {
    flex: 1,
    height: 24,
    width: 24,
    marginRight: 10,
  },
});

export default Header;
