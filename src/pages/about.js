import React, { useState, useReducer, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { graphql } from 'gatsby';
// import { BasicInput } from 'inputs';

import Card from '../components/card';

import Triangles from '../components/triangles';

// import SEO from "../components/seo"

const Header = styled(Triangles)`
  position: relative;
  z-index: 1;
  background-color: white;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
`;

const Banner = styled.div`
  padding: 70px 50px 50px;
  display: flex;
  
  @media (max-width: 768px) {
    padding-top: 50px
  }
`;

const StyledCard = styled(Card)`
  font-family: Oswald, sans-serif;
  background-color: rgba(255,255,255,0.8);
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
  font-size: 3em;
  padding: 4px;
  letter-spacing: 0.2ch;
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  background-color: white;
`;

const LeftMargin = styled.div`
  width: 300px;
  height: 100%;
  flex-shrink: 0;
`;

const TextContainer = styled.div`
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2em;
  line-height: 150%;
  text-indent: 2ch;
`;

const ContentfulText = styled.span`
  p:last-child {
    margin-bottom: calc(0.5em - 1px);
  }
`;

const openForm = css`${
  keyframes`
    0% {
      width: 0;
      height: 0;
      border-width: 0;
    }

    1% {
      width: 0;
      height: 0;
      border-width: 1px 0;
    }

    50% {
      width: 100%;
      height: 0;
      border-width: 1px 0;
    }

    100% {
      width: 100%;
      height: 100px;
      border-width: 1px 0;
    }
  `
}`;

const closeForm = css`${
  keyframes`
    0% {
      width: 100%;
      height: 100px;
      border-width: 1px 0;
    }

    50% {
      width: 100%;
      height: 2px;
      border-width: 1px 0;
    }

    99% {
      width: 0;
      height: 2px;
      border-width: 1px 0;
    }

    100% {
      width: 0;
      height: 2px;
      border-width: 0;
    }
  `
}`;

const PasswordForm = styled.form`
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  height: 0;
  border-top: 0 solid #888888;
  border-bottom: 0 solid #888888;
  margin: auto;
  background-color: #888888;
  box-shadow: inset 0 0 20px 20px rgba(0,0,0,0.2);
  animation: ${(props) => css`${props.animation}`} 1s both;
  overflow: hidden;
`;

const PasswordInput = styled.input`
  font-family: 'Source Code Pro', monospace;
`;

const InteractiveParagraph = styled.p`
  margin-top: calc(0.5em - 1px);
`;

const PasswordShow = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const Portrait = styled.div`
  height: 640px;
  width: 320px;
  background-color: blue;
  flex-shrink: 0;
`;

const setHTML = (html) => ({ __html: html });

const Websites = ({ data }) => {
  const [animation, setAnimation] = useState(null);
  const toggleAnimation = () => {
    if (animation === openForm) {
      setAnimation(closeForm);
    } else {
      setAnimation(openForm);
    }
  };

  return (
    <>
      <Header forwardedAs="header">
        <Banner>
          <StyledCard>About</StyledCard>
        </Banner>
      </Header>
      <Main>
        <LeftMargin />
        <TextContainer>
          <ContentfulText
            dangerouslySetInnerHTML={setHTML(data.contentfulText.text.childMarkdownRemark.html)}
          />
          <PasswordForm animation={animation}>
            <PasswordInput />
            <button>enter</button>
          </PasswordForm>
          <InteractiveParagraph>
            If you&apos;re interested in knowing more,
            you&apos;ll find clues for a password hidden around this website.
            {' '}
            <PasswordShow onClick={toggleAnimation}>Click me</PasswordShow>
            {' '}
            to open up the password entry form and good luck with your sleuthing!
            You could also contact me below for the password too!
          </InteractiveParagraph>
        </TextContainer>
        <Portrait />
      </Main>
    </>
  );
};

export const query = graphql`
  query MyQuery {
    contentfulText(name: {eq: "About Page"}) {
      text {
        childMarkdownRemark {
          html
        }
      }
    }
}
`;

export default Websites;
