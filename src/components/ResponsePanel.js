import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const ResponseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ResponseTitle = styled.h3`
  color: #cccccc;
  margin: 0;
`;

const ResponseContent = styled.pre`
  background-color: #252526;
  color: #d4d4d4;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

function beautifyJSON(obj) {
  return JSON.stringify(obj, null, 2);
}

function ResponsePanel({ response }) {
  if (!response) {
    return <PanelContainer>
        <ResponseTitle>Response</ResponseTitle>
        No response yet
    </PanelContainer>;
  }

  let content;

  if (response.error) {
    content = `Error: ${response.error}`;
  } else if (response.single) {
    content = `Status: ${response.status}\n\n${beautifyJSON(response.single)}`;
  } else if (response.multiple) {
    content = beautifyJSON(
      response.multiple.reduce((acc, res) => {
        acc[`Request ${res.index + 1}`] = `Status: ${res.status}`;
        return acc;
      }, {})
    );
  }

  return (
    <PanelContainer>
      <ResponseHeader>
        <ResponseTitle>Response({response.time ? `${response.time} ms` : ''})</ResponseTitle>
      </ResponseHeader>
      <ResponseContent>{content}</ResponseContent>
    </PanelContainer>
  );
}

export default ResponsePanel;