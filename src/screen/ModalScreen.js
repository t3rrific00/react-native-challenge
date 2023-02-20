import React from "react";
import { Modal, View, StyleSheet } from "react-native";

import { RegularFont, MediumFont } from "../util/Poppins";

import CheckIcon from "../../assets/images/ic_check.svg";

import ConfettiCannon from "react-native-confetti-cannon";

const ModalScreen = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <MediumFont style={styles.title}>THANK YOU!</MediumFont>
          <CheckIcon style={styles.check} height={150} width={150} />
          <RegularFont style={styles.message}>
            Your booking has been confirmed
          </RegularFont>
          <ConfettiCannon
            flex={1}
            count={100}
            origin={{ x: -40, y: 0 }}
            explosionSpeed={350}
            fallSpeed={5000}
            fadeOut={true}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "black",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  check: {
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "black",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
});

export default ModalScreen;
