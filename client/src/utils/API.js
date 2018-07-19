import axios from "axios";

export default {
  saveUser: (userData) => {
    return axios.post("/api/users", userData);
  },
  loginUser: (userData) => {
    return axios.post("/api/user/login", userData);
  },
  getUsers: () => {
    return axios.get("/api/users");
  },
  getTodos: (listID) => {
    return axios.get("/api/routes/listItems/" + listID);
  },
  // Saves Todos to database
  saveTodos: (TodosData) => {
    return axios.post("/api/routes/listItems", TodosData);
  },
  // Deletes the Todo with the given id
  deleteTodos: (id) => {
    return axios.delete("/api/routes/listItems/" + id);
  },
  // Gets all Lists
  getLists: () => {
    return axios.get("/api/routes/list");
  },
  // Saves List to database
  saveLists: (listData) => {
    return axios.post("/api/routes/list", listData);
  },
  // Deletes the List with the given id
  deleteLists: (id) => {
    return axios.delete("/api/routes/list/" + id);
  }
};