<script setup>
</script>

<template>
  <main>
    <!-- Meter aqui una pagina de bienvenida a una apñicacion de reserva de citas y que sea larga -->

    <h1>Reserva tu cita</h1>
    <p>Reserva tu cita con nosotros
    </p>

    <h2>¿Cómo funciona?</h2>
    <p>Reserva tu cita en 3 sencillos pasos</p>

    <ol>
      <li>Selecciona el servicio que deseas</li>
      <li>Selecciona la fecha y hora</li>
      <li>Confirma tu cita</li>
    </ol>

    <h2>¿Por qué reservar con nosotros?</h2>
    <p>Reserva tu cita con nosotros y disfruta de los siguientes beneficios:</p>

    <ul>
      <li>Atención personalizada</li>
      <li>Profesionales cualificados</li>
      <li>Tratamientos de calidad</li>
    </ul>
  </main>
</template>

<style scoped>
.welcome-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.hero {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.cta-button {
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.how-it-works, .benefits, .testimonials {
  background: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

h1, h2 {
  color: #333;
}

ul, ol {
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
}
</style>

