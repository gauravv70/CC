import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { getCurrentTemplate } from "../controllers/timeTableApi";
import { TimeTableRow } from "../Interfaces/timeTable";
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
        <View style={styles.columnHead}>
          <View style={styles.flexed}>
            <Text style={styles.columnText}>Time</Text>
          </View>
          <View style={styles.flexed}>
            <Text style={styles.columnText}>Subject</Text>
          </View>
          <View style={styles.flexed}>
            <Text style={styles.columnText}>Teacher</Text>
          </View>
        </View>
        <View style={styles.timeTable}>
          {(todaysTT || []).map((obj: TimeTableRow) => {
            return (
              <View style={styles.todayRow}>
                <View style={styles.flexed}>
                  <Text style={styles.rowText}>{obj.time} </Text>
                </View>
                <View style={styles.flexed}>
                  <Text style={styles.rowText}>
                    {obj.subject + (obj.isLab ? " Lab" : "")}
                  </Text>
                </View>
                <View style={styles.flexed}>
                  <Text style={styles.rowText}>{obj.teacher}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <Line width="90%"></Line>
        <Text style={styles.bodyHead}> Tomorrow's Schedule</Text>
        <View style={styles.columnHead}>
          <View style={styles.flexed}>
            <Text style={styles.columnText}>Time</Text>
          </View>
          <View style={styles.flexed}>
            <Text style={styles.columnText}>Subject</Text>
          </View>
          <View style={styles.flexed}>
            <Text style={styles.columnText}>Teacher</Text>
          </View>
        </View>
        <View style={styles.timeTable}>
          {(tomTT || []).map((obj: TimeTableRow) => {
            return (
              <View style={[styles.tomRow, styles.todayRow]}>
                <View style={styles.flexed}>
                  <Text style={styles.rowText}>{obj.time} </Text>
                </View>
                <View style={styles.flexed}>
                  <Text style={styles.rowText}>
                    {obj.subject + (obj.isLab ? " Lab" : "")}
                  </Text>
                </View>
                <View style={styles.flexed}>
                  <Text style={styles.rowText}>{obj.teacher}</Text>
                </View>
              </View>
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
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
  },
  bodyHead: {
    color: "#293241",
    fontSize: 18,
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
  columnHead: {
    height: 18,
    color: "#293241",
    width: "100%",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    flexDirection: "row",
  },
  flexed: {
    flex: 1,
  },
  columnText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  todayRow: {
    flexDirection: "row",
    minHeight: 45,
    backgroundColor: "#293241",
    color: "#fff",
    fontSize: 18,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  tomRow: {
    backgroundColor: "#2F5D99",
  },
  rowText: {
    color: "#fff",
    width: "100%",
    fontSize: 18,
    textAlign: "center",
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
