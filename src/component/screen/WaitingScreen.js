import React, { PureComponent } from 'react';
import {  View, ActivityIndicator } from 'react-native';

export default class WaitingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
}
