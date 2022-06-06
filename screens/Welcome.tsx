import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import Line from "../utils/line";
import { isSignedIn } from "../utils/tokenAuth";

export default function Welcome(props: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> Hi There! {`\n\n`}Welcome to the</Text>
        <Text style={styles.textHeadLogo}>Class Companion</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.textMain}>New User? {`\n`}</Text>
        <View style={styles.buttonViewWrapper}>
          <View style={styles.buttonView}>
            <Button
              title="Sign Up"
              onPress={() => props.navigation.navigate("SignUp")}
            ></Button>
          </View>
        </View>
        {/* <Text> {`\n`}</Text> */}
        <Line></Line>
        <Text style={styles.textMain}>
          {`\n`}Already a Companion? {`\n`}
        </Text>
        <View style={styles.buttonViewWrapper}>
          <View style={styles.buttonView}>
            <Button
              title="Login"
              onPress={() => props.navigation.navigate("SignIn")}
            ></Button>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
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
    height: "35%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  textHead: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  textHeadLogo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#EE6C4D",
  },

  main: {
    justifyContent: "center",
    height: "55%",
    width: "80%",
  },
  textMain: {
    width: "90%",
    textAlign: "left",
    color: "#293241",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonViewWrapper: {
    alignItems: "flex-end",
  },
  buttonView: {
    width: "50%",
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
    backgroundColor: "#EE6C4D",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // position: "relative",
  },
});
