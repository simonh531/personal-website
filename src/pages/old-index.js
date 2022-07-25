import React, { useState, useCallback, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import Triangles from '../components/triangles';
import Bars from '../components/bars';
import Card from '../components/card';

import DataContext from '../components/dataContext';

// import SEO from "../components/seo"

import { calcParallax, calcShadow } from '../utils';

const MainTriangles = styled(Triangles)`
  height: 100vh;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  ${calcParallax(0.05)}
  ${calcShadow(0.05)}
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TitleContainer = styled.div`
  width: 50%;
  padding: 70px 0 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 50px;
    flex: 1;
    max-height: 75vh;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  /* transform-style: flat; */
  perspective: 10000px;
  ${calcParallax(0.05)}
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
    bottom: 10px;
  }

  to {
    opacity: 1;
    bottom: 0;
  }
`;

const AppearBox = styled.div`
  position: relative;
  animation: ${appear} 1s ${(props) => props.delay}s both;
`;

const StyledCard = styled(Card)`
  font-family: Oswald, sans-serif;
  background-color: rgba(255,255,255,0.8);
  ${calcShadow(0.05)}
  font-size: 4.8em;
  padding: 4px;
  letter-spacing: 0.2ch;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 3.6em;
  }
`;

const Key = styled.span`
  backface-visibility: hidden;
`;

const StuffBox = styled.div`
  position: relative;
  display: flex;
`;

const StuffCard = styled(StyledCard)`
  padding: 0;
  width: calc(9ch + 10px);
  margin-left: 0.25ch;
  margin-right: 0.25ch;
  transition: transform 0.7s;
`;

const GraphicContainer = styled.div`
  pointer-events: none;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
  ${calcParallax(0.08)};
  animation: ${appear} 1s 1.8s both;
`;

const Graphic = styled.img`
  width: 50%;
  height: 80%;
  position: absolute;
  bottom: ${(props) => (props.show ? '5%' : '-100vh')};
  right: 50px;
  z-index:  ${(props) => (props.show ? '1' : '0')};
  transition: bottom 0.7s;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 100%;
    height: 25%;
    right: 0;
  }
`;

const Content = styled.div`
  position: relative;
  padding-bottom: 100px;
  background-color: white;
`;

const LineContainer = styled.div`
  overflow: hidden;
  display: flex;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  bottom: 0;
  ${calcParallax(0.08)}

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const Line = styled.div`
  width: 30px;
  position: relative;
  bottom: 20px;
  font-family: 'Merriweather', serif;
  font-size: 30px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dashes = styled.svg`
  width: 5px;
  height: 800px;
`;

const ContentSection = styled.section`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-right: 30px;
  }
`;

const SectionTitle = styled.h1`
  font-family: 'Merriweather', serif;
  font-weight: 400;
`;

const Text = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2em;
  line-height: 1.5;
  text-align: justify;
`;

const SectionHalf = styled.div`
  padding: 20px;
  flex: 1;
`;

const Reveal = styled.div`
  font-family: 'Source Code Pro', monospace;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const BarContent = styled(Bars)`
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
  ${calcParallax(0.04)}  
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-right: 15px;
  }
`;

const stuffArray = ['Web Apps', 'Apps', 'Stuff'];

const IndexPage = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [count, setCount] = useState(6);
  const [stuffTurns, setStuffTurns] = useState(0);
  const [stuffFront, setStuffFront] = useState(stuffArray[0]);
  const [stuffBack, setStuffBack] = useState(stuffArray[1]);
  const siteData = useContext(DataContext);

  // console.log(siteData);

  const finishIntro = () => setIntroComplete(true);

  const leftArrowClick = useCallback(() => {
    // check if odd
    const back = stuffTurns & 1; // eslint-disable-line no-bitwise
    let modulo = (stuffTurns - 1) % 3;
    if (modulo < 0) {
      modulo += 3;
    }
    if (back) {
      setStuffFront(stuffArray[modulo]);
    } else {
      setStuffBack(stuffArray[modulo]);
    }
    setStuffTurns(stuffTurns - 1);
  }, [stuffTurns]);

  const rightArrowClick = useCallback(() => {
    // check if odd
    const back = stuffTurns & 1; // eslint-disable-line no-bitwise
    let modulo = (stuffTurns + 1) % 3;
    if (modulo < 0) {
      modulo += 3;
    }
    if (back) {
      setStuffFront(stuffArray[modulo]);
    } else {
      setStuffBack(stuffArray[modulo]);
    }
    setStuffTurns(stuffTurns + 1);
  }, [stuffTurns]);
  // const [chest, setChest] = useState(false);

  const decrease = useCallback(() => {
    if (count > 0) {
      setCount(count - 1);
    }
  }, [count]);

  return (
    <>
      {/* <SEO title="Home" /> */}
      <MainTriangles forwardedAs="main" callback={finishIntro}>
        <TitleContainer>
          <TitleGroup>
            <AppearBox delay="1">
              <StyledCard>
                I&apos;m Simon
              </StyledCard>
            </AppearBox>
            <AppearBox delay="1.2">
              <StyledCard
                onClick={decrease}
                back={count ? (<span>{count}</span>) : (
                  <Key className="material-icons">vpn_key</Key>
                )}
              >
                I
              </StyledCard>
            </AppearBox>
            <AppearBox delay="1.4">
              <StyledCard>
                Make
              </StyledCard>
            </AppearBox>
            <AppearBox delay="1.6">
              <StuffBox>
                <StyledCard rotation={0} onClick={leftArrowClick}>
                  {'<'}
                </StyledCard>
                <StuffCard rotation={stuffTurns * 180} back={stuffBack} onClick={rightArrowClick}>
                  {stuffFront}
                </StuffCard>
                <StyledCard rotation={0} onClick={rightArrowClick}>
                  {'>'}
                </StyledCard>
              </StuffBox>
            </AppearBox>
          </TitleGroup>
        </TitleContainer>
        <GraphicContainer>
          <Graphic src="/desktop.svg" show={((stuffTurns % 3) + 3) % 3 === 0} />
          <Graphic src="/mobile.svg" show={((stuffTurns % 3) + 3) % 3 === 1} />
          <Graphic src="/hotend.svg" show={((stuffTurns % 3) + 3) % 3 === 2} />
        </GraphicContainer>
      </MainTriangles>
      <Content>
        <ContentSection>
          <SectionHalf>
            <SectionTitle>Full-stack developer</SectionTitle>
            <Text>
              I build apps from front to back, no help needed.
              I handle everything, from the user interface all the way to the database.
            </Text>
          </SectionHalf>
          <SectionHalf />
        </ContentSection>
        <BarContent forwardedAs="section">
          <SectionHalf />
          <SectionHalf>
            <SectionTitle>Designer</SectionTitle>
            <Text>
              Logos, backgrounds, layouts; I do those too.
            </Text>
          </SectionHalf>
        </BarContent>
        <ContentSection>
          <SectionHalf>
            <SectionTitle>Artist</SectionTitle>
            <Text>
              My medium of choice in the digital world is vector art.
            </Text>
          </SectionHalf>
          <SectionHalf />
        </ContentSection>
        <LineContainer>
          <Line>
            <Dashes>
              <line x1="2.5" y1="0" x2="2.5" y2="800" stroke="black" strokeWidth="5px" strokeDasharray="20" />
            </Dashes>
            X
            <Reveal show={count === 0}>Upcoming</Reveal>
          </Line>
        </LineContainer>
      </Content>
    </>
  );
};

export default IndexPage;