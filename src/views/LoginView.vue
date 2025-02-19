<template>
    <div class="login-container">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <button type="submit">Iniciar sesión</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          password: "",
          username: "",
        },
        errorMessage: "",
      };
    },
    methods: {
      handleLogin() {
        if (
          this.user.email === "admin@ejemplo.com" &&
          this.user.password === "123456"
        ) {
          alert("¡Inicio de sesión exitoso!");
          this.$router.push("/dashboard"); // Redirigir al dashboard si es exitoso
        } else {
          this.errorMessage = "Correo electrónico o contraseña incorrectos";
        }
      },
    },
  };
  </script>

  <style scoped>
  .login-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  input {
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error {
    color: red;
    font-size: 12px;
    text-align: center;
  }
</style>