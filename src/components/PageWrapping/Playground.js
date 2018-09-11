import React from 'react';
import styled from 'styled-components';
import wrapPages from 'page-wrapping';
import { compose, withState, withProps, withHandlers } from 'recompose';
import Node from './Node';
import Sidebar from './Sidebar';
import { gridBackground } from '../../styled/backgrounds';

const node = (params) => ({
  left: params.left,
  top: params.top,
  id: params.id,
  width: params.width,
  height: params.height,
  break: params.break || false,
  fixed: params.fixed || false,
  children: params.children || [],
  onNodeWrap: params.onNodeWrap || null,
  minPresenceAhead: params.minPresenceAhead || null,
  wrap: params.wrap === undefined ? true : params.wrap,
  clone() {
    const clone = node(this);
    clone.children = clone.children.map(c => c.clone());
    return clone;
  }
});

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  ${gridBackground}
`;

const Viewer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
`;

const SubPagesWrapper = styled.div`
  margin: auto;
  align-self: center;
`;

const SubPage = styled.div`
  margin-bottom: 20px;
`;

const flatNodes = nodes => {
  if (!nodes) return [];

  return nodes.reduce((acc, node) => (
    acc.concat(node).concat(node.children ? flatNodes(node.children) : [])
  ), [])
};

const renderNode = (node, isRoot = false) => (
  <Node
    root={isRoot}
    width={node.width}
    height={node.height}
    left={node.left}
    top={node.top}
    // selected={selectedNode.id === 1}
    // onClick={onNodeClick(nodes)}
  >
    {node.children.map(child => renderNode(child))}
  </Node>
)

const Playground = ({ nodes, wrappedNodes, selectedNode, pageHeight, setPageHeight, onNodeClick }) => (
  <Wrapper>
    <Viewer>
      {renderNode(nodes, true)}
      <SubPagesWrapper>
        {wrappedNodes.map((page, i) => (
          <SubPage key={i}>
            {renderNode(page[0], true)}
          </SubPage>
        ))}
      </SubPagesWrapper>
    </Viewer>
    <Sidebar pageHeight={pageHeight} onPageHeightChange={setPageHeight} />
  </Wrapper>
);

const initialNodes = node({
  id: 1,
  left: 0,
  top: 0,
  width: 500,
  height: 500,
  children: [
    node({
      id: 6,
      left: 0,
      top: 0,
      width: 20,
      height: 20,
      fixed: true
    }),
    node({
      id: 2,
      left: 0,
      top: 20,
      width: 100,
      height: 100,
    }),
    node({
      id: 3,
      left: 200,
      top: 200,
      width: 100,
      height: 100,
      children: [
        node({
          id: 5,
          left: 20,
          top: 20,
          width: 70,
          height: 70,
          children: [
            node({
              id: 7,
              left: 20,
              top: 20,
              width: 30,
              height: 30,
            }),
          ]
        }),
      ]
    }),
    node({
      id: 4,
      left: 400,
      top: 220,
      width: 100,
      height: 100,
    })
  ]
});

const wrappedNodes = props => ({
  wrappedNodes: wrapPages(props.nodes, props.pageHeight)
})

const onNodeClick = props => node => e => {
  e.stopPropagation();
  props.setSelectedNode(node);
};

export default compose(
  withState('nodes', 'setNodes', initialNodes),
  withState('pageHeight', 'setPageHeight', 130),
  withState('selectedNode', 'setSelectedNode', {}),
  withProps(wrappedNodes),
  withHandlers({ onNodeClick }),
)(Playground);
