import * as React from 'react';
import styled from 'react-emotion';
import emptyImg from '../assets/images/empty.png';
import existImg from '../assets/images/exist.png';
import removeImg from '../assets/images/remove.png';
import cancelImg from '../assets/images/cancel.svg';
import { getConnection } from '../socket';

const PLAYERS = Array.from({length: 12}, (v, i) => i);


class ItemEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      participants: props.participants,
    };
  }
  
  onNameChange(e){
    this.setState({name: e.target.value});
  }
  
  onParticipantsChange(e){
      this.setState({participants: e.target.value})
  }

  render(){
    return <React.Fragment>
      <Input name="name" value={this.state.name} onChange={this.onNameChange.bind(this)} type="text" />
      <Input name="participants" value={this.state.participants} onChange={this.onParticipantsChange.bind(this)} type="text" />
      <RoundButton2
        onClick={(e) => {              
          e.preventDefault();
          if(this.props.onEditCancel){
            this.props.onEditCancel();
          }
        }}
      >
        CANCEL
      </RoundButton2>
      <RoundButton2 
        onClick={(e) => {
          e.preventDefault();
          if(this.props.onEditSave){
            const { name, participants } = this.state;
            this.props.onEditSave({name, participants});
          }
        }}
      >
        SAVE
      </RoundButton2>
      <CloseDiv onClick={this.props.onEditCancel} />
    </React.Fragment>;
  }
}


export default class LobbyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.onClick = this.onClick.bind(this);
    this.onEditSave = this.onEditSave.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.participants !== this.props.participants
      || nextProps.name !== this.props.name
      || nextState.edit !== this.state.edit
    );
  }

  onClick(e) {
    e.preventDefault();
    this.setState({edit: true});
  }
  
  onEditSave({name, participants}){
    const { id } = this.props;
    this.props.update({id, name, participants});
    this.setState({edit: false});    
  }
  
  onEditCancel(){
    this.setState({edit: false});    
  }      

  render() {
    let elem = null;
    if (this.state.edit) {
      elem = <ItemEdit 
        {...this.props} 
        onEditSave={this.onEditSave}
        onEditCancel={this.onEditCancel}
      />;
    } else {
      elem = <ClickDiv
        onClick={this.onClick}
      >
        <Title>{this.props.name}</Title>
        <ContainerList>
          {PLAYERS.map((i, index) => {
            return <Item key={index} active={this.props.participants <= i} />;
          })}
        </ContainerList>
      </ClickDiv>;
    }
    return <Bar 
            
    >
      {elem}
    </Bar>
  }
}

const ClickDiv = styled('div')`
  cursor: pointer;
`;

const RoundButton = styled('button')`
  margin-top: 5px;
  width: 165px;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid #013346;
  box-shadow: inset 0 0 2px 0 #fff;  
`;

const RoundButton2 = styled(RoundButton)`
  width: 70px;
  margin-right: 15px;
`;

const Bar = styled('div')`
  position: relative;
  margin: 5px;
  background: #39d6ff;
  background: linear-gradient(#39d6ff, #00b2e3);
  min-width: 180px;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 2px 0px #013346;
  input: first-child {
      _margin-top: 5px;
      _margin-bottom: 10px;
  }
`;


const Input = styled('input')`
  margin-top: 5px;
  width: 165px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid #013346;
  box-shadow: inset 0 0 2px 0 #fff;  
  box-sizing: border-box;
`;


const CloseDiv = styled('div')`
  position: absolute;
  height: 10px;
  width: 10px;
  background: url(${cancelImg});
  background-size: contain;
  top: 14px;
  right: 14px;
  cursor: pointer;
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
