import * as React from 'react';
import styled from 'react-emotion';
import emptyImg from '../assets/images/empty.png';
import existImg from '../assets/images/exist.png';

const PLAYERS = Array.from({length: 11}, (v, i) => i);

const Bar = styled('div')`
  margin: 5px;
  background: #39d6ff;
  background: linear-gradient(#39d6ff, #00b2e3);
  min-width: 180px;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 2px 0px #013346;
`;


const Input = styled('input')`
  width: 100%;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid #013346;
  box-shadow: inset 0 0 2px 0 #fff;
`;

const Table = ({participants, name}) => {
  return <React.Fragment>
    <Title>{name}</Title>
      <ContainerList>
        {PLAYERS.map((i, index) => {
          return <Item key={index} active={participants < i} />;
        })}
    </ContainerList>
  </React.Fragment>;
}


const ItemEdit = props => {
  return <React.Fragment>
    <Input name="name" />
    <Input name="participants" />
  </React.Fragment>;
}


export default class BarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOut(e) {
    e.preventDefault();
    this.setState({edit: false});
  }

  onMouseOver(e) {
    e.preventDefault();
    this.setState({edit: true});
  }

  render() {
    let elem = null;
    if (this.state.edit) {
      elem = <ItemEdit {...this.props} />;
    } else {
      elem = <Table {...this.props} />;
    }
    return <Bar onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
      {elem}
    </Bar>
  }
}

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
