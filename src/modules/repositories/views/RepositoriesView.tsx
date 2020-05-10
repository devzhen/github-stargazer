import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';

import Section from '@components/Section';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@helpers/deviceInfoHelper';
import ROUTES from '@modules/navigation/models';

import { getUserData } from '@modules/auth/auth.reducer';
import { logout } from '@modules/auth/auth.actions';

import Header from '../components/Header';
import Loader from '../components/Loader';
import InfoModal from '../components/InfoModal';
import ConfirmModal from '../components/ConfirmModal';
import EmptyRepositories from '../components/EmptyRepositories';
import Repositories from '../components/Repositories';
import AddButton from '../components/AddButton';

import { fetchAll, deleteRepo } from '../repositories.actions';
import { getRepositories } from '../repositories.reducer';

const RepositoriesView = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const userData = useSelector(getUserData);
  const repositories = useSelector(getRepositories);

  const [isFetchingNow, setIsFetchingNow] = useState(true);
  const [isLoadingNow, setIsLoadingNow] = useState(false);

  const [errorModalState, setErrorModalState] = useState({
    isVisible: false,
    title: 'Error',
    message: '',
  });

  const [confirmModalState, setConfirmModalState] = useState({
    isVisible: false,
    title: 'Warning',
    message: 'Are you sure you want to delete this repo?',
    repo: null,
  });

  /**
   * Fetch initial data.
   */
  const fetchInitialData = async () => {
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
      fetchAll({
        ...userData,
        password,
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

    setIsFetchingNow(false);
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
   * Close confirm modal.
   */
  const closeConfirmModal = () => {
    setConfirmModalState({
      isVisible: false,
      title: 'Warning',
      message: 'Are you sure you want to delete this repo?',
      repo: null,
    });
  };

  /**
   * On press item handler.
   */
  const onPressItemHandler = (repository: any) => {
    navigation.navigate(ROUTES.REPOSITORY_DETAIL, { repository });
  };

  /**
   * Addd repo handler.
   */
  const addRepoHandler = () => {
    navigation.navigate(ROUTES.REPOSITORY_ADD);
  };

  /**
   * Delete item handler.
   */
  const prepareDeleteItemHandler = (item: any) => {
    setConfirmModalState({
      isVisible: true,
      title: 'Warning',
      message: 'Are you sure you want to delete this repo?',
      repo: item,
    });
  };

  /**
   * Delete repository
   */
  const confirmDeleteItemHandler = async () => {
    setIsLoadingNow(true);

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
      deleteRepo({
        ...userData,
        password,
        name: R.path(['repo', 'name'], confirmModalState),
        id: R.path(['repo', 'id'], confirmModalState),
      }),
    );

    setIsLoadingNow(false);

    closeConfirmModal();

    if (!R.isNil((action as any).error)) {
      const errMessage = R.path(['error', 'message'], action);

      setErrorModalState({
        isVisible: true,
        title: 'Error',
        message: errMessage,
      });
    }
  };

  /**
   * Logout
   */
  const logoutHandler = async () => {
    await dispatch(logout());

    await Keychain.resetGenericPassword();
  };

  /**
   * DidMount
   */
  useEffect(() => {
    fetchInitialData();

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
        title="Repositories"
        bgColor="#fff"
        canLogout
        logout={logoutHandler}
      />
      <Section>
        {isFetchingNow && <Loader marginTop={100} size="large" />}
      </Section>
      <EmptyRepositories
        isFetchingNow={isFetchingNow}
        repositories={repositories}
      />
      <Repositories
        isFetchingNow={isFetchingNow}
        repositories={repositories}
        onPressItem={onPressItemHandler}
        deleteItem={prepareDeleteItemHandler}
      />
      {errorModalState.isVisible && (
        <InfoModal
          isVisible={errorModalState.isVisible}
          onPress={closeErrorModal}
          header={errorModalState.title}
          message={errorModalState.message}
        />
      )}
      {confirmModalState.isVisible && (
        <ConfirmModal
          isVisible={confirmModalState.isVisible}
          cancel={closeConfirmModal}
          submit={confirmDeleteItemHandler}
          isLoading={isLoadingNow}
          repoName={R.path(['repo', 'name'], confirmModalState)}
          header={confirmModalState.title}
          message={confirmModalState.message}
        />
      )}
      <AddButton onPress={addRepoHandler} />
    </View>
  );
};

export default RepositoriesView;
