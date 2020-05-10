import React from 'react';
import styled from 'styled-components/native';

interface MessageProps {
  message: string;
  onPress?: () => void;
  offsetTop?: number;
  offsetBottom?: number;
  size?: number;
  alignment?: string;
  weight?: string | number;
  color?: string;
  bgColor?: string;
  clientTop?: number;
  clientLeft?: number;
  clientRight?: number;
  clientBottom?: number;
  lineHeight?: number;
}

const Message = ({
  message,
  offsetTop,
  offsetBottom,
  onPress,
  size,
  alignment,
  color,
  weight,
  bgColor,
  clientTop,
  clientLeft,
  clientRight,
  clientBottom,
  lineHeight,
}: MessageProps) => (
  <Container
    offsetTop={offsetTop}
    offsetBottom={offsetBottom}
    bgColor={bgColor}
    clientTop={clientTop}
    clientLeft={clientLeft}
    clientRight={clientRight}
    clientBottom={clientBottom}
  >
    <Text
      size={size}
      alignment={alignment}
      weight={weight}
      color={color}
      onPress={onPress}
      lineHeight={lineHeight}
    >
      {message}
    </Text>
  </Container>
);

Message.defaultProps = {
  offsetTop: 0,
  offsetBottom: 0,
  size: 14,
  onPress: () => {},
  alignment: 'center',
  weight: 'bold',
  color: '#eb9e38',
  message: '',
};

const Container = styled.View<{
  offsetTop?: number;
  offsetBottom?: number;
  bgColor?: string;
  clientTop?: number;
  clientLeft?: number;
  clientRight?: number;
  clientBottom?: number;
}>`
  margin-top: ${(props) => props.offsetTop};
  margin-bottom: ${(props) => props.offsetBottom};
  align-items: center;
  justify-content: center;
  ${(props) => props.bgColor && `background-color: ${props.bgColor}`};
  padding-top: ${(props) => props.clientTop || 0};
  padding-left: ${(props) => props.clientLeft || 0};
  padding-right: ${(props) => props.clientRight || 0};
  padding-bottom: ${(props) => props.clientBottom || 0};
`;

const Text = styled.Text<{
  size?: number;
  color?: string;
  alignment?: string;
  weight?: string | number;
  lineHeight?: number;
}>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-align: ${(props) => props.alignment};
  font-weight: ${(props) => props.weight};
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight}`};
`;

export default Message;
