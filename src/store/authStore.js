import { defineStore } from "pinia";
import axios from "@/scripts/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    authErrors: [],
    authStatus: null
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    status: (state) => state.authStatus,
  },
  actions: {
    async getUser() {
      await axios.get("/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
      })
        .then((response) => {
          this.authUser = response.data;
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.authErrors = error.response.data.errors;
          }
        })

    },
    async handleLogin(data) {
      this.authErrors = [];

      await axios.post("/login", data)
        .then((response) => {
          localStorage.setItem('accessToken', response.data.token)
          this.router.push("/")
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.authErrors = error.response.data.errors;
          }
        })
    },
    async handleRegister(data) {
      this.authErrors = [];

      await axios.post("/register", data)
        .then((response) => {
          localStorage.setItem('accessToken', response.data.token)
          this.router.push("/")
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.authErrors = error.response.data.errors;
          }
        })
    },
    async handleLogout() {
      await axios.post("/logout")
        .then(() => {
          localStorage.removeItem('accessToken');
          this.router.push("/login")
          this.authUser = null;
        });
    },
  },
});
