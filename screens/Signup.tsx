import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import { SignUp } from "../controllers/userApi";
import { user } from "../Interfaces/user";

export default function Welcome({ navigation }) {
  const [name, changeName] = useState("");
  const [username, changeUserName] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const signUpCall = () => {
    const req: user = {
      name,
      username,
      email,
      password,
    };
    SignUp(req);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> Hi There! {`\n\n`}Welcome to the</Text>
        <Text style={styles.textHeadLogo}>Class Companion</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.textMain}>Enter Your SignUp Details {`\n`}</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          keyboardType="default"
          onChangeText={(text) => changeName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          onChangeText={(text) => changeUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email-Id"
          keyboardType="email-address"
          onChangeText={(text) => changeEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType="visible-password"
          onChangeText={(text) => changePassword(text)}
        />
        {/* <Text> {`\n`}</Text> */}
        <View style={styles.buttonViewWrapper}>
          <View style={styles.buttonView}>
            <Button title="Sign Up" onPress={signUpCall}></Button>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
