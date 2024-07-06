import React, { useState } from 'react';
import styled from 'styled-components';
import RequestPanel from './RequestPanel';
import ResponsePanel from './ResponsePanel';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const LeftPanel = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const RightPanel = styled.div`
  flex: 1;
`;

function RequestResponseContainer() {
  const [response, setResponse] = useState(null);

  return (
    <Container>
      <LeftPanel>
        <RequestPanel setResponse={setResponse} />
      </LeftPanel>
      <RightPanel>
        <ResponsePanel response={response} />
      </RightPanel>
    </Container>
  );
}

export default RequestResponseContainer;