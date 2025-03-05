<template>
  <main class="container">
    <section class="intro">
      <h1>Reserva tu cita con nosotros</h1>
      <p class="subtitle">Sigue estos sencillos pasos y agenda tu cita hoy mismo.</p>
    </section>

    <section class="steps">
      <h2>¿Cómo funciona?</h2>
      <ol class="steps-list">
        <li><span>1.</span> Selecciona el servicio que deseas</li>
        <li><span>2.</span> Selecciona la fecha y hora</li>
        <li><span>3.</span> Confirma tu cita</li>
      </ol>
    </section>

    <section class="benefits">
      <h2>¿Por qué reservar con nosotros?</h2>
      <ul class="benefits-list">
        <li>👨‍⚕️ Atención personalizada</li>
        <li>🔧 Profesionales cualificados</li>
        <li>✨ Tratamientos de calidad</li>
      </ul>
    </section>

    <div class="buttons">
      <button @click="fetchCenters" class="btn">
        {{ showCenters ? "Ocultar centros" : "Mostrar centros" }}
      </button>
      <button @click="fetchProfile" class="btn">
        {{ showProfile ? "Ocultar perfil" : "Mostrar perfil" }}
      </button>
      <button @click="showReservationForm = !showReservationForm" class="btn" v-if="isLoggedIn">
        {{ showReservationForm ? "Ocultar reserva" : "Reservar cita" }}
      </button>
      <button @click="fetchAppointments" class="btn">
        {{ showAppointments ? "Ocultar citas" : "Mostrar citas" }}
      </button>
    </div>

    <p v-if="errorMessage" class="error">ERROR: {{ errorMessage }}</p>

    <ul v-if="showCenters && centers.length" class="centers-list">
      <li v-for="center in centers" :key="center.id">{{ center.name }}</li>
    </ul>

    <div v-if="showReservationForm" class="reservation-form">
      <h2>Reservar Cita</h2>
      <label for="center">Selecciona un centro:</label>
      <select v-model="selectedCenter" id="center" class="input">
        <option disabled value="">Selecciona un centro</option>
        <option v-for="center in centers" :value="center.name">{{ center.name }}</option>
      </select>

      <label for="datetime">Selecciona fecha y hora:</label>
      <input type="datetime-local" v-model="selectedDateTime" id="datetime" class="input" />

      <button @click="reserveAppointment" class="btn">Confirmar Cita</button>
    </div>

    <div v-if="showProfile && profile" class="profile">
      <h2>Tu Perfil</h2>
      <p><strong>Nombre:</strong> {{ profile.name }} {{ profile.lastname }}</p>
      <p><strong>Usuario:</strong> {{ profile.username }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <p><strong>Teléfono:</strong> {{ profile.phone }}</p>
      <p><strong>Fecha de registro:</strong> {{ profile.date }}</p>
    </div>

    <div v-if="showAppointments && appointments.length" class="appointments">
      <h2>Tus citas</h2>
      <ul>
        <li v-for="appointment in appointments" :key="appointment._id">
          <p><strong>Centro:</strong> {{ appointment.center }}</p>
          <p><strong>Fecha:</strong> {{ appointment.date }}</p>
          <p><strong>Fecha de creación:</strong> {{ appointment.created_at }}</p>
          <button @click="cancelAppointment(appointment)" class="btn cancel">Cancelar cita</button>
        </li>
      </ul>
    </div>
  </main>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
const centers = ref([]);
const profile = ref(null);
const appointments = ref([]);  // Array para almacenar las citas del usuario
const errorMessage = ref("");
const showCenters = ref(false);
const showProfile = ref(false);
const showReservationForm = ref(false);
const showAppointments = ref(false);  // Controla la visibilidad de las citas
const selectedCenter = ref("");
const selectedDateTime = ref("");

const isLoggedIn = computed(() => !!counter.token);

const fetchCenters = async () => {
  showCenters.value = !showCenters.value;
  if (showCenters.value && centers.value.length === 0) {
    try {
      const response = await fetch("http://127.0.0.1:5000/centers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${counter.token}`,
          Accept: "application/json",
        },
      });
      if (response.ok) {
        centers.value = await response.json();
        errorMessage.value = "";
      } else {
        throw new Error("Error al obtener los centros");
      }
    } catch (error) {
      errorMessage.value = "No se pudieron cargar los centros";
      centers.value = [];
    }
  }
};

