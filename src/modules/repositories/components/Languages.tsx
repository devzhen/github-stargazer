import * as R from 'ramda';
import React from 'react';
import styled from 'styled-components/native';

import Message from '@components/Message';
import Theme from '@theme/index';

interface LanguagesProps {
  languages: any[];
  isFetchingNow: boolean;
}

const Languages = ({ languages, isFetchingNow }: LanguagesProps) => (
  <Container>
    <Message
      alignment="left"
      message="Languages:"
      offsetBottom={30}
      offsetTop={30}
      size={17}
      color={Theme.colors.orange}
    />
    {isFetchingNow && <Loader size="small" color="#eb9e38" />}
    {!isFetchingNow && R.isEmpty(languages) && (
      <Message
        alignment="left"
        message="There are no languages yet."
        offsetBottom={10}
        color={Theme.colors.lightBlack}
      />
    )}
    {!isFetchingNow &&
      languages.map((item: any) => {
        const name = R.prop('name', item);
        const percent = R.prop('percent', item);

        const message = `${name}: ${percent}`;

        return (
          <Message
            alignment="left"
            key={message}
            message={message}
            offsetBottom={10}
            color={Theme.colors.lightBlack}
          />
        );
      })}
  </Container>
);

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const Loader = styled.ActivityIndicator`
  margin-left: auto;
  margin-right: auto;
`;

export default Languages;
