type Props<T> = {
  items: T[],
  getKey: (item: T) => string | number,
  renderItem: (item: T) => React.ReactNode
};

const Map = <T extends unknown>({ items, getKey, renderItem }: Props<T>) => (
  <>
    {
        items.map((item) => {
          const key = getKey(item);
          return (
            <div key={key}>
              {renderItem(item)}
            </div>
          );
        })
    }
  </>
);

export default Map;
