import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import RequestPanel from './components/RequestPanel';
import ResponsePanel from './components/ResponsePanel';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
  color: #d4d4d4;
`;

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #252526;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

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

function App() {
  const [response, setResponse] = useState(null);

  return (
    <Router>
      <AppContainer>
        {/*Sidebar는 다른 기능 대비*/}
        {/* <SidebarContainer>
          <Sidebar />
        </SidebarContainer> */}
        <MainContent>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LeftPanel>
                    <RequestPanel setResponse={setResponse} />
                  </LeftPanel>
                  <Divider />
                  <RightPanel>
                    <ResponsePanel response={response} />
                  </RightPanel>
                </>
              }
            />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;