import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-navigation";
import { weekday } from "../constants/constants";
import {
  cancelClass,
  getTeacherSchedule,
  rescheduleClass,
} from "../controllers/timeTableApi";
import { TimeTableRow } from "../Interfaces/timeTable";
import Line from "../utils/line";

export default function Teacher(props: any) {
  const [tomTT, setTomTT] = useState([]);
  const [todaysTT, setTodaysTT] = useState([]);
  const [openModal, setModalState] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [user, setUser] = useState("");
  const [freeToday, setTodayFree] = useState(false);
  const [freeTomorrow, setTomorrowFree] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setError] = useState("");
  const d = new Date();
  const dayNum = d.getDay();
  var today = "";
  var tomorrow = "";
  if (dayNum > 0 && dayNum < 5) {
    today = weekday[dayNum];
    tomorrow = weekday[dayNum + 1];
  } else if (dayNum == 0) {
    tomorrow = weekday[1];
  } else if (dayNum == 5) {
    today = weekday[5];
  }
  const { teacherId } = props.route.params;
  // route.params.data is token
  useEffect(() => {
    onRefresh();
  }, []);

  function openEditModal(row: TimeTableRow, day: string) {
    row = { ...row, selectedDay: day };
    setCurrentRow(row);
    setModalState(true);
  }

  const onRefresh = useCallback(() => {
    const reqData = {
      today,
      tomorrow,
      teacherId,
    };
    if (props.route) {
      setUser(props.route.params.metaData.name);
    }
    setRefreshing(true);
    getTeacherSchedule(reqData, (data: any) => {
      setTomTT(data.tom);
      setTodaysTT(data.today);
      if (data.tom.length == 0) {
        setTomorrowFree(true);
      }
      if (data.today.length == 0) {
        setTodayFree(true);
      }
      setRefreshing(false);
    });
  }, []);

  const cancel = (tableId: string, classId: string, day: string) => {
    cancelClass(tableId, classId, day, (data: any) => {
      if (data.statusCode !== 200) {
        setError(data.error || data.message);
      } else {
        setModalState(false);
        onRefresh();
      }
    });
  };

  const reschedule = (tableId: string, classId: string, day: string) => {
    rescheduleClass(tableId, classId, day, (data: any) => {
      if (data.statusCode !== 200) {
        setError(data.error || data.message);
      } else {
        setModalState(false);
        onRefresh();
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> For Teachers</Text>
        <Text style={styles.textHead}> Welcome, {user}</Text>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalHead}>Class Info</Text>
            </View>
            <View>
              <Text style={styles.modalBody}>
                Time - <Text style={styles.modalInfo}>{currentRow.time}</Text>
              </Text>
              <Text style={styles.modalBody}>
                Subject -{" "}
                <Text style={styles.modalInfo}>{currentRow.subject}</Text>
              </Text>
              <Text style={styles.modalBody}>
                Class - <Text style={styles.modalInfo}>IT-2</Text>
              </Text>

              <View style={styles.modalButtonWrapper}>
                <View style={styles.modalButton}>
                  <Button
                    title="Cancel Class"
                    color={"navy"}
                    onPress={() =>
                      cancel(
                        currentRow.tableId,
                        currentRow.id,
                        currentRow.selectedDay
                      )
                    }
                  ></Button>
                </View>
                <View style={styles.modalButton}>
                  <Button
                    title="Reschedule Class"
                    color={"navy"}
                    onPress={() =>
                      reschedule(
                        currentRow.tableId,
                        currentRow.id,
                        currentRow.selectedDay
                      )
                    }
                  ></Button>
                </View>
              </View>
              <View style={styles.closeButton}>
                <View style={styles.modalButton}>
                  <Button
                    title="Close"
                    color={"red"}
                    onPress={() => {
                      setModalState(false);
                    }}
                  ></Button>
                </View>
              </View>
              {errorMessage ? (
                <Text style={styles.errorWrapper}>
                  <Text style={styles.error}>{`\n${errorMessage}`}</Text>
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.bodyHead}> Today's Schedule</Text>
        {freeToday ? (
          <View style={styles.freeClassesView}>
            <Text style={styles.freeClasses}>No Classes today</Text>
          </View>
        ) : (
          <>
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
                  <Pressable
                    onPress={() => openEditModal(obj, today)}
                    key={obj.id}
                  >
                    <View
                      style={[
                        styles.todayRow,
                        obj.isCancelled ? styles.cancelled : {},
                      ]}
                    >
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
          </>
        )}
        <Line width="90%"></Line>
        <Text style={styles.bodyHead}> Tomorrow's Schedule</Text>
        {freeTomorrow ? (
          <View style={styles.freeClassesView}>
            <Text style={styles.freeClasses}>No Classes tomorrow</Text>
          </View>
        ) : (
          <>
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
                  <Pressable
                    onPress={() => openEditModal(obj, tomorrow)}
                    key={obj.id}
                  >
                    <View
                      style={[
                        styles.tomRow,
                        obj.isCancelled ? styles.cancelled : {},
                      ]}
                    >
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
          </>
        )}
        <Line width="90%"></Line>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.textHead}>Week's TT</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: "red",
    color: "white",
    fontSize: 16,
  },
  errorWrapper: {
    textAlign: "center",
  },
  modalButtonWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  modalButton: {
    margin: 5,
  },
  closeButton: {
    flexDirection: "column",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHead: {
    width: "100%",
    fontSize: 19,
    fontWeight: "bold",
    color: "#293241",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  modalBody: {
    fontSize: 17,
    marginBottom: 3,
    fontWeight: "bold",
  },
  modalInfo: {
    fontWeight: "normal",
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
  freeClassesView: {
    flexDirection: "row",
  },
  freeClasses: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    padding: 10,
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
  cancelled: {
    backgroundColor: "red",
  },
  cancelledText: {
    textDecorationLine: "line-through",
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
