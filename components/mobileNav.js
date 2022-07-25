import React from 'react';
import PropTypes from 'prop-types';
import { /* useStaticQuery, graphql, */ Link } from 'gatsby';

import styled from 'styled-components';

import Hexagon from './hexagon';
import Logo from './logo';

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

const NavButton = styled.button`
  padding: 0;
  align-items: center;
  justify-content: center;
  display: none;
  position: fixed;
  top: 30px;
  right: 20px;
  border: 0;
  background: none;
  transform: rotate(${(props) => (props.rotated ? '0' : '-360')}deg);
  transition: transform 0.4s;
  z-index: 2;
  outline: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavDrawer = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  width: 200px;
  padding-top: 30px;
  top: 0;
  left: ${(props) => (props.show ? '0' : '-200px')};
  transition: left 0.4s, box-shadow 0.4s;
  z-index: 1;
  box-shadow: ${(props) => (props.show ? '0 0 1px 1px rgba(0,0,0,0.5)' : 'unset')};
`;

const LogoContainer = styled.div`
  width: 64px;
  height: 73.900834456272097857171043904251px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Hexagon isn't inside HomeShadow so it isn't affected by blur
const HomeShadow = styled(Hexagon)`
  position: absolute;
  filter: blur(2px);
`;

const CenteredHexagon = styled(Hexagon)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  width: 38px;
  position: relative;
  bottom: 0.5px;
`;

const MobileNav = ({ buttonClick, close, show }) => (
  <>
    <NavButton rotated={show} onClick={buttonClick}>
      <LogoContainer>
        <HomeShadow width={66} color="rgba(0,0,0,0.5)" />
        <CenteredHexagon width={64}>
          <StyledLogo />
        </CenteredHexagon>
      </LogoContainer>
    </NavButton>

    <NavDrawer show={show}>
      <Navlink to="/" onClick={close}>Home</Navlink>
      <Navlink to="/web" onClick={close}>Web</Navlink>
      <Navlink to="/mobile" onClick={close}>Mobile</Navlink>
      <Navlink to="/design" onClick={close}>Design</Navlink>
      <Navlink to="/about" onClick={close}>About</Navlink>
    </NavDrawer>
  </>
);

MobileNav.propTypes = {
  buttonClick: PropTypes.func,
  close: PropTypes.func,
  show: PropTypes.bool,
};

MobileNav.defaultProps = {
  buttonClick: () => {},
  close: () => {},
  show: false,
};

export default MobileNav;
