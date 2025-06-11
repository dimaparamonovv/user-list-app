export function transformUsers(apiUsers) {
  const storedUsers = JSON.parse(localStorage.getItem("usersWithAge") || "[]");

  return apiUsers.map((user) => {
    const [firstName, lastName = ""] = user.name.split(" ");

    const stored = storedUsers.find((u) => u.id === user.id);

    const age = stored?.age ?? Math.floor(Math.random() * 43) + 18;

    return {
      ...user,
      firstName,
      lastName,
      age,
    };
  });
}
