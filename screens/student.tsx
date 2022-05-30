import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { getCurrentTemplate } from "../controllers/timeTableApi";
import TimeTableRow from "../Interfaces/timeTable";
import Line from "../utils/line";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function Student(props: any) {
  const [tomTT, setTomTT] = useState([]);
  const [todaysTT, setTodaysTT] = useState([]);

  const d = new Date();
  let today = weekday[d.getDay()];
  let tomorrow = weekday[(d.getDay() + 1) % 7];
  const { tableId } = props.route.params;
  useEffect(() => {
    getCurrentTemplate(tableId, (data) => {
      const timeTable = data.data;
      setTomTT(timeTable[tomorrow]);
      setTodaysTT(timeTable[today]);
    });
  }, []);
  // route.params.data is token

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> For students</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.bodyHead}> Today's Schedule</Text>
        <Text style={styles.ttitle}>
          <Text style={styles.info}>TIME</Text>
          <Text style={styles.info}>SUBJECT</Text>
          <Text style={styles.info}>TEACHER</Text>
        </Text>
        <View style={styles.timeTable}>
          {(todaysTT || []).map((obj: TimeTableRow) => {
            return (
              <Text style={styles.ttText}>
                <Text style={styles.info}>{obj.time} </Text>
                <Text style={styles.info}>
                  {obj.subject + (obj.isLab ? " Lab" : "")}{" "}
                </Text>
                <Text style={styles.info}>{obj.teacher}</Text>
              </Text>
            );
          })}
        </View>
        <Line width="90%"></Line>
        <Text style={styles.bodyHead}> Tomorrow's Schedule</Text>
        <Text style={styles.ttitle}>
          <Text style={styles.info}>TIME</Text>
          <Text style={styles.info}>SUBJECT</Text>
          <Text style={styles.info}>TEACHER</Text>
        </Text>
        <View style={styles.timeTable}>
          {(tomTT || []).map((obj: TimeTableRow) => {
            return (
              <Text style={styles.tom}>
                <Text style={styles.info}>{obj.time} </Text>
                <Text style={styles.info}>
                  {obj.subject + (obj.isLab ? " Lab" : "")}{" "}
                </Text>
                <Text style={styles.info}>{obj.teacher}</Text>
              </Text>
            );
          })}
        </View>
        <Line width="90%"></Line>
      </ScrollView>
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
    //alignItems: "center",
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
    //width: "100%",
    //height: "82%",
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
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
  },
  ttitle: {
    justifyContent: "space-between",
    height: 14,
    color: "#293241",
    width: "100%",
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 5,
    marginTop: 20,
    textAlign: "center",

    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  timeTable: {
    width: "100%",
    marginTop: 0,
    marginBottom: 10,
  },
  ttText: {
    justifyContent: "space-between",
    height: 45,
    backgroundColor: "#293241",
    color: "#fff",
    width: "100%",
    fontSize: 18,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center",

    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  tom: {
    backgroundColor: "#2F5D99",
    height: 45,
    textAlign: "center",
    color: "#fff",
    width: "100%",
    fontSize: 18,
    borderRadius: 5,
    marginTop: 10,

    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
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
