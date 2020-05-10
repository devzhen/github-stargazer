import React, { useState, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import * as R from 'ramda';
import { useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';

import Button, { ButtonBackground } from '@components/Button';
import Section from '@components/Section';
import InputField from '@components/InputField';
import Message from '@components/Message';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@helpers/deviceInfoHelper';

import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoModal from '../components/InfoModal';

import { login, setIsAuthenticated } from '../auth.actions';

const LoginView = () => {
  const dispatch = useDispatch();

  const userRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);
  const [errorModalState, setErrorModalState] = useState({
    isVisible: false,
    title: 'Error',
    message: '',
  });

  /**
   * Check errors.
   */
  const checkErrors = (field: string, text: string) => {
    const hasError = !R.isEmpty(text) && text.length < 2;

    const fieldName = field === 'user' ? 'user' : 'password';

    const newErrors = hasError
      ? {
          ...errors,
          [fieldName]: `The field - '${fieldName}' must be at least 2 characters`,
        }
      : {
          ...errors,
          [fieldName]: null,
        };

    setErrors(newErrors);
  };

  /**
   * Set value.
   */
  const onValueChangedHandler = (field: string, text: string) => {
    const updateMethod = field === 'user' ? setUser : setPassword;

    updateMethod(text);

    // Check error.
    checkErrors(field, text);
  };

  /**
   * Determine filed placeholder.
   */
  const determineFieldPlaceholder = ({ field, defaultValue }: any) => {
    const error = R.prop(field, errors);

    if (R.isNil(error) || R.isEmpty(error)) {
      return defaultValue;
    }

    return error;
  };

  /**
   * Determine error .
   */
  const determineError = (field: string) => {
    const error = R.prop(field, errors);

    if (R.isNil(error)) {
      return false;
    }

    return true;
  };

  /**
   * Has errors
   */
  const hasErrors = () => {
    const values = (Object as any).values(errors);

    return R.any((value: any) => !R.isNil(value), values);
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
   * Submit
   */
  const submit = async () => {
    Keyboard.dismiss();

    if (hasErrors() || R.isEmpty(user) || R.isEmpty(password)) {
      return;
    }

    setIsLoginButtonLoading(true);

    const action = await dispatch(login({ user, password }));

    if (!R.isNil((action as any).error)) {
      const errMessage = R.path(['error', 'message'], action);

      setIsLoginButtonLoading(false);

      if (
        R.test(/Request failed with status code 401/g, errMessage) ||
        R.test(/Request failed with status code 403/g, errMessage)
      ) {
        setErrorModalState({
          isVisible: true,
          title: 'Login failed',
          message: 'Check email and password and try again.',
        });

        return;
      }

      setErrorModalState({
        isVisible: true,
        title: 'Error',
        message: 'An unknown error has occurred. Please try again later.',
      });

      return;
    }

    try {
      await Keychain.setGenericPassword(user, password);

      await dispatch(setIsAuthenticated(user));
    } catch (err) {
      setErrorModalState({
        isVisible: true,
        title: 'Error',
        message: `Cannot save password to keychain - ${err.message}`,
      });
    }
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}
    >
      <Header title="Login" bgColor="#fff" />
      <Message
        message="Please, provide you credentials."
        offsetBottom={30}
        offsetTop={30}
      />
      <Section fluid clientLeft={8} clientRight={8}>
        <InputField
          error={determineError('user')}
          offsetTop={18}
          offsetBottom={15}
          placeholder={determineFieldPlaceholder({
            field: 'user',
            defaultValue: 'User',
          })}
          innerRef={userRef}
          onSubmitEditing={() => {}}
          value={user}
          onChangeText={onValueChangedHandler.bind(null, 'user')}
        />
        <InputField
          error={determineError('password')}
          innerRef={passwordRef}
          offsetBottom={20}
          placeholder={determineFieldPlaceholder({
            field: 'password',
            defaultValue: 'Password',
          })}
          value={password}
          onChangeText={onValueChangedHandler.bind(null, 'password')}
          onSubmitEditing={submit}
          returnKeyType="go"
          secure
        />
      </Section>
      <Section fluid flexEndContentVertically>
        <Footer>
          <Button
            label="Login"
            bgColor={
              hasErrors() || R.isEmpty(user) || R.isEmpty(password)
                ? ButtonBackground.Gray
                : ButtonBackground.Orange
            }
            onPress={submit}
            disabled={hasErrors() || R.isEmpty(user) || R.isEmpty(password)}
            loading={isLoginButtonLoading}
          />
        </Footer>
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

export default LoginView;
