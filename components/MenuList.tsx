import MenuItem, { MenuItemType } from "./MenuItem";

type Props = {
  isExpanded: boolean;
  options: MenuItemType[];
};

function MenuList({ isExpanded, options }: Props) {
  return (
    <>
      {options.map((item, index) => {
        return (
          <MenuItem
            {...item}
            index={index}
            isExpanded={isExpanded}
            key={index}
          />
        );
      })}
    </>
  );
}

export default MenuList;
