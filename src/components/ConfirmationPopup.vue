<template>
    <div class="popupOverlay" @click.self="closePopup">
      <div class="popupContent">
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <button class="cancelButton" @click="closePopup">Cancel</button>
        <button class="confirmButton" @click="confirmDelete">Confirm</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
    },
    methods: {
      confirmDelete() {
        this.$emit('confirm');
        this.closePopup();
      },
      closePopup() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .popupOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: black
  }
  
  .popupContent {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  .cancelButton{
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

  .confirmButton{
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
  </style>