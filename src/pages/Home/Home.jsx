import React from "react";

import { useFetch } from "../../hooks/useFetch";
import { useFavorites } from "../../hooks/useFavorites";
import { transformUsers } from "../../utils/transformUsers";

import UserList from "../../components/UserList/UserList";
import styles from "./Home.module.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function Home() {
  const { favUsers, add, remove } = useFavorites();

  const {
    data: users,
    loading,
    error,
  } = useFetch(API_URL, (data) => {
    const usersWithAge = transformUsers(data);

    if (!localStorage.getItem("usersWithAge")) {
      localStorage.setItem("usersWithAge", JSON.stringify(usersWithAge));
    }

    return usersWithAge;
  });

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Users</h1>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/favorites">Favorites</a>
        </nav>
      </div>

      <UserList
        users={users}
        favUsers={favUsers}
        onToggleFavorite={(user, isFavorite) =>
          isFavorite ? remove(user.id) : add(user)
        }
      />
    </div>
  );
}

export default Home;
