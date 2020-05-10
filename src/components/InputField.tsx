import React from 'react';
import { isNil, isEmpty } from 'ramda';
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import styled from 'styled-components/native';

import { IS_ANDROID } from '../helpers/deviceInfoHelper';

interface InputFieldProps {
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  fontSize?: number;
  onChangeText: (value: string) => void;
  value: string;
  placeholder?: string;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  secure?: boolean;
  onSubmitEditing?: any;
  color?: string;
  innerRef: any;
  inputAccessoryViewID?: any;
  error?: boolean;
  inputHeight?: number;
}

const InputField = ({
  offsetTop,
  offsetLeft,
  offsetRight,
  offsetBottom,
  fontSize,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  returnKeyType,
  secure,
  onSubmitEditing,
  color,
  innerRef,
  inputAccessoryViewID,
  error,
  inputHeight,
}: InputFieldProps) => (
  <Container
    offsetTop={offsetTop}
    offsetLeft={offsetLeft}
    offsetRight={offsetRight}
    offsetBottom={offsetBottom}
  >
    <StyledInput
      inputHeight={inputHeight}
      ref={innerRef}
      withOffset={!isNil(value) && !isEmpty(value)}
      fontSize={fontSize}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor="#9a9a9a"
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      underlineColorAndroid="transparent"
      secureTextEntry={secure}
      onSubmitEditing={onSubmitEditing}
      autoCapitalize="none"
      autoCorrect={false}
      color={color}
      inputAccessoryViewID={inputAccessoryViewID}
      isEmpty={isEmpty(value) || isNil(value)}
    />
    {!isNil(value) && !isEmpty(value) && (
      <PlaceholderWrapper>
        <Placeholder error={error}>{placeholder}</Placeholder>
      </PlaceholderWrapper>
    )}
  </Container>
);

InputField.defaultProps = {
  offsetTop: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  offsetRight: 0,
  fontSize: '17px',
  placeholder: '',
  keyboardType: 'default',
  secure: false,
  onSubmitEditing: () => {},
  returnKeyType: 'next',
  innerRef: () => {},
  autoFocus: false,
  centeringText: false,
  width: '100%',
  color: '#383838',
  inputHeight: 45,
};

const Container = styled.View<{
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
}>`
  margin-top: ${(props) => props.offsetTop || 0}px;
  margin-bottom: ${(props) => props.offsetBottom || 0}px;
  margin-left: ${(props) => props.offsetLeft || 0}px;
  margin-right: ${(props) => props.offsetRight || 0}px;
`;

const StyledInput = styled.TextInput<{
  fontSize?: number;
  color?: string;
  withOffset: boolean;
  isEmpty: boolean;
  inputHeight?: number;
}>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  width: 100%;
  height: ${(props) => props.inputHeight || 45}px;
  padding-left: 19px;
  background-color: ${(props) => props.theme.colors.porcelain};
  border-color: ${(props) => props.theme.colors.gray};
  border-width: 1px;
  border-radius: 4px;
  ${(props) => props.withOffset && 'padding-top: 14px'};
  ${(props) => IS_ANDROID && !props.isEmpty && 'padding-bottom: 0'};
`;

const PlaceholderWrapper = styled.View`
  position: absolute;
  top: 2px;
  left: 0;
  width: 100%;
  padding-left: 19px;
`;

const Placeholder = styled.Text<{ error?: boolean }>`
  font-size: 12px;
  color: ${(props) => props.theme.colors.orange};
  font-weight: 600;
  ${(props) => props.error && `color: ${props.theme.colors.error}`};
`;

export default InputField;
