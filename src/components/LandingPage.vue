<template>
  <div class="landingPage">
    <div class="tableContainer">
      <div class="addAndSearch">

        <input
          type="text"
          v-model="searchQuery"
          @input="searchUsers"
          placeholder="Search..."
          class="searchField"
        />

        <button @click="openFormPopup" class="addUserButton">Add User</button>
      </div>

      <TableComponent
        :users="filteredUsers"
        @delete="openConfirmationPopup"
      />

<!-- Excuse me for the lazy way of putting some gap between this two table components, the hardest part in this project was the css -->
      <div class="tableGap"></div>

      <TableComponent
        :users="allUsers"
        :showActions="false"
      />

      <formPopup v-if="isFormPopupOpen" @close="closeFormPopup" @userAdded="fetchUsers" />

      <confirmationPopup
        v-if="isConfirmationPopupOpen"
        @close="closeConfirmationPopup"
        @confirm="deleteConfirmedUser"
      />

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '@/store';
import FormPopup from '@/components/FormPopup.vue';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';
import TableComponent from '@/components/TableComponent.vue';

export default {
  components: {
    FormPopup,
    ConfirmationPopup,
    TableComponent,
  },
  data() {
    return {
      isFormPopupOpen: false,
      isConfirmationPopupOpen: false,
      searchQuery: '',
      userToDelete: null,
    };
  },

  methods: {
    
    openFormPopup() {
      this.isFormPopupOpen = true;
    },
    closeFormPopup() {
      this.isFormPopupOpen = false;
    },

    openConfirmationPopup(userId) {
      this.userToDelete = userId;
      this.isConfirmationPopupOpen = true;
    },
    closeConfirmationPopup() {
      this.isConfirmationPopupOpen = false;
      this.userToDelete = null;
    },
    
    
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        useStore().setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async deleteConfirmedUser() {
      try {
        await axios.delete(`http://localhost:5000/api/users/${this.userToDelete}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        this.closeConfirmationPopup();
      }
    },

    async searchUsers() {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/search?query=${encodeURIComponent(this.searchQuery)}`);
        this.filteredUsers = response.data;
      } catch (error) {
        console.error('Error searching users:', error);
      }
    },
  },

  computed: {
    filteredUsers() {
      const users = useStore().users;
      if (!this.searchQuery) {
        return users;
      }
      return users.filter(user =>
        user.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.Date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.Address.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    allUsers() {
      return useStore().users;
    },
  },
  
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>

.tableGap {
  margin-top: 5rem; 
}

.landingPage {
  width: 100vw;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tableContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.addAndSearch {
  align-self: flex-end;
}

.addUserButton {
  margin-bottom: 1rem;
  align-self: flex-end;
  background-color: #4682b4;
  color: white;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  border-color: transparent;
  cursor: pointer;
}

.searchField {
  margin-right: 1rem;
  font-size: 1.2rem;
  border-color: transparent;
  border-radius: 0.2rem;
  outline: none;
}
</style>
