<template>
    <div>
      <div class="toolbar">

        <div class="checkboxes">
          <label>
            <input type="checkbox" v-model="hideDate" />
            Hide Date
          </label>
          <label>
            <input type="checkbox" v-model="hideName" />
            Hide Name
          </label>
          <label>
            <input type="checkbox" v-model="hideAddress" />
            Hide Address
          </label>
        </div>

      </div>

      <table class="custom-table">
        <thead>
          <tr>
            <th v-if="!hideDate">Date</th>
            <th v-if="!hideName">Name</th>
            <th v-if="!hideAddress">Address</th>
            <th v-if="showActions">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td v-if="!hideDate">{{ user.Date }}</td>
            <td v-if="!hideName">{{ user.Name }}</td>
            <td v-if="!hideAddress">{{ user.Address }}</td>
            <td v-if="showActions" class="actionCell">
              <button @click="$emit('delete', user.id)" class="deleteButton">DELETE</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
      showActions: {
        type: Boolean,
        default: true,
      },
    },
    
    data() {
      return {
        hideDate: false,
        hideName: false,
        hideAddress: false,
      };
    },
  };
  </script>
  
  <style scoped>
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  
  .custom-table th,
  .custom-table td {
    padding: 0.5rem;
    border: 1px solid #ddd;
    font-size: 16px;
    word-wrap: break-word;
    color:black;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .custom-table th {
    background-color: #87ceeb;
    text-align: left;
  }
  
  .custom-table tbody tr {
    background-color: #4682b4;
  }
  
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .checkboxes {
    display: flex;
    align-items: center;
    color: #4682b4;
    font-size: 1.2rem;
    
  }
  
  .checkboxes label {
    margin-right: 1rem;
  }
  
  .actionCell {
    border-left: 1px solid #ddd;
  }
  
  .deleteButton {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
  }
  </style>