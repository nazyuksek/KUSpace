import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import * as React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { NavigationContainer } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import ConfirmEmailScreen from "./ConfirmEmailScreen";
import { NavigationHelpersContext } from "@react-navigation/native";
import { Image } from "react-native";

const { width, height } = Dimensions.get("screen");

export interface SignUpProps {
  navigation: any;
}

const SignupScreen = ({ navigation }: SignUpProps) => {
  const { control, handleSubmit, watch } = useForm();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [district, setDist] = React.useState("");
  const [search, setSearch] = React.useState("");
  const text_data = [email, birthdate, username, password, name, surname];
  const flag = "player";

  const onSignUpPressed = async () => {
    const [email, birthdate, username, password, given_name, family_name] =
      text_data;
    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: { email, birthdate, given_name, family_name },
      });

      navigation.navigate("ConfirmEmailScreen", {
        username,
        flag,
        email,
        birthdate,
        password,
        given_name,
        family_name,
        district,
      });
    } catch (e: any) {
      Alert.alert("There is a problem with signing up!", e.message);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>Sign Up!</Text>
        <TextField
          text={"Username"}
          style={{ marginTop: 15 }}
          textState={username}
          setText={setUsername}
          setSearch={setSearch}
          value={username}
        ></TextField>
        <TextField
          text={"Email"}
          style={{ marginTop: 15 }}
          textState={email}
          setText={setEmail}
          setSearch={setSearch}
          value={email}
        ></TextField>
        <TextField
          text={"Name"}
          style={{ marginTop: 15 }}
          textState={name}
          setText={setName}
          setSearch={setSearch}
          value={name}
        ></TextField>
        <TextField
          text={"Surname"}
          style={{ marginTop: 15 }}
          textState={surname}
          setText={setSurname}
          setSearch={setSearch}
          value={surname}
        ></TextField>
        <TextField
          text={"Birthdate"}
          style={{ marginTop: 15 }}
          textState={birthdate}
          setText={setBirthdate}
          setSearch={setSearch}
          value={birthdate}
        ></TextField>
        <TextField
          text={"District"}
          style={{ marginTop: 15 }}
          textState={district}
          setText={setDist}
          setSearch={setSearch}
          value={district}
        ></TextField>
        <TextField
          text={"Password"}
          style={{ marginTop: 15 }}
          textState={password}
          setText={setPassword}
          setSearch={setSearch}
          value={password}
          password={true}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Sign up"
          onPress={() => onSignUpPressed()}
        />
        <Text
          style={{
            color: "black",
            fontSize: 12,
            marginTop: 12,
          }}
          onPress={() => {
            onSignInPressed();
          }}
        >
          Already have an account? Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    flex: 1,
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    width: "100%",
    height: "120%",
    opacity: 0.05,
  },
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(135, 211, 124, 1)",
    //   justifyContent: "center",
  },
  itemscontainer: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 20,
  },
});

export default SignupScreen;
