type Props<T> = {
  items: T[],
  Child: React.JSXElementConstructor<T>
};

const ComponentMap = <T extends object>({ items, Child }: Props<T>) => (
  <>
    {
      items.map((item) => <Child {...item} />)
    }
  </>
);

export default ComponentMap;
