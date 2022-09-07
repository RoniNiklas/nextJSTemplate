import * as React from 'react';
import Case from '../Case';
import Default from '../Default';

type Props = {
  expression: any
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

const isDefault = (child: ValidIfChildren | typeof Default)
: child is typeof Default => isAReactElement(child)
  && typeof child.type !== 'string'
    && child.type.name === Default.name;

const isCase = (child: ValidIfChildren | typeof Case)
: child is typeof Case => isAReactElement(child)
    && typeof child.type !== 'string'
    && child.type.name === Case.name;

const Switch = ({ children, expression } : Props) => {
  const childArray = Array.isArray(children)
    ? children
    : [children];

  // to find the first Case JSX.Element
  // we find the first child that is a function by the name Case
  const caseIndex = childArray.findIndex((child) => {
    if (isCase(child)) {
      // VS Code linter complains about this props call, but it compiles and works
      return (child as any).props.rCase === expression;
    }

    return false;
  });

  const defaultIndex = childArray.findIndex((child) => isDefault(child));

  const defaultCount = childArray.filter((child) => isDefault(child)).length;

  if (defaultCount > 1) {
    throw new Error('Only one default can be handled per switch block');
  }

  if (defaultCount === 0) {
    throw new Error('A switch requires a default statement');
  }

  if (defaultIndex < caseIndex && defaultIndex >= 0 && caseIndex >= 0) {
    throw new Error('Do not put cases after default');
  }

  const indexes = [caseIndex, defaultIndex].filter((item) => item >= 0);
  const nextElementIndex = Math.min(...indexes);
  const shownChildren = childArray[nextElementIndex];

  return (
    <div>
      {(shownChildren)}
    </div>
  );
};

export default Switch;
