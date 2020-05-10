import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface LoaderProps {
  marginTop: number;
  size: string;
}

const Loader = ({ marginTop, size }: LoaderProps) => (
  <Container>
    <ActivityIndicator
      // @ts-ignore
      size={size}
      color="#eb9e38"
      style={{ marginTop: marginTop }}
    />
  </Container>
);

Loader.defaultProps = {
  size: 'small',
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export default Loader;
