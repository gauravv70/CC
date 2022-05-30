import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { SignUp } from "../controllers/userApi";
import { user } from "../Interfaces/user";

export default function Welcome({ navigation }) {
  const [name, changeName] = useState("");
  const [username, changeUserName] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [teacherId, setTeacherId] = useState("");

  const signUpCall = () => {
    if (confirmPassword && confirmPassword && confirmPassword != password) {
      setErrorMessage("Passwords do no match");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    } else {
      const req: user = {
        name,
        username,
        email,
        password,
        teacher,
        teacherId: Number(teacherId),
      };
      SignUp(req, (data) => {
        if (data.statusCode == 200) {
          navigation.navigate("Students", data);
        } else {
          setErrorMessage(data.message);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      });
    }

    // navigation.navigate("Students");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}> Hi There! {`\n\n`}Welcome to the</Text>
        <Text style={styles.textHeadLogo}>Class Companion</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {error ? (
          <Text style={styles.errorWrapper}>
            <Text style={styles.error}>{`\n${errorMessage}`}</Text>
          </Text>
        ) : (
          <Text></Text>
        )}
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
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => changePassword(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(text) => changeConfirmPassword(text)}
        />
        <RadioButton.Group
          onValueChange={(value) => setTeacher(value)}
          value={teacher}
        >
          <View style={styles.radio}>
            <RadioButton.Item
              label="Teacher"
              value={true}
              position="leading"
            ></RadioButton.Item>
            <RadioButton.Item
              label="Student"
              value={false}
              status="checked"
              position="leading"
            />
          </View>
        </RadioButton.Group>
        {teacher ? (
          <TextInput
            style={styles.input}
            placeholder="Teacher Id"
            keyboardType="numeric"
            onChangeText={(text) => setTeacherId(text)}
          />
        ) : null}
        {/* <Text> {`\n`}</Text> */}
        <View style={styles.buttonViewWrapper}>
          <View style={styles.buttonView}>
            <Button title="Sign Up" onPress={signUpCall}></Button>
          </View>
        </View>
        {/* <Text> {`\n`}</Text> */}
      </ScrollView>
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
  body: {
    alignItems: "center",
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
  },
  main: {
    justifyContent: "center",
    height: "55%",
    width: "80%",
  },
  error: {
    backgroundColor: "red",
    color: "white",
    fontSize: 16,
  },
  errorWrapper: {
    textAlign: "center",
  },

  radio: {
    flexDirection: "row",
    alignSelf: "center",
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
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
