"use client";
import { TreeDataItem, TreeView } from "@/components/tree-view";
import { addItem, findItemById, itemExistsInTree } from "@/utils/tree-utils";
import { useEffect, useState } from "react";

const initialData: TreeDataItem[] = [];
const Page = () => {
  const [todos, setTodos] = useState<TreeDataItem[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchComments = (id: string) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/comments/${id?.split("_")[1]}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const parentItem = findItemById(todos, id);
          const itemExists = itemExistsInTree(todos, `comment_${data.id}`);
          console.log("itemExists", itemExists);
          if (!itemExists) {
            const newItem = {
              name: data.name,
              id: `comment_${data.id}`,
              icon: "flat-color-icons:folder",
            };
            const updatedData = addItem(todos, parentItem?.id || "", newItem);
            console.log("updatedData", updatedData);
            setTodos(updatedData);
          } else {
            console.log("Item already exists");
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comment:", error);
        setLoading(false);
      });
  };
  const handleFetchUsers = (id: string) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id?.split("_")[1]}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const parentItem = findItemById(todos, id);
          const itemExists = itemExistsInTree(todos, `user_${data.id}`);
          console.log("itemExists", itemExists);
          if (!itemExists) {
            const newItem = {
              name: data.name,
              id: `user_${data.id}`,
              icon: "flat-color-icons:folder",
            };
            const updatedData = addItem(todos, parentItem?.id || "", newItem);
            console.log("updatedData", updatedData);
            setTodos(updatedData);
          } else {
            console.log("Item already exists");
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  };

  const handleFetchPost = (id: string) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id?.split("_")[1]}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const parentItem = findItemById(todos, id);
          const itemExists = itemExistsInTree(todos, `post_${data.id}`);
          if (!itemExists) {
            const newItem = {
              name: data.title,
              id: `post_${data.id}`,
              icon: "flat-color-icons:folder",
            };
            const updatedData = addItem(todos, parentItem?.id || "", newItem);
            console.log("updatedData", updatedData);
            setTodos(updatedData);
          } else {
            console.log("Item already exists");
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setLoading(false);
      });
  };

  // handle fetch todos
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const newData = data.map((item: { id: string; title: string }) => {
            return {
              id: `todo_${item.id}`,
              name: item.title,
              icon: "flat-color-icons:folder",
            };
          });
          setTodos(newData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  const handleHierarchyTreeSelection = (
    selectedItem: TreeDataItem | undefined
  ) => {
    const [type, id] = selectedItem?.id.split("_") || [];
    if (type === "todo") {
      handleFetchPost(`todo_${id}`);
    }
    if (type === "post") {
      handleFetchUsers(`post_${id}`);
    }
    if (type === "user") {
      handleFetchComments(`user_${id}`);
    }
  };

  return (
    <div className="border rounded-lg w-96 mx-auto p-1">
      <TreeView
        data={todos}
        onSelectChange={handleHierarchyTreeSelection}
        loading={loading}
      />
    </div>
  );
};

export default Page;