// const cargarCentros = async () => {
//   showCenters.value = false;
//   if (showCenters.value && centers.value.length === 0) {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/centers", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${counter.token}`,
//           Accept: "application/json",
//         },
//       });
//       if (response.ok) {
//         centers.value = await response.json();
//         errorMessage.value = "";
//       } else {
//         throw new Error("Error al obtener los centros");
//       }
//     } catch (error) {
//       errorMessage.value = "No se pudieron cargar los centros";
//       centers.value = [];
//     }
//   }
// };


const fetchProfile = async () => {
  showProfile.value = !showProfile.value;
  if (showProfile.value && !profile.value) {
    try {
      const response = await fetch("http://127.0.0.1:5000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${counter.token}`,
          Accept: "application/json",
        },
      });
      if (response.ok) {
        profile.value = await response.json();
        errorMessage.value = "";
      } else {
        throw new Error("Error al obtener el perfil");
      }
    } catch (error) {
      errorMessage.value = "No se pudieron cargar los datos del perfil";
      profile.value = null;
    }
  }
};

const fetchAppointments = async () => {
  showAppointments.value = !showAppointments.value;
  if (showAppointments.value && appointments.value.length === 0) {
    try {
      const response = await fetch("http://127.0.0.1:5000/date/getByUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${counter.token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Citas obtenidas:", data); // Verifica si `day` y `hour` están aquí
        appointments.value = data;
        errorMessage.value = "";
      } else {
        throw new Error("Error al obtener las citas");
      }
    } catch (error) {
      errorMessage.value = "No se pudieron cargar las citas";
      appointments.value = [];
    }
  }
};

const cancelAppointment = async (appointment) => {
  // Verifica que el usuario está seguro de querer cancelar la cita
  const confirmCancel = confirm(`¿Estás seguro de que quieres cancelar la cita para el centro ${appointment.center} el ${appointment.date}?`);

  if (!confirmCancel) {
    return; // Si el usuario no confirma, no hace nada
  }

  try {
    const requestBody = {
      center: appointment.center,
      date: `${appointment.date}`, // Formato esperado por el servidor
    };

    const response = await fetch("http://127.0.0.1:5000/date/delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${counter.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Cita cancelada con éxito");
      
      // Eliminar la cita de la lista local de citas
      appointments.value = appointments.value.filter(a => a._id !== appointment._id);
    } else {
      throw new Error("Error al cancelar la cita");
    }
  } catch (error) {
    console.error(error);
    alert("No se pudo cancelar la cita");
  }
};



const reserveAppointment = async () => {
  if (!selectedCenter.value || !selectedDateTime.value) {
    errorMessage.value = "Por favor, selecciona un centro y una fecha";
    return;
  }

  try {
    const date = new Date(selectedDateTime.value);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:00:00`;

    const requestBody = {
      center: selectedCenter.value,
      date: formattedDate,
    };

    const response = await fetch("http://127.0.0.1:5000/date/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${counter.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Cita reservada con éxito");
      showReservationForm.value = false;
    } else {
      throw new Error("Error al reservar la cita");
    }
  } catch (error) {
    errorMessage.value = "No se pudo reservar la cita";
  }
};

onMounted(() => {
  fetchCenters();
  showCenters.value = false;
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.steps-list, .benefits-list, .centers-list {
  list-style: none;
  padding: 0;
}

.steps-list li {
  background: #f3f3f3;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.benefits-list li {
  padding: 10px;
  font-weight: bold;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 5px;
  transition: background 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.cancel {
  background-color: #dc3545;
}

.cancel:hover {
  background-color: #b22a37;
}

.error {
  color: red;
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reservation-form, .profile, .appointments {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
