// @flow
import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default class Monitor extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 72 }}>{this.props.distance}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
