import { TreeDataItem } from "@/components/tree-view";

export const findItemById = (
  data: TreeDataItem[],
  id: string
): TreeDataItem | null => {
  for (const item of data) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const addItem = (
  data: TreeDataItem[],
  parentId: string,
  newItem: TreeDataItem
): TreeDataItem[] => {
  return data.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        children: item.children ? [...item.children, newItem] : [newItem],
      };
    }
    if (item.children) {
      return {
        ...item,
        children: addItem(item.children, parentId, newItem),
      };
    }
    return item;
  });
};

export const removeItem = (
  data: TreeDataItem[],
  id: string
): TreeDataItem[] => {
  return data
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      children: item.children ? removeItem(item.children, id) : [],
    }));
};
export const itemExistsInTree = (data: TreeDataItem[], id: string): boolean => {
  for (const item of data) {
    if (item.id === id) {
      return true;
    }
    if (item.children && itemExistsInTree(item.children, id)) {
      return true;
    }
  }
  return false;
};
/*

// Example usage
const newItem: TreeDataItem = { id: "7", name: "Item 1.3" };
const updatedData = addItem(data, "1", newItem);
console.log(updatedData);

const foundItem = findItemById(data, "3");
console.log(foundItem);

const dataAfterRemoval = removeItem(data, "3");
console.log(dataAfterRemoval);

*/
