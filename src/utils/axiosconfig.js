const user = JSON.parse(localStorage.getItem("user")) || {};
const token = user.token || null;

export const config = {
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
