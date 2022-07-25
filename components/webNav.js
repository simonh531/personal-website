import React from 'react';
import { /* useStaticQuery, graphql, */ Link } from 'gatsby';
import styled from 'styled-components';
import { calcShadow } from '../utils';

import Logo from './logo';

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  height: 56px;
  width: 100%;
  padding-left: 10vw;
  background-color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
  transition: background-color 0.2s;

  @media (max-width: 768px) {
    display: none;
  }

  :hover {
    background-color: rgba(255,255,255,0.95);
  }
`;

const Navlink = styled(Link)`
  color: black;
  height: 56px;
  margin: 0 16px;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  line-height: 56px;
  font-size: 2em;

  :hover {
    text-shadow: 0 0 3px rgba(0,0,0,0.5);
  }
  
  @media (max-width: 768px) {
    padding-left: 20px;
  }
`;

const StyledLogo = styled(Logo)`
  height: 56px;
  padding: 3px 0;
`;

const WebNav = () => (
  <Navbar>
    <Navlink to="/">
      <StyledLogo />
    </Navlink>
    <Navlink to="/"> Simon H</Navlink>
    <Navlink to="/web">Web</Navlink>
    <Navlink to="/mobile">Mobile</Navlink>
    <Navlink to="/design">Design</Navlink>
    <Navlink to="/about">About</Navlink>
  </Navbar>
);

export default WebNav;
