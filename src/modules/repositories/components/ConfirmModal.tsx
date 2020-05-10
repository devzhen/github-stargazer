import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';

import Button, { ButtonBackground } from '@components/Button';

interface ConfirmModalProps {
  submit: any;
  cancel: any;
  isVisible: boolean;
  isLoading: boolean;
  header: string;
  message: string;
  repoName: string;
}

const ConfirmModal = ({
  cancel,
  submit,
  isVisible,
  isLoading,
  header,
  message,
  repoName,
}: ConfirmModalProps) => (
  <>
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <Container>
        <Header>{header}</Header>
        <Body>
          <Message>{message}</Message>
          <Repo>{repoName}</Repo>
        </Body>
        <Footer>
          <Button
            label="Cancel"
            onPress={cancel}
            bgColor={ButtonBackground.Gray}
          />
          <Spacer />
          <Button
            label="Ok"
            onPress={() => {
              if (isLoading) {
                return;
              }

              submit();
            }}
            disabled={isLoading}
            bgColor={ButtonBackground.Orange}
            loading={isLoading}
          />
        </Footer>
      </Container>
    </Modal>
    {isVisible && <Background />}
  </>
);

const Container = styled.View`
  margin-horizontal: 23px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
`;

const Footer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 44px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #acacac;
  margin-bottom: 5px;
`;

const Body = styled.View`
  margin-top: 15px;
  margin-bottom: 0;
`;

const Spacer = styled.View`
  width: 20px;
`;

const Message = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.orange};
  margin-bottom: 15px;
`;

const Repo = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.lightBlack};
  margin-bottom: 15px;
`;

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`;

export default ConfirmModal;
