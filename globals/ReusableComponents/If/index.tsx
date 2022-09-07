import * as React from 'react';
import Else from '../Else';
import ElseIf from '../ElseIf';

type Props = {
  rif: boolean
  children: ValidIfChildren
};

type ValidIfChildren = string | JSX.Element | ValidIfChildren[];

const isAReactElement = (child: React.ReactNode | React.JSXElementConstructor<any>):
child is JSX.Element => child !== null
  && child !== undefined
  && typeof child !== 'string'
  && typeof child !== 'number'
  && typeof child !== 'boolean'
  && 'type' in child
  && typeof child.type !== 'string'
  && 'name' in child.type;

const isElse = (child: ValidIfChildren | typeof Else)
: child is typeof Else => isAReactElement(child)
  && typeof child.type !== 'string'
    && child.type.name === Else.name;

const isElseIf = (child: ValidIfChildren | typeof ElseIf)
: child is typeof ElseIf => isAReactElement(child)
    && typeof child.type !== 'string'
    && child.type.name === ElseIf.name;

const If = ({ children, rif } : Props) => {
  const childArray = Array.isArray(children)
    ? children
    : [children];

  // to find the first ElseIF JSX.Element
  // we find the first child that is a function by the name ElseIf
  // if rif is true just take the first elif, else find the first elIf that is true
  const elseIfIndex = childArray.findIndex((child) => {
    if (isElseIf(child)) {
      // VS Code linter complains about this props call, but it compiles and works
      return (child as any).props.elIf || rif;
    }

    return false;
  });

  const elseIndex = childArray.findIndex((child) => isElse(child));

  const elseCount = childArray.filter((child) => isElse(child)).length;

  if (elseCount > 1) {
    throw new Error('Only one else can be handled per if block');
  }

  if (elseIfIndex > elseIndex && elseIfIndex >= 0 && elseIndex >= 0) {
    throw new Error('Do not put else if after else');
  }

  const indexes = [elseIfIndex, elseIndex].filter((item) => item >= 0);
  const nextElementIndex = Math.min(...indexes);

  const shownChildren = rif
    ? childArray.slice(0, nextElementIndex)
    : childArray[nextElementIndex];

  return (
    <>
      {shownChildren}
    </>
  );
};

export default If;
