import api from "./api";

export const login = async (username, password) => {
  const { data } = await api.post("token/", { username, password });
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const isAuthenticated = () => !!localStorage.getItem("access");

export const register = async (username, email, password) => {
  const { data } = await api.post("register/", { username, email, password });
  return data;
};