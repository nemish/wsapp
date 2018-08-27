import * as React from 'react';
import styled from 'react-emotion';
import emptyImg from '../assets/images/empty.png';
import existImg from '../assets/images/exist.png';

const Bar = styled('div')`
  margin: 5px;
  background: #39d6ff;
  background: linear-gradient(#39d6ff, #00b2e3);
  min-width: 180px;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 2px 0px #013346;
`;

const Title = styled('div')`
  font-size: 16px;
  font-family: Verdana;
  color: #085C6F;
`;

const ContainerList = styled('div')`
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  max-width: 124px;
  background: #619cb7;
  box-shadow: inset 0 0 5px 0 #000;
  margin-top: 10px;
`;

const Item = styled('div')`
  width: 20px;
  height: 20px;
  background: url(${props => props.active ? emptyImg : existImg});
`;

const PLAYERS = Array.from({length: 11}, (v, i) => i);

export default ({participants, name}) => {
  console.log('Players', PLAYERS.map);
  return <Bar>
    <Title>{name}</Title>
    <ContainerList>
      {PLAYERS.map((i, index) => {
        return <Item key={index} active={participants < i} />;
      })}
    </ContainerList>
  </Bar>
}
