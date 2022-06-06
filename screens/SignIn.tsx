import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  StatusBar,
  TextInput,
} from "react-native";
import { signIn } from "../controllers/userApi";

export default function Welcome({ navigation }) {
  const [username, changeUsername] = useState("");
  const [password, changePass] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const signInCall = () => {
    signIn(username, password, function (data) {
      if (data.statusCode == 200) {
        {
          data.teacherId
            ? navigation.navigate("Teachers", data)
            : navigation.navigate("Students", data);
        }
      } else {
        setErrorMessage(data.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    });
    // navigation.navigate("Students");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> Hi There! {`\n\n`}Welcome to the</Text>
        <Text style={styles.textHeadLogo}>Class Companion</Text>
      </View>

      <View style={styles.main}>
        {error ? (
          <Text style={styles.errorWrapper}>
            <Text style={styles.error}>{`\n${errorMessage}`}</Text>
          </Text>
        ) : (
          <Text></Text>
        )}
        <Text style={styles.textMain}>Enter Your Credentials {`\n`}</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          onChangeText={(text) => changeUsername(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => changePass(text)}
        />

        {/* <Text> {`\n`}</Text> */}
        <View style={styles.buttonViewWrapper}>
          <View style={styles.buttonView}>
            <Button title="Login" onPress={signInCall}></Button>
          </View>
        </View>
        {/* <Text> {`\n`}</Text> */}
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
      <StatusBar style="auto" />
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
  error: {
    backgroundColor: "red",
    color: "white",
    fontSize: 16,
  },
  errorWrapper: {
    textAlign: "center",
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
    alignItems: "center",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
