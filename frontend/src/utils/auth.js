export const isAuthenticated = () => {
  return !!localStorage.getItem("user_id");
};

export const logout = () => {
  localStorage.removeItem("user_id");
};
