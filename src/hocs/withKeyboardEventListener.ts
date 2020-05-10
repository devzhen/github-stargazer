import React, { Component } from 'react';
import { Keyboard } from 'react-native';

const withKeyboardEventListener = (WrappedComponent: any) =>
  class withKeyboardEventListenerHoc extends Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
        keyboardHeight: 0,
      };

      Keyboard.addListener('keyboardDidShow', this.handleKeyboardShowEvent);
      Keyboard.addListener('keyboardDidHide', this.handleKeyboardHideEvent);
      Keyboard.addListener('keyboardWillShow', this.handleKeyboardShowEvent);
      Keyboard.addListener('keyboardWillHide', this.handleKeyboardHideEvent);
    }

    componentWillUnmount() {
      Keyboard.removeListener('keyboardDidShow', this.handleKeyboardShowEvent);
      Keyboard.removeListener('keyboardDidHide', this.handleKeyboardHideEvent);
      Keyboard.removeListener('keyboardWillShow', this.handleKeyboardShowEvent);
      Keyboard.removeListener('keyboardWillHide', this.handleKeyboardHideEvent);
    }

    handleKeyboardShowEvent = (event: any) => {
      const { height } = event.endCoordinates;

      if (this.state.keyboardHeight === height) {
        return;
      }

      this.setState({ keyboardHeight: height });
    };

    handleKeyboardHideEvent = () => {
      if (this.state.keyboardHeight === 0) {
        return;
      }

      this.setState({ keyboardHeight: 0 });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          keyboardHeight={this.state.keyboardHeight}
        />
      );
    }
  };

export default withKeyboardEventListener;
