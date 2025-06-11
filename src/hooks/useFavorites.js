import { useState, useEffect, useCallback } from "react";

export function useFavorites() {
  const [favUsers, setFavUsers] = useState(() => {
    const saved = localStorage.getItem("favUsers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favUsers", JSON.stringify(favUsers));
  }, [favUsers]);

  const add = useCallback((user) => {
    setFavUsers((prev) => {
      const alreadyExists = prev.some((u) => u.id === user.id);
      if (alreadyExists) return prev;

      const withAge = user.age
        ? user
        : {
            ...user,
            age: Math.floor(Math.random() * 43) + 18,
          };

      return [...prev, withAge];
    });
  }, []);

  const remove = useCallback((id) => {
    setFavUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const update = useCallback((updatedUser) => {
    setFavUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  }, []);

  return { favUsers, add, remove, update };
}
