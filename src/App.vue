<script setup>
import { onMounted, computed } from "vue";  
import { useCounterStore } from "./stores/counter";  

const counter = useCounterStore();

const isLoggedIn = computed(() => {
  console.log("Logeado: ",counter.token);  // Esto te ayudará a ver el valor de logged.token
  return !!counter.token;
});

const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/migracion", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const logout = () => {
  counter.token = "";  
  window.location.reload();
};
</script>


<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>

    <div v-if="isLoggedIn">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    <div v-else class="auth-links"> <!-- Cambié v-if por v-else aquí -->
      <router-link to="/login" class="login">Login</router-link>
      <router-link to="/register" class="register">Register</router-link>
    </div>
  </header>

  <main class="main">
    <RouterView />
  </main>

  <!-- <footer class="footer">
    <p>&copy; 2025 Your Company. All rights reserved.</p>
  </footer> -->
</template>

<style scoped>
.header {
  background-color: #1e40af;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  gap: 1rem;
}

.auth-links {
  display: flex;
  gap: 1rem;
}

.login {
  background-color: white;
  color: #1e40af;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.3s;
}

.login:hover {
  background-color: #e5e7eb;
}

.logout-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.logout-button:hover {
  background-color: darkred;
}

.register {
  background-color: #facc15;
  color: #1e3a8a;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.3s;
}

.register:hover {
  background-color: #eab308;
}

.main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.footer {
  background-color: #1f2937;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>