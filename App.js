import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Constants, Location, Permissions } from "expo";
// @flow

export default class App extends React.Component {
  state = {
    AppState: {
      ready: false,
      latitude: 0,
      longitude: 0
    }
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if ((status = "granted")) {
      const {
        coords: { latitude, longitude }
      } = Location.getCurrentPositionAsync(options);
      this.setState({
        AppState: { ready: true, latitude: latitude, longitude: longitude }
      });
    } else {
      alert("couldn't get your location");
    }
  }
  render() {
    if (!this.state.AppState.ready) {
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>;
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
