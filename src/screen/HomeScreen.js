// import React, { useState, useEffect, memo } from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   Image,
//   RefreshControl,
//   Pressable,
//   VirtualizedList,
//   TouchableOpacity,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// import { RegularFont, MediumFont } from "../util/Poppins";

// import BulbIcon from "../../assets/images/ic_bulb_gray.svg";
// import StarIcon from "../../assets/images/ic_star.svg";
// import HeartIcon from "../../assets/images/ic_heart.svg";
// import UnHeartIcon from "../../assets/images/ic_unheart.svg";

// import SelectExpertIcon from "../../assets/images/ic_expert_select.svg";
// import UnSelectExpertIcon from "../../assets/images/ic_expert_unselect.svg";
// import SelectFavoriteIcon from "../../assets/images/ic_favorite_select.svg";
// import UnSelectFavoriteIcon from "../../assets/images/ic_favorite_unselect.svg";

// import { getExperts } from "../api/api";

// function HomeScreen({ navigation }) {
//   const subjects = [
//     "Math",
//     "Science",
//     "History",
//     "English",
//     "Programming",
//     "Art",
//     "Music",
//     "Geography",
//     "Economics",
//     "Philosophy",
//   ];

//   const hours = [1, 2, 3, 4, 5];

//   const ratings = [1.0, 2.1, 3.2, 4.3, 5.4];

//   const [page, setPage] = useState(1);

//   const [pageSize, setPageSize] = useState(10);

//   const [experts, setExperts] = useState([]);

//   const [loader, setLoader] = useState(false);

//   const [refreshing, setRefreshing] = useState(false);

//   const [selectedExpert, setSelectedExpert] = useState([]);

//   const generateRandomSubject = () => {
//     const randomIndex = Math.floor(Math.random() * subjects.length);
//     return subjects[randomIndex];
//   };

//   const generateRandomRating = () => {
//     const randomIndex = Math.floor(Math.random() * ratings.length);
//     return ratings[randomIndex];
//   };

//   const generateRandomHour = () => {
//     const randomIndex = Math.floor(Math.random() * hours.length);
//     return hours[randomIndex];
//   };

//   const generateRandomPrice = () => {
//     return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
//   };

//   const generateRandomReview = () => {
//     return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
//   };

//   const onSetExperts = (json) => {
//     setExperts(
//       json.results.map((item, index) => ({
//         ...item,
//         id: index,
//         subject: generateRandomSubject(),
//         price: generateRandomPrice(),
//         rating: generateRandomRating(),
//         review: generateRandomReview(),
//         hour: generateRandomHour(),
//       }))
//     );
//   };

//   useEffect(() => {
//     const fetchExperts = async () => {
//       try {
//         setRefreshing(true);
//         getExperts(pageSize)
//           .then((json) => onSetExperts(json))
//           .finally(() => setRefreshing(false));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchExperts();
//   }, []);

//   const handleHeartPress = (expert) => {
//     if (selectedExpert.includes(expert)) {
//       setSelectedExpert(selectedExpert.filter((item) => item !== expert));
//     } else {
//       setSelectedExpert([...selectedExpert, expert]);
//     }
//   };

//   const onPress = (item) => {
//     navigation.navigate("ExpertDetail", {
//       picture: item.picture.large,
//       name: item.name.first + " " + item.name.last,
//       email: item.email,
//       country: item.location.country,
//       subject: item.subject,
//       hour: item.hour,
//       review: item.review,
//       rating: item.rating,
//       price: item.price,
//     });
//   };

