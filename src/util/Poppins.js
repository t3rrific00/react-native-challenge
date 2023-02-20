import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import * as Font from "expo-font";

const RegularFont = ({ children, style }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          "poppins-regular": require("../../assets/fonts/poppins_regular.ttf"),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return <Text style={[styles.textRegular, style]}>{children}</Text>;
};

const MediumFont = ({ children, style }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          "poppins-medium": require("../../assets/fonts/poppins_medium.ttf"),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return <Text style={[styles.textMedium, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  textRegular: {
    fontFamily: "poppins-regular",
  },
  textMedium: {
    fontFamily: "poppins-medium",
  },
});

export { RegularFont, MediumFont };
