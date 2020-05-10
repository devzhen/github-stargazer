import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export enum ButtonBackground {
  Orange = 'orange',
  Gray = 'gray',
}

interface ButtonProps {
  labelSize: number;
  label: string;
  bgColor: ButtonBackground;
  onPress: any;
  disabled: boolean;
  loading?: boolean;
}

const Button = ({
  labelSize,
  label,
  bgColor,
  onPress,
  disabled,
  loading,
}: ButtonProps) => (
  <Wrapper
    onPress={() => {
      if (disabled || loading) {
        return;
      }
      onPress();
    }}
    bgColor={bgColor}
    disabled={disabled}
  >
    {!loading && <Label labelSize={labelSize}>{label}</Label>}
    {loading && <ActivityIndicator size="small" color="#fff" />}
  </Wrapper>
);

Button.defaultProps = {
  onPress: () => {},
  labelSize: 17,
  label: 'No data',
  bgColor: ButtonBackground.Orange,
  disabled: false,
  loading: false,
};

const Wrapper = styled.TouchableOpacity<{ bgColor: string; disabled: boolean }>`
  flex: 1;
  height: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  ${(props) =>
    props.bgColor === ButtonBackground.Orange &&
    `background-color: ${props.theme.colors.orange}`}
  ${(props) =>
    props.bgColor === ButtonBackground.Gray &&
    `background-color: ${props.theme.colors.gray}`}
  border-radius: 4px;
  ${(props) => props.disabled && 'opacity: 0.7'};
`;

const Label = styled.Text<{ labelSize: number }>`
  font-size: ${(props) => props.labelSize}px;
  text-align: center;
  color: #fff;
`;

export default Button;
