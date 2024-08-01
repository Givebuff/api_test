import React from 'react';
import styled from 'styled-components';
import RequestPanel from './RequestPanel';
import ResponsePanel from './ResponsePanel';

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #3c3c3c;
`;

function RestContainer({response, setResponse}){
    return (
    <>
        <LeftPanel>
            <RequestPanel setResponse={setResponse} />
        </LeftPanel>
        <Divider />
        <RightPanel>
            <ResponsePanel response={response} />
        </RightPanel>
    </>
    )
    ;
}

export default RestContainer;