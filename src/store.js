import { createPinia, defineStore } from 'pinia';

export const pinia = createPinia();

export const useStore = defineStore({
  id: 'myStore',
  state: () => ({
    users: [],
    searchQuery: '',
    filters: {}
  }),

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    setFilters(filters) {
      this.filters = filters;
    },
    setUsers(users) {
      this.users = users;
    },
    addUser(user) {
        this.users.push(user)
    }
  },

  getters: {
    filteredUsers() {
      let filteredUsers = this.users.filter(user => {
        if (this.searchQuery && 
            !(user.Date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
              user.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
              user.Address.toLowerCase().includes(this.searchQuery.toLowerCase()))) {
          return false;
        }
        return true;
      });
      return filteredUsers;
    }
  }
});
