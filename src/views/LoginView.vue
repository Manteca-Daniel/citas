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
import { useCounterStore } from '../stores/counter'

export default {
  setup() {
    const counter = useCounterStore(); // Acceder a la store

    return { counter }; // Retornar la store para usarla en el template y métodos
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username: this.user.username,
            password: this.user.password
          }),
        });

        const data = await response.json();

        if (response.ok && data.access_token) {
          this.counter.token = data.access_token; // Guardar el token en la store de Pinia
          this.$router.push("/"); // Redirigir al dashboard si es exitoso
        } else {
          this.errorMessage = "Nombre de usuario o contraseña incorrectos";
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        this.errorMessage = "Ocurrió un error al intentar iniciar sesión.";
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