//   const onFetch = () => {
//     try {
//       setLoader(true);
//       setRefreshing(true);
//       getExperts(pageSize)
//         .then((json) => onSetExperts(json))
//         .finally(() => {
//           setLoader(false);
//           setRefreshing(false);
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onRefresh = () => {
//     if (!loader) {
//       setPage(1);
//       setPageSize(10);
//       onFetch();
//     }
//   };

//   const handleEndReached = () => {
//     if (!loader) {
//       setPage(page + 1);
//       setPageSize(pageSize + 10);
//       onFetch();
//     }
//   };

//   const getItem = (experts, index) => {
//     return experts[index];
//   };

//   const renderItem = ({ item }) => {
//     return <ExpertItem item={item} />;
//   };

//   const emptyList = () => (
//     <MediumFont style={{ color: "white" }}>Empty</MediumFont>
//   );

//   const separator = () => (
//     <View style={{ backgroundColor: "black", height: 5 }}></View>
//   );

//   const ExpertItem = memo(({ item }) => {
//     return (
//       <Pressable onPress={() => onPress(item)}>
//         <View style={styles.itemContainer}>
//           <Image style={styles.picture} source={{ uri: item.picture.large }} />
//           <View style={styles.centerCardContainer}>
//             <MediumFont style={styles.name}>
//               {item.id + 1} {item.name.first} {item.name.last}
//             </MediumFont>
//             <View style={styles.subjectContainer}>
//               <BulbIcon height={16} width={16} />
//               <RegularFont style={styles.subject}>{item.subject}</RegularFont>
//             </View>
//             <View style={styles.innerCenterContainer}>
//               <View style={styles.priceContainer}>
//                 <MediumFont style={styles.price}>₱{item.price}</MediumFont>
//               </View>
//               <View style={styles.ratingContainer}>
//                 <StarIcon height={16} width={16} />
//                 <MediumFont style={styles.rating}>{item.rating}</MediumFont>
//               </View>
//             </View>
//             <View style={styles.innerCenterContainer}>
//               <View style={styles.priceContainer}>
//                 <RegularFont style={styles.hourLesson}>
//                   {item.hour}-Hour Lesson
//                 </RegularFont>
//               </View>
//               <View style={styles.ratingContainer}>
//                 <RegularFont style={styles.hourLesson}>
//                   {item.review} Review
//                   {item.review !== 1 && item.review === 0 ? "s" : ""}
//                 </RegularFont>
//               </View>
//             </View>
//           </View>
//           <Pressable onPress={() => handleHeartPress(item)}>
//             {selectedExpert.includes(item) ? (
//               <HeartIcon height={25} width={25} />
//             ) : (
//               <UnHeartIcon height={25} width={25} />
//             )}
//           </Pressable>
//         </View>
//       </Pressable>
//     );
//   });

//   return (
//     <>
//       <LinearGradient colors={["#5C49DA", "#1F88D0"]} style={{ flex: 1 }}>
//         <View style={styles.cardContainer}>
//           <VirtualizedList
//             data={experts}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.email}
//             getItemCount={(experts) => experts.length}
//             ListEmptyComponent={emptyList}
//             // ItemSeparatorComponent={separator}
//             getItem={getItem}
//             onEndReached={handleEndReached}
//             // onEndReachedThreshold={0.5}
//             initialNumToRender={10}
//             // removeClippedSubviews={true}
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
//           />
//         </View>
//       </LinearGradient>
//       <View style={styles.mainCardBottomContainer}>
//         <View style={styles.cardBottomContainer}>
//           <View style={styles.cardBottomRightContainer}>
//             <TouchableOpacity
//               style={{ alignItems: "center", justifyContent: "center" }}
//             >
//               <SelectExpertIcon height={18} width={18} />
//               <RegularFont style={{ color: "blue" }}>{"Experts"}</RegularFont>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.cardBottomLeftContainer}>
//             <TouchableOpacity
//               style={{ alignItems: "center", justifyContent: "center" }}
//             >
//               <SelectFavoriteIcon height={18} width={18} />
//               <RegularFont style={{ color: "blue" }}>{"Favorites"}</RegularFont>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   cardContainer: {
//     flex: 1,
//   },
//   itemContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     marginLeft: 15,
//     marginRight: 15,
//     marginTop: 10,
//     marginBottom: 10,
//     padding: 15,
//     flex: 1,
//     flexDirection: "row",
//   },
//   centerCardContainer: {
//     flex: 1,
//     paddingRight: 10,
//     paddingLeft: 10,
//   },
//   picture: {
//     width: 70,
//     height: 70,
//     borderRadius: 5,
//   },
//   name: {
//     fontSize: 16,
//     textAlign: "left",
//     includeFontPadding: false,
//     adjustsFontSizeToFit: true,
//   },
//   subjectContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   subject: {
//     fontSize: 14,
//     color: "#A7A7A7",
//     marginLeft: 5,
//     includeFontPadding: false,
//     adjustsFontSizeToFit: true,
//   },
//   innerCenterContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   priceContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   price: {
//     fontSize: 16,
//     includeFontPadding: false,
//     adjustsFontSizeToFit: true,
//   },
//   ratingContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 5,
//   },
//   rating: {
//     fontSize: 16,
//     marginLeft: 5,
//     includeFontPadding: false,
//     adjustsFontSizeToFit: true,
//   },
//   hourLesson: {
//     fontSize: 12,
//     color: "#70757A",
//     includeFontPadding: false,
//     adjustsFontSizeToFit: true,
//   },
//   mainCardBottomContainer: {
//     height: "10%",
//     backgroundColor: "white",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   cardBottomContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   cardBottomRightContainer: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cardBottomLeftContainer: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default HomeScreen;

/////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect, memo } from 'react';
// import { View, Pressable, Text } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// import * as Font from "expo-font";

// function HomeScreen() {

//   const [fontLoaded, setFontLoaded] = useState(false);

//   useEffect(() => {
//     const loadFont = async () => {
//       try {
//         await Font.loadAsync({
//           "poppins-medium": require("../../assets/fonts/poppins_medium.ttf"),
//         });
//         setFontLoaded(true);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     loadFont();
//   }, []);

//   if (!fontLoaded) {
//     return null;
//   }

//   const [selectedDate, setSelectedDate] = useState('');

//   const getDate = (date) => {
//     const previousMonth = new Date().getMonth()
//     const currentMonth = new Date().getMonth() + 1
//     const nextMonth = new Date().getMonth() + 2

//     console.log('current month -> ' +  currentMonth + ' | next month -> ' + nextMonth + ' | previous month -> ' + previousMonth)

//     console.log('year -> ' +  date.year + ' | month -> ' + date.month + ' | day -> ' + date.day)

//     return date.year + '-' + date.month + '-' + date.day;
//   }

//   const dayComponent = ({ date, state }) => {
//     return <DayComponent date={date} state={state} />;
//   };

//   const DayComponent = memo(({ date, state }) => {
//     return (
//       <Pressable onPress={() => setSelectedDate(getDate(date))}>
//         <View style={{borderColor: selectedDate === getDate(date) ? 'blue' : '#BEBEBE', borderWidth: 1, borderRadius: 5, width: 40, height: 40}}>
//           <Text style={{textAlign: 'center', color: state === 'disabled' ? '#BEBEBE' : '#000000'}}>{date.day}</Text>
//         </View>
//       </Pressable>
//     );
//   });

//   return (
//     <>
//       <Calendar
//         theme={{
//           // backgroundColor: '#ffffff',
//           // calendarBackground: '#ffffff',
//           // textSectionTitleColor: '#b6c1cd',
//           // textSectionTitleDisabledColor: '#d9e1e8',
//           // selectedDayBackgroundColor: '#00adf5',
//           // selectedDayTextColor: '#ffffff',
//           // todayTextColor: '#00adf5',
//           // dayTextColor: '#2d4150',
//           // textDisabledColor: '#d9e1e8',
//           // dotColor: '#00adf5',
//           // selectedDotColor: '#ffffff',
//           arrowColor: '#000000',
//           // disabledArrowColor: '#d9e1e8',
//           // monthTextColor: 'blue',
//           // indicatorColor: 'blue',
//           textDayFontFamily: 'poppins-medium',
//           textMonthFontFamily: 'poppins-medium',
//           textDayHeaderFontFamily: 'poppins-medium',
//           // textDayFontWeight: '300',
//           // textMonthFontWeight: 'bold',
//           // textDayHeaderFontWeight: '300',
//           // textDayFontSize: 16,
//           // textMonthFontSize: 16,
//           // textDayHeaderFontSize: 16
//           'stylesheet.calendar.header': {
//             dayTextAtIndex0: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             },
//             dayTextAtIndex1: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             },
//             dayTextAtIndex2: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             },
//             dayTextAtIndex3: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             },
//             dayTextAtIndex4: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             },
//             dayTextAtIndex5: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             },
//             dayTextAtIndex6: {
//               textTransform: 'uppercase',
//               color: '#949494',
//             }
//           }
//         }}
//         dayComponent={dayComponent}
//       />
//     </>
//   );
// };

// export default HomeScreen;

/////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";

import * as Font from "expo-font";

function HomeScreen() {
  // const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
  // const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
  // const workout = { key: "workout", color: "green" };

  const vacation = { key: "vacation", color: "red", selectedDotColor: "red" };
  const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
  const workout = { key: "workout", color: "green", selectedDotColor: "green"};

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

  return (
    <Calendar
      style={{
        height: 350
      }}
      theme={{
          // backgroundColor: '#ffffff',
          // calendarBackground: '#ffffff',
          // textSectionTitleColor: '#b6c1cd',
          // textSectionTitleDisabledColor: '#d9e1e8',
          // selectedDayBackgroundColor: '#00adf5',
          // selectedDayTextColor: '#ffffff',
          // todayTextColor: '#00adf5',
          // dayTextColor: '#2d4150',
          // textDisabledColor: '#d9e1e8',
          // dotColor: '#00adf5',
          // selectedDotColor: '#ffffff',
          arrowColor: '#000000',
          // disabledArrowColor: '#d9e1e8',
          // monthTextColor: 'blue',
          // indicatorColor: 'blue',
          textDayFontFamily: 'poppins-medium',
          textMonthFontFamily: 'poppins-medium',
          textDayHeaderFontFamily: 'poppins-medium',
          // textDayFontWeight: '300',
          // textMonthFontWeight: 'bold',
          // textDayHeaderFontWeight: '300',
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              textTransform: 'uppercase',
              color: '#949494',
            },
            dayTextAtIndex1: {
              textTransform: 'uppercase',
              color: '#949494',
            },
            dayTextAtIndex2: {
              textTransform: 'uppercase',
              color: '#949494',
            },
            dayTextAtIndex3: {
              textTransform: 'uppercase',
              color: '#949494',
            },
            dayTextAtIndex4: {
              textTransform: 'uppercase',
              color: '#949494',
            },
            dayTextAtIndex5: {
              textTransform: 'uppercase',
              color: '#949494',
            },
            dayTextAtIndex6: {
              textTransform: 'uppercase',
              color: '#949494',
            }
          }
      }}
      markingType={"multi-dot"}
      markedDates={{
        "2023-03-01": {
          dots: [vacation, massage, workout],
        },
        "2023-03-02": { 
          dots: [massage, workout] 
        },
        "2023-03-25": {
          dots: [vacation, massage, workout],
        },
      }}
    />
  );
}

export default HomeScreen;
