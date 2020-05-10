import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';

import Section from '@components/Section';
import Message from '@components/Message';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@helpers/deviceInfoHelper';

import { getUserData } from '@modules/auth/auth.reducer';

import Theme from '@theme/index';

import InfoModal from '../components/InfoModal';
import Header from '../components/Header';
import Languages from '../components/Languages';

import { fetchRepoLanguages } from '../repositories.actions';

const RepositoryDetailView = ({ navigation, route }: any) => {
  const [languages, setLanguages] = useState([]);
  const [isFetchingNow, setIsFetchingNow] = useState(true);
  const [errorModalState, setErrorModalState] = useState({
    isVisible: false,
    title: 'Error',
    message: '',
  });

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);

  const repoName = R.pathOr(
    'repo-name',
    ['params', 'repository', 'name'],
    route,
  );

  // Stars
  const stargazersCount = R.pathOr(
    0,
    ['params', 'repository', 'stargazers_count'],
    route,
  );

  // Forks
  const forksCount = R.pathOr(
    0,
    ['params', 'repository', 'forks_count'],
    route,
  );

  // Watchers
  const watchersCount = R.pathOr(
    0,
    ['params', 'repository', 'watchers_count'],
    route,
  );

  // Languages url
  const languagesUrl = R.pathOr(
    null,
    ['params', 'repository', 'languages_url'],
    route,
  );

  /**
   * Navigate back
   */
  const navigateBack = () => {
    navigation.goBack();
  };

  /**
   * Fetch languages.
   */
  const fetchLanguages = async () => {
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
      fetchRepoLanguages({
        ...userData,
        password,
        url: languagesUrl,
      }),
    );

    setIsFetchingNow(false);

    if (!R.isNil((action as any).error)) {
      const errMessage = R.path(['error', 'message'], action);

      setErrorModalState({
        isVisible: true,
        title: 'Error',
        message: errMessage,
      });

      return;
    }

    const languagesObj = R.path(['payload', 'data'], action);

    const totalBytes = R.compose(R.sum, R.values)(languagesObj);

    const languages = Object.keys(languagesObj).reduce((acc, key) => {
      const bytes = R.prop(key, languagesObj);

      const percent = R.compose(
        (value: any) => `${value}%`,
        (value: any) => value.toFixed(1),
        () => (bytes * 100) / totalBytes,
      )();

      const item = {
        name: key,
        percent,
      };

      return R.append(item, acc);
    }, []);

    setLanguages(languages);
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
   * Did mount.
   */
  useEffect(() => {
    fetchLanguages();

    // eslint-disable-next-line
  }, []);

  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}
    >
      <Header
        title={repoName}
        bgColor="#fff"
        onPress={navigateBack}
        withBackNavigation
      />
      <Section fluid bgColor="#fff">
        <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
          <Section
            fluid
            centerContentHorizontally={false}
            flexStartContentHorizontally
            clientLeft={24}
          >
            <Message
              alignment="left"
              message="Stats:"
              offsetBottom={30}
              offsetTop={30}
              size={17}
              color={Theme.colors.orange}
            />
            <Message
              alignment="left"
              message={`Watchers: ${watchersCount}`}
              offsetBottom={10}
              color={Theme.colors.lightBlack}
            />
            <Message
              alignment="left"
              message={`Stars: ${stargazersCount}`}
              offsetBottom={10}
              color={Theme.colors.lightBlack}
            />
            <Message
              alignment="left"
              message={`Forks: ${forksCount}`}
              offsetBottom={30}
              color={Theme.colors.lightBlack}
            />
            <Languages languages={languages} isFetchingNow={isFetchingNow} />
          </Section>
        </ScrollView>
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

export default RepositoryDetailView;
