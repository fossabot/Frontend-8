import React, { useCallback, useContext, useState } from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/core";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Alert from "react-native-awesome-alerts";
import { PreferencesContext } from "../Contexts/PreferencesContext";
import LessonPanel from "../Components/Home/LessonPanel";
import { rgba } from "polished";
import { Statistics } from "../Functions/Api/Statistics";
import { useNewWindowDimensions } from "../Functions/global/WindowDimensions";

const LearnPage = () => {
  const windowSize = useNewWindowDimensions();

  const theme = useTheme();

  const { updateLearnedLessons, learnedLessons } =
    useContext(PreferencesContext);

  const [areLessonsLoaded, setLessonsLoaded] = useState(false);

  const [learnHelpVisible, setLearnHelpVisible] = useState(false);
  const showLearnHelp = () => setLearnHelpVisible(true);
  const hideLearnHelp = () => setLearnHelpVisible(false);

  useFocusEffect(
    useCallback(() => {
      // This determines what lessons the user has learned and conditionally displays everything.
      async function getUserLearnedLessons() {
        await Statistics.getLearnedLessons().then((lessons: any) => {
          if (lessons !== null) {
            // prevent the infinite loop
            if (learnedLessons != lessons && !areLessonsLoaded) {
              updateLearnedLessons(lessons);
            }

            setLessonsLoaded(true);
          } else {
            console.log("User has not learned any lessons!");
            setLessonsLoaded(true);
          }
        });
      }
      getUserLearnedLessons();
    }, [learnedLessons])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ width: windowSize.width, height: windowSize.height }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 50,
                  lineHeight: 50,
                  fontWeight: "bold",
                }}
              >
                Learn{" "}
                <Text style={{ color: theme.colors.onBackground }}>
                  new strategies
                </Text>
              </Text>
              <Pressable
                onPress={() => showLearnHelp()}
                style={{ alignSelf: "flex-start" }}
              >
                <Text
                  style={{
                    color: theme.colors.onBackground,
                    lineHeight: 16,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  ?
                </Text>
              </Pressable>
            </View>
            <View style={{ alignItems: "center", alignSelf: "center" }}>
              {areLessonsLoaded ? (
                <LessonPanel />
              ) : (
                <ActivityIndicator
                  animating={true}
                  color={theme.colors.primary}
                />
              )}
            </View>
          </View>
        </View>
        <Alert
          show={learnHelpVisible}
          title="Learning Help"
          message={
            `Select a strategy to learn by clicking on the lesson button that is not greyed out.\n\n` +
            `Lessons ensure that you will not encounter Sudoku puzzles with strategies you are unfamiliar with.\n\n` +
            `As you learn, more features of the app will be unlocked!\n\n` +
            `Lessons can only be completed in a set order, from left to right, top to bottom. \n\n` +
            `Strategies you have already learned will be greyed out, but you will still have access to them.`
          }
          messageStyle={{ maxWidth: 500 }}
          alertContainerStyle={{
            backgroundColor: rgba(theme.colors.background, 0.3),
          }}
          showConfirmButton={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          confirmText={"OK"}
          confirmButtonColor={theme.colors.primary}
          onConfirmPressed={() => {
            hideLearnHelp();
          }}
          overlayStyle={{ backgroundColor: "transparent" }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LearnPage;
