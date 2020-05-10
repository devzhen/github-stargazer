import * as R from 'ramda';
import React from 'react';

import Message from '@components/Message';

interface EmptyRepositoriesInterface {
  repositories: any;
  isFetchingNow: boolean;
}

const EmptyRepositories = ({
  repositories,
  isFetchingNow,
}: EmptyRepositoriesInterface) => {
  if (isFetchingNow || !R.isEmpty(repositories)) {
    return null;
  }

  return <Message message="User doesn't have repositories." offsetTop={30} />;
};

export default EmptyRepositories;
