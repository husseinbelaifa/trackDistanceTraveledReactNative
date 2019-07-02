import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { MapView, Location } from "expo";

const { Marker, Polyline } = MapView;
import Monitor from "./Monitor";
import * as turf from "@turf/turf";
export default class Run extends Component {
  state = {
    positions: [],
    distance: 0
  };
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

  distancesBetween(originPosition, destinationPosition) {
    console.log("originPosition");
    console.log(destinationPosition);

    const from = turf.point([
      originPosition.coords.longitude,
      originPosition.coords.latitude
    ]);

    const to = turf.point([
      destinationPosition.coords.longitude,
      destinationPosition.coords.latitude
    ]);
    const options = { units: "miles" };

    return Math.round(turf.distance(from, to, options));
  }

  onPositionChange = position => {
    console.log(position);
    const lastPosition =
      this.state.positions.length === 0
        ? {
            coords: {
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }
          }
        : this.state.positions[this.state.positions.length - 1];

    const distance =
      this.props.distance + this.distancesBetween(lastPosition, position);

    console.log("distance");
    console.log(this.distancesBetween(lastPosition, position));
    console.log(distance);

    this.setState({
      positions: [...this.state.positions, position],
      distance: distance
    });
  };
  render() {
    const { latitude, longitude } = this.props;
    const currentPosition =
      this.state.positions.length === 0
        ? {
            coords: {
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }
          }
        : {
            coords: {
              latitude: this.state.positions[this.state.positions.length - 1]
                .coords.latitude,
              longitude: this.state.positions[this.state.positions.length - 1]
                .coords.longitude
            }
          };

    console.log(currentPosition);
    return (
      <View style={styles.container}>
        <Monitor distance={this.state.distance} />
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01
          }}
        >
          <Marker coordinate={currentPosition && currentPosition.coords} />
          <Polyline
            coordinates={
              this.state.positions &&
              this.state.positions.map(position => {
                return {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                };
              })
            }
            strokeWidth={10}
            strokeColor="#f2b659"
          />
        </MapView>
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
