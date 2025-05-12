export const loadStateFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    auth: {
      token: token ? token : null,
      user: user ? JSON.parse(user) : null,
    },
  };
};
