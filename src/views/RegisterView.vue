<template>
  <div class="register-container">
    <h2>Registrarse</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div>
        <label for="lastname">Apellido:</label>
        <input type="text" id="lastname" v-model="user.lastname" required />
      </div>
      <div>
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" v-model="user.username" required />
      </div>
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div>
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" v-model="user.phone" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <button type="submit">Registrarse</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
const fecha = new Date().toLocaleDateString("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// Función que hace una petición POST con los datos del usuario usando fetch
async function registro(userData) {
  try {
    console.log("El usuario es", userData);
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        date: "25/12/2025",
        email: userData.email,
        lastname: userData.lastname,
        name: userData.name,
        password: userData.password,
        phone: userData.phone,
        username: userData.username
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el registro");
    }

    alert("¡Registro exitoso!");
    return await response.json();
  } catch (error) {
    console.error("Error en el registro:", error);
    alert(error.message);
  }
}

export default {
  data() {
    return {
      user: {
        date: fecha,
        email: "",
        lastname: "",
        name: "",
        password: "",
        phone: "",
        username: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.user.email && this.user.password) {
        await registro(this.user);
        this.$router.push("/");
      } else {
        this.errorMessage = "Debe completar todos los campos";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
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
