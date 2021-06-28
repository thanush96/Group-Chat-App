import { auth } from "../firebase";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="LogIn" />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        title="Register"
        type="outline"
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: { width: 200, marginTop: 10 },
  inputContainer: { width: 300 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

// // import * as React from "react";
// // import { Text, View, StyleSheet, Button } from "react-native";
// // import { Audio } from "expo-av";

// // export default function LoginScreen() {
// //   const [sound, setSound] = React.useState();

// //   async function playSound() {
// //     console.log("Loading Sound");
// //     const { sound } = await Audio.Sound.createAsync(
// //       "https://freesound.org/data/previews/413/413854_4337854-hq.mp3"
// //     );
// //     setSound(sound);

// //     console.log("Playing Sound");
// //     await sound.playAsync();
// //   }

// //   React.useEffect(() => {
// //     return sound
// //       ? () => {
// //           console.log("Unloading Sound");
// //           sound.unloadAsync();
// //         }
// //       : undefined;
// //   }, [sound]);

// //   return (
// //     <View style={styles.container}>
// //       <Button title="Play Sound" onPress={playSound} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     backgroundColor: "#ecf0f1",
// //     padding: 10,
// //   },
// // });

// // import * as React from "react";
// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, Button } from "react-native";
// import { Audio } from "expo-av";
// import { db } from "../firebase";
// import storage from "@react-native-firebase/storage";
// import firebase from "firebase";

// export default function App() {
//   const [recording, setRecording] = React.useState();

//   async function startRecording() {
//     console.log("Start recording..");
//     try {
//       console.log("Requesting permissions..");
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       console.log("Starting recording..");
//       const recording = new Audio.Recording();
//       await recording.prepareToRecordAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );
//       await recording.startAsync();
//       setRecording(recording);
//       console.log("Recording started");
//     } catch (err) {
//       console.error("Failed to start recording", err);
//     }
//   }

//   async function stopRecording() {
//     console.log("Stopping recording..");
//     setRecording(undefined);
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();

//     const musicRef = firebase.storage().ref(`/music/canvas`);
//     musicRef.put(uri).then(() => {
//       console.log("Uploaded");
//       // const storageRef = firebase.storage().ref(`/music/canvas`);
//       // storageRef
//       //   .child(file.file.name)
//       //   .getDownloadURL()
//       //   .then((url) => {
//       //     const databaseRef = firebase
//       //       .database()
//       //       .ref(`canvas-${this.props.canvas.id}`);
//       //     databaseRef.push({
//       //       songName: file.name,
//       //       url: url,
//       //     });
//       //   });
//     });
//     console.log("Recording stopped and stored at", uri);
//   }

//   return (
//     <View style={styles.container}>
//       <Button
//         title={recording ? "Stop Recording" : "Start Recording"}
//         onPress={recording ? stopRecording : startRecording}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     padding: 10,
//   },
// });

// import * as AppAuth from "expo-app-auth";
// // When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
// const { URLSchemes } = AppAuth;
// import React from "react";
// import { Text } from "react-native";
// import * as GoogleSignIn from "expo-google-sign-in";

// export default class AuthScreen extends React.Component {
//   state = { user: null };

//   componentDidMount() {
//     this.initAsync();
//   }

//   initAsync = async () => {
//     await GoogleSignIn.initAsync({
//       // You may ommit the clientId when the firebase `googleServicesFile` is configured
//       clientId:
//         "269756063249-dcp2mhgheru4648cbrkuhgog0i7olbqt.apps.googleusercontent.com",
//     });
//     this._syncUserWithStateAsync();
//   };

//   _syncUserWithStateAsync = async () => {
//     const user = await GoogleSignIn.signInSilentlyAsync();
//     this.setState({ user });
//   };

//   signOutAsync = async () => {
//     await GoogleSignIn.signOutAsync();
//     this.setState({ user: null });
//   };

//   signInAsync = async () => {
//     try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       if (type === "success") {
//         this._syncUserWithStateAsync();
//       }
//     } catch ({ message }) {
//       alert("login: Error:" + message);
//     }
//   };

//   onPress = () => {
//     if (this.state.user) {
//       this.signOutAsync();
//     } else {
//       this.signInAsync();
//     }
//   };

//   render() {
//     return <Text onPress={this.onPress}>Toggle Auth</Text>;
//   }
// }

// import React from "react";
// import { StyleSheet, View, Button } from "react-native";
// import * as Google from "expo-google-app-auth";

// const LoginScreen = ({ navigation }) => {
//   const signInAsync = async () => {
//     console.log("LoginScreen.js 6 | loggin in");
//     try {
//       const { type, user } = await Google.logInAsync({
//         androidClientId: `269756063249-dcp2mhgheru4648cbrkuhgog0i7olbqt.apps.googleusercontent.com`,
//       });

//       if (type === "success") {
//         // Then you can use the Google REST API
//         console.log("LoginScreen.js 17 | success, navigating to profile");
//         // navigation.navigate("Profile", { user });
//       }
//     } catch (error) {
//       console.log("LoginScreen.js 19 | error with login", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Login with Google" onPress={signInAsync} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});
