import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import Line from "../utils/line";

const todaysTT = [
  { id: 1, sub: "English", time: "1pm", teacher: "Gaurav" },
  { id: 2, sub: "Maths", time: "1pm", teacher: "Gaurav" },
  { id: 3, sub: "Physics", time: "1pm", teacher: "Gaurav" },
  { id: 3, sub: "Chem", time: "2pm", teacher: "Gaurav" },
];

const tomTT = [
  { sub: "English", time: "1pm", teacher: "Gaurav" },
  { sub: "Physics", time: "1pm", teacher: "Gaurav" },
  { sub: "Maths", time: "1pm", teacher: "Gaurav" },
];

export default function Student() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> For students</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyHead}> Today's Schedule</Text>
        <View style={styles.timeTable}>
          {todaysTT.map((obj) => {
            return (
              <Text style={styles.ttText}>
                <Text style={styles.info}>{obj.sub} </Text>
                <Text style={styles.info}>{obj.teacher} </Text>
                <Text style={styles.info}>{obj.time}</Text>
              </Text>
            );
          })}
        </View>
        <Line width="90%"></Line>
        <Text style={styles.bodyHead}> Tomorrow's Schedule</Text>
        <View style={styles.timeTable}>
          {tomTT.map((obj) => {
            return (
              <Text style={styles.ttText}>
                <Text style={styles.info}>{obj.sub} </Text>
                <Text style={styles.info}>{obj.teacher} </Text>
                <Text style={styles.info}>{obj.time}</Text>
              </Text>
            );
          })}
        </View>
        <Line width="90%"></Line>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textHead}>Week's TT</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#293241",
    width: "100%",
    height: "10%",
  },
  textHead: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "#fff",
  },
  body: {
    alignItems: "flex-start",
    width: "100%",
    height: "82%",
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
  },
  info: {
    width: "33%",
    textAlign: "center",
    borderColor: "white",
  },
  bodyHead: {
    color: "#293241",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
  },
  timeTable: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  ttText: {
    //justifyContent: "center",
    height: 45,
    textAlign: "center",
    backgroundColor: "#293241",
    color: "#fff",
    width: "100%",
    fontSize: 18,
    borderRadius: 5,
    marginTop: 10,
  },
  footer: {
    backgroundColor: "#293241",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "8%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
