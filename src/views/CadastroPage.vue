<template>
  <div class="cadastro">
    <h2>Cadastro</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" autocomplete="username" class="input-field" placeholder="Digite seu e-mail" required>
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" autocomplete="current-password" class="input-field" placeholder="Digite sua senha" required>
      </div>
      <button type="submit" class="button">Cadastrar</button>
    </form>

    <div v-if="showSuccessMessage">
      Cadastro realizado com sucesso! Você pode fazer login agora.
      <router-link to="/Login">Ir para a página de login</router-link>
    </div>
  </div>
</template>

<script>
import axios from '@/components/axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      showSuccessMessage: false
    };
  },
  methods: {
    register() {
      const newUser = {
        email: this.email,
        password: this.password,
        cart: [],
        historico: []
      };

      axios.post('/users', newUser)
        .then(() => {
          // Exibir a mensagem de sucesso
          this.showSuccessMessage = true;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style scoped>
.cadastro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin-top: 50px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2196F3;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #1976D2;
}
</style>
