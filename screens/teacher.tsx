import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  Pressable,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-navigation";
import {
  getCurrentTemplate,
  getTeacherSchedule,
} from "../controllers/timeTableApi";
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
export default function Teacher(props: any) {
  const [tomTT, setTomTT] = useState([]);
  const [todaysTT, setTodaysTT] = useState([]);
  const [openModal, setModalState] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const d = new Date();
  let today = weekday[d.getDay()];
  let tomorrow = weekday[(d.getDay() + 1) % 7];
  const { teacherId } = props.route.params;
  // route.params.data is token

  useEffect(() => {
    const reqData = {
      today,
      tomorrow,
      teacherId,
    };
    getTeacherSchedule(reqData, (data) => {
      setTomTT(data.tom);
      setTodaysTT(data.today);
      console.log(data);
    });
  }, []);

  function openEditModal(row: TimeTableRow) {
    setCurrentRow(row);
    setModalState(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> For students</Text>
      </View>
      <Modal
        onBackdropPress={() => {
          setModalState(false);
        }}
        isVisible={openModal}
        backdropColor="white"
        onBackButtonPress={() => {
          setModalState(false);
        }}
      >
        {/* Format the below modal */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Class Info</Text>
            <Text>Time - {currentRow.time}</Text>
            <Text>Subject - {currentRow.subject}</Text>
            <Text>Class - IT-2</Text>

            <View style={styles.modalButtonWrapper}>
              <Button title="Cancel Class"></Button>
              <Button title="Reschedule Class"></Button>
            </View>
          </View>
        </View>
      </Modal>
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
            <Text style={styles.columnText}>Class</Text>
          </View>
        </View>
        <View style={styles.timeTable}>
          {(todaysTT || []).map((obj: TimeTableRow) => {
            return (
              <Pressable onPress={() => openEditModal(obj)}>
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
                    <Text style={styles.rowText}>{"IT-2"}</Text>
                  </View>
                </View>
              </Pressable>
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
            <Text style={styles.columnText}>Class</Text>
          </View>
        </View>
        <View style={styles.timeTable}>
          {(tomTT || []).map((obj: TimeTableRow) => {
            return (
              <Pressable onPress={() => openEditModal(obj)}>
                <View style={styles.tomRow}>
                  <View style={styles.flexed}>
                    <Text style={styles.rowText}>{obj.time} </Text>
                  </View>
                  <View style={styles.flexed}>
                    <Text style={styles.rowText}>
                      {obj.subject + (obj.isLab ? " Lab" : "")}
                    </Text>
                  </View>
                  <View style={styles.flexed}>
                    <Text style={styles.rowText}>{"IT-2"}</Text>
                  </View>
                </View>
              </Pressable>
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
  modalButtonWrapper: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
    flexDirection: "row",
    minHeight: 45,
    color: "#fff",
    fontSize: 18,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
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
