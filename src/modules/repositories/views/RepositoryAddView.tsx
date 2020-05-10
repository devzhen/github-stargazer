import * as R from 'ramda';
import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';

import { getUserData } from '@modules/auth/auth.reducer';

import Button, { ButtonBackground } from '@components/Button';
import Section from '@components/Section';
import Message from '@components/Message';
import InputField from '@components/InputField';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@helpers/deviceInfoHelper';

import InfoModal from '../components/InfoModal';
import Header from '../components/Header';

import { getRepositories } from '../repositories.reducer';
import { createRepo } from '../repositories.actions';

const RepositoryAddView = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const userData = useSelector(getUserData);
  const repositories = useSelector(getRepositories);

  const [repoName, setRepoName] = useState<string>('');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [errorModalState, setErrorModalState] = useState<any>({
    isVisible: false,
    title: 'Error',
    message: '',
  });

  /**
   * Navigate back
   */
  const navigateBack = () => {
    navigation.goBack();
  };

  /**
   * Close error modal.
   */
  const closeErrorModal = () => {
    setErrorModalState({
      isVisible: false,
      title: 'Error',
      message: '',
    });
  };

  /**
   * Set value.
   */
  const onValueChangedHandler = (text: string) => {
    setRepoName(text);
  };

  /**
   * Determine placeholder.
   */
  const determineErrors = () => {
    if (!R.isEmpty(repoName) && repoName.length < 4) {
      return {
        hasError: true,
        placeholder: 'The name must be at least 4 characters',
      };
    }

    return {
      hasError: false,
      placeholder: 'Repository name',
    };
  };

  /**
   * Determine placeholder.
   */
  const submitHandler = async () => {
    Keyboard.dismiss();

    if (R.isEmpty(repoName) || isButtonLoading) {
      return;
    }

    setIsButtonLoading(true);

    // Check existing repositories
    for (const repo of (Object as any).values(repositories)) {
      const name = R.prop('name', repo);

      if (repoName === name) {
        setErrorModalState({
          isVisible: true,
          title: 'Error',
          message: 'THe repository with such name already exists.',
        });

        setIsButtonLoading(false);

        return;
      }
    }

    let data = {};

    try {
      // Retrieve the credentials
      data = await Keychain.getGenericPassword();
    } catch (error) {
      setErrorModalState({
        isVisible: true,
        title: 'Error',
        message: error.message,
      });

      return;
    }

    const password = R.prop('password', data);

    const action = await dispatch(
      createRepo({
        ...userData,
        password,
        name: repoName,
      }),
    );

    if (!R.isNil((action as any).error)) {
      const errMessage = R.path(['error', 'message'], action);

      setErrorModalState({
        isVisible: true,
        title: 'Error',
        message: errMessage,
      });
    }

    setIsButtonLoading(false);

    navigation.goBack();
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}
    >
      <Header
        title="Add Repository"
        bgColor="#fff"
        onPress={navigateBack}
        withBackNavigation
      />
      <Section fluid bgColor="#fff" clientLeft={24} clientRight={24}>
        <Message
          size={17}
          message="Please, enter repository name."
          offsetBottom={30}
          offsetTop={30}
        />
        <InputField
          error={determineErrors().hasError}
          placeholder={determineErrors().placeholder}
          onSubmitEditing={submitHandler}
          value={repoName}
          onChangeText={onValueChangedHandler}
        />
      </Section>
      <Section
        fluid
        bgColor="#fff"
        clientLeft={24}
        clientRight={24}
        flexEndContentVertically
      >
        <Section height={50} offsetBottom={100}>
          <Button
            label="Submit"
            bgColor={
              determineErrors().hasError || R.isEmpty(repoName)
                ? ButtonBackground.Gray
                : ButtonBackground.Orange
            }
            onPress={submitHandler}
            disabled={
              determineErrors().hasError ||
              R.isEmpty(repoName) ||
              isButtonLoading
            }
            loading={isButtonLoading}
          />
        </Section>
      </Section>
      {errorModalState.isVisible && (
        <InfoModal
          isVisible={errorModalState.isVisible}
          onPress={closeErrorModal}
          header={errorModalState.title}
          message={errorModalState.message}
        />
      )}
    </View>
  );
};

export default RepositoryAddView;
