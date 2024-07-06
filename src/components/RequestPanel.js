import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PanelContainer = styled.div`
  background-color: #1e1e1e;
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const MethodSelect = styled.select`
  background-color: #3c3c3c;
  color: #d4d4d4;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
`;

const UrlInput = styled.input`
  background-color: #3c3c3c;
  color: #d4d4d4;
  border: none;
  padding: 5px 10px;
  flex-grow: 1;
  margin-right: 10px;
`;

const NumberInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  background-color: #3c3c3c;
  color: #d4d4d4;
  border: none;
  padding: 5px 10px;
  width: 92px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #0e639c;
  color: #ffffff;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  &:hover {
    background-color: #1177bb;
  }
`;

const BodyTextarea = styled.textarea`
  background-color: #3c3c3c;
  color: #d4d4d4;
  border: none;
  padding: 10px;
  width: 96%;
  height: 200px;
  margin-top: 20px;
  font-family: monospace;
`;

const RequestTitle = styled.h3`
  color: #cccccc;
  margin-bottom: 10px;
`;

function RequestPanel({ setResponse }) {
  const defaultUrl = 'https://jsonplaceholder.typicode.com/posts';
  const [url, setUrl] = useState(defaultUrl);
  const [method, setMethod] = useState('POST');
  const [body, setBody] = useState('');
  const [requestCount, setRequestCount] = useState();
  

  useEffect(() => {
    setUrl(defaultUrl);
    if (method === 'GET') {
      setBody('');
    } else {
      setBody(JSON.stringify({
        "key": "value",
        "number": 42,
        "other": {
          "array": [1, 2, 3]
        }
      }, null, 2));
    }
  }, [method]);

  const handleSend = async () => {
    const startTime = Date.now();
    try {
      if (requestCount === 1 || requestCount === undefined) {
        const response = await axios({
          method,
          url,
          data: method !== 'GET' ? JSON.parse(body) : undefined,
        });
        const endTime = Date.now();
        setResponse({ 
          single: response.data, 
          status: response.status,
          time: endTime - startTime 
        });
      } else {
        const requests = Array(requestCount).fill().map((_, index) => 
          axios({
            method,
            url,
            data: method !== 'GET' ? JSON.parse(body) : undefined,
          }).then(response => ({ index, status: response.status }))
        );
        
        const responses = await Promise.all(requests);
        const endTime = Date.now();
        setResponse({ 
          multiple: responses,
          time: endTime - startTime 
        });
      }
    } catch (error) {
      const endTime = Date.now();
      setResponse({ 
        error: error.message,
        time: endTime - startTime 
      });
    }
  };

  return (
    <PanelContainer>
      <RequestTitle>Request</RequestTitle>
      <InputGroup>
        <MethodSelect value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </MethodSelect>
        <UrlInput
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
      </InputGroup>
      <InputGroup>
        <NumberInput
          type="number"
          value={requestCount}
          onChange={(e) => setRequestCount(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          placeholder="Request count"
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputGroup>
      {method !== 'GET' && (
        <BodyTextarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter request body (JSON)"
        />
      )}
    </PanelContainer>
  );
}

export default RequestPanel;