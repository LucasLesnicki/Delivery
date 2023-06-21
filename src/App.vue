<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/Menu">Menu</router-link> |
    <router-link to="/Cart">Carrinho </router-link> |
    <router-link to="/NotaFiscal">Nota Fiscal </router-link> |
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
      background-color: #a9db34; /* Altere para a cor desejada */
    }

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  display: inline-block;
  padding: 10px 10px;
  background-color: #f4f7f8;
  color: rgb(5, 5, 5);
  border-radius: 5px;
  text-decoration: none;
  margin-right: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
