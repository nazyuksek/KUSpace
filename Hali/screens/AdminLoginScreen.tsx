import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import * as React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { Auth } from "aws-amplify";
import { NavigationHelpersContext } from "@react-navigation/native";

export interface AdminLoginScreenProps {
  navigation: any;
}

const AdminLoginScreen = ({ navigation }: AdminLoginScreenProps) => {
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const text_data = [text1, text2];

  const onSigninPressed = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const [username, password] = text_data;
    try {
      const response = await Auth.signIn(username, password);
    } catch (e: any) {
      Alert.alert("There is a problem with signing up!", e.message);
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          Login as Manager
        </Text>
        <TextField
          text={"username"}
          style={{}}
          textState={text1}
          setText={setText1}
          setSearch={setSearch}
          value={text1}
        ></TextField>
        <TextField
          text={"password"}
          style={{}}
          textState={text2}
          setText={setText2}
          setSearch={setSearch}
          value={text2}
        ></TextField>
        <Button
          onPress={() => {
            onSigninPressed();
          }}
          buttonText={loading ? "Loading..." : "Login"}
          style={{ backgroundColor: "white", marginTop: 50 }}
        ></Button>
        <Text
          style={{
            color: "darkslategrey",
            fontSize: 14,
            fontStyle: "italic",
            marginTop: 20,
          }}
          onPress={() => {
            onForgotPasswordPressed();
          }}
        >
          Forgot Password?
        </Text>
        {/* <Text
          style={{
            color: "darkslategrey",
            fontSize: 12,
            marginTop: 10,
          }}
          onPress={() => {
            onNoaccountPressed();
          }}
        >
          No Account? Sign up
        </Text> */}
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
    justifyContent: "center",
  },
  itemscontainer: {
    display: "flex",
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 20,
  },
});

export default AdminLoginScreen;
