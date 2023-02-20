import React, { useState, useEffect, memo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
  Pressable,
  VirtualizedList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { RegularFont, MediumFont } from "../util/Poppins";

import MenuIcon from "../../assets/images/ic_menu.svg";
import SearchIcon from "../../assets/images/ic_search.svg";
import BulbIcon from "../../assets/images/ic_bulb_gray.svg";
import StarIcon from "../../assets/images/ic_star.svg";
import HeartIcon from "../../assets/images/ic_heart.svg";
import UnHeartIcon from "../../assets/images/ic_unheart.svg";

import SelectExpertIcon from "../../assets/images/ic_expert_select.svg";
import UnSelectExpertIcon from "../../assets/images/ic_expert_unselect.svg";
import SelectFavoriteIcon from "../../assets/images/ic_favorite_select.svg";
import UnSelectFavoriteIcon from "../../assets/images/ic_favorite_unselect.svg";

import { getExperts } from "../api/api";

function HomeScreen({ navigation }) {

  const subjects = [
    "Math",
    "Science",
    "History",
    "English",
    "Programming",
    "Art",
    "Music",
    "Geography",
    "Economics",
    "Philosophy",
  ];

  const hours = [1, 2, 3, 4, 5];

  const ratings = [1.0, 2.1, 3.2, 4.3, 5.4];

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [experts, setExperts] = useState([]);

  const [loader, setLoader] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedExpert, setSelectedExpert] = useState([]);

  const generateRandomSubject = () => {
    const randomIndex = Math.floor(Math.random() * subjects.length);
    return subjects[randomIndex];
  };

  const generateRandomRating = () => {
    const randomIndex = Math.floor(Math.random() * ratings.length);
    return ratings[randomIndex];
  };

  const generateRandomHour = () => {
    const randomIndex = Math.floor(Math.random() * hours.length);
    return hours[randomIndex];
  };

  const generateRandomPrice = () => {
    return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  };

  const generateRandomReview = () => {
    return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  };

  const onSetExperts = (json) => {
    setExperts(
      json.results.map((item, index) => ({
        ...item,
        id: index,
        subject: generateRandomSubject(),
        price: generateRandomPrice(),
        rating: generateRandomRating(),
        review: generateRandomReview(),
        hour: generateRandomHour(),
      }))
    );
  }

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setRefreshing(true);
        getExperts(pageSize)
          .then((json) => {
            onSetExperts(json)
          })
          .finally(() => setRefreshing(false));
      } catch (error) {
        console.error(error);
      }
    };
    fetchExperts();
  }, []);

  const handleHeartPress = (expert) => {
    if (selectedExpert.includes(expert)) {
      setSelectedExpert(selectedExpert.filter((item) => item !== expert));
    } else {
      setSelectedExpert([...selectedExpert, expert]);
    }
  };

  const onPress = (item) => {
    navigation.navigate("DetailScreen", {
      picture: item.picture.large,
      name: item.name.first + " " + item.name.last,
      email: item.email,
      country: item.location.country,
      subject: item.subject,
      hour: item.hour,
      review: item.review,
      rating: item.rating,
      price: item.price,
    });
  };

  const onFetch = () => {
    try {
      setLoader(true)
      setRefreshing(true);
      getExperts(pageSize)
        .then((json) => {
          onSetExperts(json)
        })
        .finally(() => {
          setLoader(false)
          setRefreshing(false)
        });
    } catch (error) {
      console.error(error);
    }
  }

  const onRefresh = () => {
    if(!loader) {
      setPage(1)
      setPageSize(10)
      onFetch()
    }
  };

  const handleEndReached = () => {
    if(!loader) {
      setPage(page + 1)
      setPageSize(pageSize + 10)
      onFetch()
    }
  };

  const getItem = (experts, index) => {
    return experts[index];
  };
  
  const renderItem = ({ item }) => {
    return <ExpertItem item={item} />;
  };

  const emptyList = () => <MediumFont style={{color: 'white'}}>Empty</MediumFont>

  const separator = () => <View style={{backgroundColor: 'black', height: 5}}></View>

  const ExpertItem = memo(({ item }) => {
    return (
    <Pressable onPress={() => onPress(item)}>
      <View style={styles.itemContainer}>
        <Image
          style={styles.picture}
          source={{ uri: item.picture.large }}
        />
        <View style={styles.centerCardContainer}>
          <MediumFont style={styles.name}>
            {item.id + 1} {item.name.first} {item.name.last}
          </MediumFont>
          <View style={styles.subjectContainer}>
            <BulbIcon height={16} width={16} />
            <RegularFont style={styles.subject}>
              {item.subject}
            </RegularFont>
          </View>
          <View style={styles.innerCenterContainer}>
            <View style={styles.priceContainer}>
              <MediumFont style={styles.price}>
                ₱{item.price}
              </MediumFont>
            </View>
            <View style={styles.ratingContainer}>
              <StarIcon height={16} width={16} />
              <MediumFont style={styles.rating}>
                {item.rating}
              </MediumFont>
            </View>
          </View>
            <View style={styles.innerCenterContainer}>
              <View style={styles.priceContainer}>
                <RegularFont style={styles.hourLesson}>
                  {item.hour}-Hour Lesson
                </RegularFont>
              </View>
              <View style={styles.ratingContainer}>
                <RegularFont style={styles.hourLesson}>
                  {item.review} Review
                  {item.review !== 1 && item.review === 0 ? "s" : ""}
                </RegularFont>
              </View>
              </View>
        </View>
        <Pressable onPress={() => handleHeartPress(item)}>
          {selectedExpert.includes(item) ? (
          <HeartIcon height={25} width={25} />
          ) : (
            <UnHeartIcon height={25} width={25} />
          )}
        </Pressable>
      </View>
    </Pressable>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <View style={[styles.container]}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <MenuIcon/>
          </Pressable>
          <MediumFont style={styles.title}>{"Home"}</MediumFont>
          <Pressable onPress={() => navigation.openDrawer()}>
            <SearchIcon/>
          </Pressable>
        </View>

        <LinearGradient colors={["#5C49DA", "#1F88D0"]} style={{ flex: 1 }}>
          <View style={styles.cardContainer}>
            <VirtualizedList
              data={experts}
              renderItem={renderItem}
              keyExtractor={(item) => item.email}
              getItemCount={experts => experts.length}
              ListEmptyComponent={emptyList}
              // ItemSeparatorComponent={separator}
              getItem={getItem}
              onEndReached={handleEndReached}
              // onEndReachedThreshold={0.5}
              initialNumToRender={10}
              // removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </LinearGradient>
        <View style={styles.mainCardBottomContainer}>
          <View style={styles.cardBottomContainer}>
            <View style={styles.cardBottomRightContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                <SelectExpertIcon height={18} width={18} />
                <RegularFont style={{ color: 'blue' }}>{"Experts"}</RegularFont>
              </TouchableOpacity>
            </View>
            <View style={styles.cardBottomLeftContainer}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                <SelectFavoriteIcon height={18} width={18} />
                <RegularFont style={{ color: 'blue' }}>{"Favorites"}</RegularFont>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: 'white',
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
  cardContainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    flex: 1,
    flexDirection: "row",
  },
  centerCardContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  picture: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    textAlign: "left",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  subjectContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  subject: {
    fontSize: 14,
    color: "#A7A7A7",
    marginLeft: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  innerCenterContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  hourLesson: {
    fontSize: 12,
    color: "#70757A",
    includeFontPadding: false,
    adjustsFontSizeToFit: true,
  },
  mainCardBottomContainer: {
    height: "10%",
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardBottomContainer: {
    flex: 1,
    flexDirection: "row",
  },
  cardBottomRightContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottomLeftContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;