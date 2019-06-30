import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { MapView } from "expo";
export default class componentName extends Component {
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
    flex: 0.61
  }
});
