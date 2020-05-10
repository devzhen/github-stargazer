import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import { IS_IPHONE_X } from '@helpers/deviceInfoHelper';

// @ts-ignore
import backIcon from './assets/arrow_back.png';

interface HeaderProps {
  title: string;
  onPress?: () => void;
  logout?: () => void;
  bgColor: string;
  withBackNavigation?: boolean;
  canLogout?: boolean;
}

const Header = ({
  title,
  onPress,
  bgColor,
  withBackNavigation,
  canLogout,
  logout,
}: HeaderProps) => (
  <Container bgColor={bgColor}>
    <Title numberOfLines={1}>{title}</Title>
    {withBackNavigation && (
      <BackWrapper onPress={onPress}>
        <Image
          source={backIcon}
          style={{ height: 20, width: 20 }}
          resizeMode="contain"
        />
      </BackWrapper>
    )}
    {canLogout && (
      <LogoutWrapper onPress={logout}>
        <Logout>Logout</Logout>
      </LogoutWrapper>
    )}
  </Container>
);

Header.defaultProps = {
  bgColor: '#f7f7f8',
  withBackNavigation: false,
  canLogout: true,
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
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.gray};
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

const LogoutWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 0;
  height: 64px;
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
`;

const Logout = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.orange};
`;

export default Header;
