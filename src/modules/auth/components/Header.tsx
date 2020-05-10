import React from 'react';
import styled from 'styled-components/native';

import { IS_IPHONE_X } from '@helpers/deviceInfoHelper';

interface HeaderProps {
  title: string;
  onPress?: () => void;
  bgColor: string;
  withBackNavigation?: boolean;
}

const Header = ({
  title,
  onPress,
  bgColor,
  withBackNavigation,
}: HeaderProps) => (
  <Container bgColor={bgColor}>
    <Title>{title}</Title>
    {withBackNavigation && <BackWrapper onPress={onPress} />}
  </Container>
);

Header.defaultProps = {
  bgColor: '#f7f7f8',
  withBackNavigation: true,
};

const Container = styled.View<{
  bgColor: string;
}>`
  width: 100%;
  height: 64px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 12px;
  background-color: ${(props) => props.bgColor};
  ${IS_IPHONE_X && 'height: 84px'};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const BackWrapper = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
  top: 0;
  height: 64px;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 12px;
  ${IS_IPHONE_X && 'top: 20px'};
`;

export default Header;
