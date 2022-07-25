import React from 'react';
import { /* useStaticQuery, graphql, */ Link } from 'gatsby';

import styled from 'styled-components';
import Logo from './logo';

const FooterContainer = styled.footer`
  background-color: #444444;
  display: flex;
  flex: 0 0 auto;
`;

const Spacer = styled.div`
  flex: 1;
`;

const FooterCenter = styled.div`
  flex: 4 0 auto;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Name = styled.div`
  font-family: 'Merriweather', serif;
  color: white;
  font-size: 1.6em;
`;

const FooterLogo = styled(Logo)`
  height: 100px;
`;

const LinkList = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  margin: 5px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const Footer = () => (
  <FooterContainer>
    <Spacer />
    <FooterCenter>
      <LinkList>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/web">Web</FooterLink>
        <FooterLink to="/mobile">Mobile</FooterLink>
        <FooterLink to="/design">Design</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
      </LinkList>
      <Info>
        <FooterLogo />
        <Name>Simon Huang</Name>
        <a href="https://www.linkedin.com/in/simon-huang-25b931104" target="_blank" rel="noopener noreferrer"><img src="/Logo-2C-28px-R.png" alt="LinkedIn" style={{ display: 'block' }} /></a>
      </Info>
    </FooterCenter>
    <Spacer />
  </FooterContainer>
);

export default Footer;
