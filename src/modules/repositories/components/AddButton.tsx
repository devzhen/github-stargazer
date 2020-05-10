import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { TapGestureHandler } from 'react-native-gesture-handler';

// @ts-ignore
import plusIcon from './assets/ic_plus.png';

interface AddButtonProps {
  onPress: any;
}

const AddButton = ({ onPress }: AddButtonProps) => (
  <TapGestureHandler onHandlerStateChange={onPress}>
    <Container>
      <Image
        source={plusIcon}
        style={{ height: 26, width: 26 }}
        resizeMode="contain"
      />
    </Container>
  </TapGestureHandler>
);

AddButton.defaultProps = {
  onPress: () => {},
};

const Container = styled.View`
  position: absolute;
  bottom: 25px;
  right: 10px;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.orange};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  z-index: 1000000;
`;

export default AddButton;
