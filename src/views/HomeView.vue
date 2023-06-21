<template>
  <div class="home">
    <h1>Food Delivery</h1>
    <img alt="Vue-logo" class="Home-img" src="../assets/home.png">
    <div class="buttons">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/cadastro" class="button">Cadastro</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 20px;
  
}

.Home-img{
border-radius: 50%;
}

h1 {
  font-size: 28px;
  font-weight: bold;
}

.buttons {
  margin-top: 20px;
}

.button {
  display: inline-block;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #f4f7fa;
  color: #021220;
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
