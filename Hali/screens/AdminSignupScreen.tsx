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
import navigation from "../navigation";
import ConfirmEmailScreen from "./ConfirmEmailScreen";
import { NavigationHelpersContext } from "@react-navigation/native";


const { width, height } = Dimensions.get("screen");

export interface AdminSignUpProps {
  navigation: any
}

const AdminSignupScreen = ({ navigation }: AdminSignUpProps) => {
  const { control, handleSubmit, watch } = useForm();
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [text3, setText3] = React.useState("");
  const [text4, setText4] = React.useState("");
  const [text5, setText5] = React.useState("");
  const [text6, setText6] = React.useState("");
  const [search, setSearch] = React.useState("");
  const text_data = [text1, text2, text3, text4, text5, text6];

  const onSignUpPressed = async () => {
    const [email, birthdate, username, password, given_name, family_name] = text_data;
    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: { email, birthdate, given_name, family_name },
      });

      navigation.navigate("ConfirmEmailScreen");
    } catch (e: any) {
      //Alert.alert(username);
      Alert.alert("There is a problem with signing up!", e.message);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          Manager Sign Up
        </Text>
        <TextField
          text={"Email"}
          style={{ marginTop: 15 }}
          textState={text1}
          setText={setText1}
          setSearch={setSearch}
          value={text1}
        ></TextField>
        <TextField
          text={"Birthdate"}
          style={{ marginTop: 15 }}
          textState={text2}
          setText={setText2}
          setSearch={setSearch}
          value={text3}
        ></TextField>
        <TextField
          text={"Name"}
          style={{ marginTop: 15 }}
          textState={text5}
          setText={setText5}
          setSearch={setSearch}
          value={text3}
        ></TextField>
        <TextField
          text={"Surname"}
          style={{ marginTop: 15 }}
          textState={text6}
          setText={setText6}
          setSearch={setSearch}
          value={text3}
        ></TextField>
        <TextField
          text={"Username"}
          style={{ marginTop: 15 }}
          textState={text3}
          setText={setText3}
          setSearch={setSearch}
          value={text4}
        ></TextField>
        <TextField
          text={"Password"}
          style={{ marginTop: 15 }}
          textState={text4}
          setText={setText4}
          setSearch={setSearch}
          value={text5}
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
            marginTop: 12
          }}
          onPress={() => { }}
        >
          Already have an account? Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default AdminSignupScreen;
