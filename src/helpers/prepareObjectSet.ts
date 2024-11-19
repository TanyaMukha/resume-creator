export const prepareObjectSet = (
  value: any[],
  newValue: any[],
  items: any[]
) => {
  let updatedValue = newValue;

  if (newValue.length > 0) {
    const lastItem = newValue[newValue.length - 1];

    if (typeof lastItem === "string") {
      const itemExists = items.find((i) => i.title === lastItem);

      if (itemExists) {
        updatedValue = [
          ...(newValue.length > 1 ? newValue.slice(0, -1) : []),
          itemExists,
        ];
      } else {
        const newItem = {
          id: 0,
          title: lastItem,
        };
        if (!value.find((i) => i.title === lastItem)) {
          updatedValue = [
            ...(newValue.length > 1 ? newValue.slice(0, -1) : []),
            newItem,
          ];
        }
      }
    }
  }

  return updatedValue;
};
