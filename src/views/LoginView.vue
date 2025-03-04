<template>
  <div class="container">
    <input type="checkbox" id="register_toggle">
    <div class="slider">
      <form @submit.prevent="handleLogin" class="form">
        <h2 class="title">Login</h2>
        <div class="form_control">
          <input v-model="user.username" type="text" class="input" required>
          <label class="label">Username</label>
        </div>
        <div class="form_control">
          <input type="password" class="input" v-model="user.password" required>
          <label class="label">Password</label>
        </div>
        <button type="submit" class="btn">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <span class="bottom_text">Don't have an account? <label for="register_toggle" class="switch">Sign Up</label></span>
      </form>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '../stores/counter';

export default {
  setup() {
    const counter = useCounterStore();
    return { counter };
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ username: this.user.username, password: this.user.password }),
        });

        const data = await response.json();
        if (response.ok && data.access_token) {
          this.counter.setToken(data.access_token);
          this.$router.push('/');
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión.';
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 350px;
  background: #1c1c1c;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.slider {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

#register_toggle {
  display: none;
}

#register_toggle:checked + .slider {
  transform: translateX(-100%);
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 1.8em;
  font-weight: bold;
  color: #fff;
}

.form_control {
  position: relative;
  width: 100%;
}

.input {
  width: 100%;
  padding: 10px;
  background: #292929;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
}

.label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #bbb;
  font-size: 0.9em;
  transition: 0.3s;
}

.input:focus + .label,
.input:valid + .label {
  top: 5px;
  font-size: 0.8em;
  color: #fff;
}

.btn {
  background: #ff5722;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #e64a19;
}

.bottom_text {
  font-size: 0.9em;
  color: #ccc;
}

.switch {
  color: #ff5722;
  font-weight: bold;
  cursor: pointer;
}
</style>