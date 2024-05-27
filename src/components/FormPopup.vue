<template>
  <div class="formPopup">
    <div class="formPopupContent">

      <h2>Add User</h2>

      <div v-if="errorMessage" class="errorMessage">{{ errorMessage }}</div>

      <div class="formGroup">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" />
      </div>

      <div class="formGroup">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="formData.address" />
      </div>

      <div class="buttonGroup">
        <button class="cancelButton" @click="closeFormPopup">Cancel</button>
        <button class="confirmButton" @click="addUser">Confirm</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        address: '',
      },
      errorMessage: '',
    };
  },

  methods: {
    async addUser() {
      try {
        this.errorMessage = '';
        const response = await axios.post('http://localhost:5000/api/users', {
          Name: this.formData.name,
          Address: this.formData.address,
        });

        console.log(response.data.message);

        this.formData.name = '';
        this.formData.address = '';

        this.closeFormPopup();

        this.$emit('userAdded');
      } catch (error) {
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          console.error('Error adding user:', error);
        }
      }
    },

    closeFormPopup() {
      this.$emit('close');
    },
    
  },
};
</script>

<style scoped>
.formPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.formPopupContent {
  background-color: white;
  padding: 2rem;
  width: 40%;
  height: 34%;
  border-radius: 5px;
  color: Black;
}

.formGroup {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type='text'] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.buttonGroup {
  display: flex;
  justify-content: flex-end;
}

.confirmButton {
  margin-bottom: 1rem;
  align-self: flex-end;
  background-color: #4682b4;
  color: white;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  border-color: transparent;
  cursor: pointer;
  margin: 1rem;
}

.cancelButton {
  margin-bottom: 1rem;
  align-self: flex-end;
  background-color: transparent;
  color: gray;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  border-color: gray;
  border-width: 0.15rem;
  cursor: pointer;
}

.errorMessage {
  color: red;
  margin-bottom: 1rem;
}
</style>
