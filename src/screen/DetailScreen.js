import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { RegularFont, MediumFont } from "../util/Poppins";

import PinIcon from "../../assets/images/ic_pin.svg";
import BulbIcon from "../../assets/images/ic_bulb_white.svg";
import StarIcon from "../../assets/images/ic_star.svg";

import ModalScreen from "../screen/ModalScreen";

function DetailScreen({ route }) {
  const [booked, setBooked] = useState(false);

  const [visible, setVisible] = useState(false);

  const [bookingLoaded, setBookingLoaded] = useState(false);

  const {
    email,
    picture,
    name,
    country,
    subject,
    hour,
    rating,
    review,
    price,
  } = route.params;

  const onLoadBooking = () => {
    setBookingLoaded(true);
    setTimeout(() => {
      booked === true ? setVisible(false) : setVisible(true);
      setBookingLoaded(false);
      onCloseModal();
    }, 5000);
  };

  const onCloseModal = () => {
    setTimeout(() => {
      setVisible(false);
      setBooked(true);
    }, 6000);
  };

  return (
    <>
      <LinearGradient colors={["#5C49DA", "#1F88D0"]} style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <Image style={styles.picture} source={{ uri: picture }} />
          <MediumFont style={styles.name}>{name}</MediumFont>
          <RegularFont style={styles.email}>{email}</RegularFont>
          <View style={styles.innerCenterContainer}>
            <View style={styles.countryContainer}>
              <PinIcon height={18} width={18} />
              <RegularFont style={styles.country}>{country}</RegularFont>
            </View>
            <View style={styles.subjectContainer}>
              <BulbIcon height={18} width={18} />
              <RegularFont style={styles.subject}>{subject}</RegularFont>
            </View>
            <View style={styles.cardCenterContainer}>
              <MediumFont style={styles.about}>{"About the tutor"}</MediumFont>
              <ScrollView showsVerticalScrollIndicator={false}>
                <RegularFont style={styles.content}>
                  {
                    "Vestibulum nec vehicula magna. Curabitur volutpat porta nulla, vel mattis quam consequat eget. Sed ornare massa ut mi gravida tincidunt. Ut finibus et orci sit amet luctus. Vestibulum felis sem, porttitor vitae porta eget, accumsan quis nibh. In faucibus neque at ultricies vehicula. Sed finibus tellus sit amet semper vehicula. Nam tempor, magna tincidunt rhoncus porttitor, enim mi mollis felis, ac lobortis quam nisi et odio. Praesent feugiat sagittis ullamcorper. Suspendisse potenti. Aliquam sed interdum ante. Nulla orci elit, commodo eget felis sit amet, malesuada accumsan tellus. Vivamus molestie commodo enim commodo fermentum. Fusce mattis rhoncus lectus ac tempus. Etiam metus diam, ullamcorper vitae luctus et, sagittis eu elit. Curabitur sodales semper vulputate. Phasellus eu fringilla dui. Duis semper sodales imperdiet. Maecenas maximus dignissim mauris ut pretium. In fringilla, nisi ut pharetra rhoncus, leo diam aliquet ligula, sed sodales nunc tortor sed neque. Integer id nisl in nisl accumsan ultrices sed mollis mi. Nulla lobortis, lorem eu hendrerit sodales, erat quam tristique urna, eget hendrerit leo tellus sit amet augue. Nunc imperdiet eros at vestibulum ultrices. Aliquam erat volutpat. Nullam aliquet id est in congue. Phasellus rutrum eget velit in ullamcorper. Nulla purus dui, varius eu convallis non, hendrerit et ligula. Maecenas sapien velit, vehicula in accumsan eu, pellentesque eu erat. Praesent rutrum accumsan nulla, a tempor felis. Phasellus et eros ullamcorper ipsum congue porttitor. Aliquam ut eros maximus lorem tincidunt pulvinar. Sed ac nulla id ipsum fringilla condimentum ac sit amet orci. Duis nec vestibulum magna, vitae rutrum eros. In non cursus tellus. Phasellus at neque nec erat sodales varius. Cras egestas sapien diam, non laoreet erat dapibus ut. Pellentesque imperdiet accumsan velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  }
                </RegularFont>
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.mainCardBottomContainer}>
          <View style={styles.cardBottomContainer}>
            <View>
              <View
                style={styles.cardContentContainer}
                marginRight={30}
                marginBottom={5}
              >
                <MediumFont style={styles.price}>₱{price}</MediumFont>
              </View>
              <View style={styles.cardContentContainer} marginRight={30}>
                <RegularFont style={styles.hourLesson}>
                  {hour}-Hour Lesson
                </RegularFont>
              </View>
            </View>
            <View>
              <View style={styles.cardContentContainer} marginBottom={5}>
                <StarIcon height={18} width={18} />
                <MediumFont style={styles.rating}>{rating}</MediumFont>
              </View>
              <View style={styles.cardContentContainer}>
                <RegularFont style={styles.review}>
                  {review} Review{review !== 1 ? "s" : ""}
                </RegularFont>
              </View>
            </View>
          </View>

          <Pressable
            disable={booked === true ? false : true}
            onPress={() => (booked !== true ? onLoadBooking() : "")}
          >
            <View
              style={styles.buttonContainer}
              backgroundColor={booked === true ? "#DD8859" : "#76DD59"}
            >
              <MediumFont style={styles.buttonText}>
                {booked === true ? "Booked" : "Book a session"}
              </MediumFont>
            </View>
          </Pressable>

          <ActivityIndicator
            size="small"
            color="#0000ff"
            animating={bookingLoaded}
          />

          <ModalScreen visible={visible} />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  email: {
    fontSize: 13,
    color: "#BDBDBD",
    marginBottom: 10,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  innerCenterContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  country: {
    fontSize: 13,
    color: "white",
    marginLeft: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  subjectContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subject: {
    fontSize: 14,
    color: "white",
    marginLeft: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  cardCenterContainer: {
    flexDirection: "column",
    height: "80%",
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  about: {
    fontSize: 14,
    marginBottom: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  content: {
    fontSize: 13,
    marginRight: 5,
    marginLeft: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  mainCardBottomContainer: {
    height: "20%",
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardBottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContentContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  price: {
    fontSize: 16,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  hourLesson: {
    fontSize: 12,
    color: "#BDBDBD",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  review: {
    fontSize: 12,
    color: "#BDBDBD",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
});

export default DetailScreen;
