import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  align-self: center;
  transition: all .2s;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  margin: ${props => props.root ? 'auto' : '0px'};
  position: ${props => props.root ? 'relative' : 'absolute'};
  background: ${props => props.hovered ? '#fbe7e4' : 'white' };
  box-shadow: ${props => props.selected
    ? '0 0 0 2px #8D1602, 0 0 15px rgba(0,0,0,.2), inset 0 0 0 1px hsla(0,0%,100%,.2)'
    : 'inset 0 0 0 1px rgba(48,56,69,.2)'};
`;

class Node extends React.Component {
  state = { hovered: false }

  onMouseMove = e => {
   this.setState({ hovered: e.target === this._ref });
  };

  onMouseLeave = e => this.setState({ hovered: false });

  render () {
    const { children, ...props } = this.props;

    return (
      <Wrapper
        {...this.props}
        {...this.state}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        innerRef={ref => { this._ref = ref; }}
      />
    )
  }
};

export default Node;
