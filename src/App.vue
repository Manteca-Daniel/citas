<script setup>
import { onMounted, computed } from 'vue';
import { useCounterStore } from './stores/counter';

const counter = useCounterStore();

const isLoggedIn = computed(() => {
  return !!counter.token;
});

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/migracion', { method: 'GET' });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const logout = () => {
  counter.setToken('');
  window.location.reload();
};
</script>

<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
    </nav>

    <div v-if="isLoggedIn">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    <div v-else class="auth-links">
      <router-link to="/login" class="login">Login</router-link>
      <router-link to="/register" class="register">Register</router-link>
    </div>
  </header>

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  background: linear-gradient(to right, #1e40af, #2563eb);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #facc15;
}

.auth-links {
  display: flex;
  gap: 1rem;
}

.login, .register {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  display: inline-block;
}

.login {
  background-color: white;
  color: #1e40af;
  border: 2px solid #1e40af;
}

.login:hover {
  background-color: #1e40af;
  color: white;
}

.register {
  background-color: #facc15;
  color: #1e3a8a;
  border: 2px solid #facc15;
}

.register:hover {
  background-color: #eab308;
}

.logout-button {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

.logout-button:hover {
  background-color: #dc2626;
}

.main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
