import React from 'react';
import styled from 'styled-components';

/**
 * breakpoints: 400, 500, 700, 1100, 1700
 * names:
 *  < 400   Tiny    xs
 *  < 500   Phone   s
 *  < 700   Tablet  m
 *  < 1100  PC      l
 *  *       HDTV+   xl
 */

const lock = ({width = 500, children = null, ...props}) => (
  <>
    <span dangerouslySetInnerHTML={{__html: `<!-- Breakpoint Lock: ${width}px wide -->`}} />
    <div {...props}>
      {children}
    </div>
  </>
);

const BreakpointLock = styled(lock).attrs(() => ({ width: 500 }))`
  height: 100%;
  
  @media screen and (min-width: ${props => props.width}px) {
    margin: 0 auto;
    max-width: ${props => props.width}px;
    box-shadow: 0 0 0 50vw black;
  }
`;

export default BreakpointLock;