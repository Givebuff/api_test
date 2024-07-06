import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #252526;
`;

const SidebarTitle = styled.h2`
  color: #cccccc;
  margin-bottom: 20px;
`;

const RequestList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RequestItem = styled.li`
  margin-bottom: 10px;
`;

const RequestLink = styled(Link)`
  color: #cccccc;
  text-decoration: none;
  &:hover {
    color: #ffffff;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarTitle>Sidebar</SidebarTitle>
      <RequestList>
        <RequestItem><RequestLink to="/">Sidebar 1</RequestLink></RequestItem>
        <RequestItem><RequestLink to="/">Sidebar 2</RequestLink></RequestItem>
      </RequestList>
    </SidebarContainer>
  );
}

export default Sidebar;