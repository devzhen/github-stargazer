import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginView from './modules/auth/views/LoginView';
import RepositoriesView from './modules/repositories/views/RepositoriesView';
import RepositoryDetailView from './modules/repositories/views/RepositoryDetailView';
import RepositoryAddView from './modules/repositories/views/RepositoryAddView';
import { getIsAuthenticated } from './modules/auth/auth.reducer';
import ROUTES from './modules/navigation/models/index';

const Stack = createStackNavigator();

const RootContainer = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated && (
          <Stack.Screen
            name={ROUTES.LOGIN}
            component={LoginView}
            options={{ header: () => null }}
          />
        )}
        {isAuthenticated && (
          <>
            <Stack.Screen
              name={ROUTES.REPOSITORIES}
              component={RepositoriesView}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name={ROUTES.REPOSITORY_DETAIL}
              component={RepositoryDetailView}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name={ROUTES.REPOSITORY_ADD}
              component={RepositoryAddView}
              options={{ header: () => null }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootContainer;
