import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { MapView, Location } from "expo";
export default class Run extends Component {
  async componentDidMount() {
    this.listener = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1000,
        distanceInterval: 1
      },
      this.onPositionChange
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  onPositionChange = position => {
    console.log(position);
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} provider="google" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});
