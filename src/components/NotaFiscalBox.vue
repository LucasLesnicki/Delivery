<template>
  <div class="nota-fiscal-box">
    <h3>Nota Fiscal</h3>
    <div v-for="notaFiscal in notasFiscais" :key="notaFiscal.id" class="nota-fiscal">
      <p>Total: {{ notaFiscal.total }}</p>
      <button @click="verDetalhes(notaFiscal.id)">Ver Detalhes</button>
      <p v-if="notaFiscal.mostrarDetalhes">Peso: {{ notaFiscal.pesoDisplay }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notasFiscais: Array
  },
  methods: {
    verDetalhes(notaFiscalId) {
      this.$router.push(`/nota-fiscal/${notaFiscalId}`);
    }
  },
  created() {
    this.notasFiscais.forEach(notaFiscal => {
      notaFiscal.mostrarDetalhes = false;
      notaFiscal.pesoDisplay = `${notaFiscal.peso}${notaFiscal.pesoLetras}`;
    });
  }
};
</script>

<style scoped>
.nota-fiscal-box {
  margin-bottom: 20px;
}

.nota-fiscal {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  margin: 5px 0;
}

button {
  padding: 5px 10px;
}
</style>
