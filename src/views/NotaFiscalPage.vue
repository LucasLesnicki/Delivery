estabelecidos<template>
  <div>
    <h1>Minha Nota Fiscal</h1>
    <NotaFiscalBox :notasFiscais="historico"></NotaFiscalBox>
  </div>
</template>

<script>
import NotaFiscalBox from '@/components/NotaFiscalBox.vue';

export default {
  data() {
    return {
      historico: []
    };
  },
  mounted() {
    this.fetchHistorico();
  },
  methods: {
    fetchHistorico() {
      const userId = localStorage.getItem('userId'); // Obtém o ID do usuário logado do localStorage
      if (!userId) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
      }

      fetch(`http://localhost:3000/users/${userId}`) // Busca o usuário pelo ID específico
        .then(response => response.json())
        .then(data => {
          this.historico = data.historico; // Atribui o histórico do usuário encontrado
        })
        .catch(error => {
          console.error('Erro ao obter o histórico de compras:', error);
        });
    }
  },
  components: {
    NotaFiscalBox
  }
};
</script>


<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

img {
  margin-right: 10px;
  vertical-align: middle;
}

span {
  margin-right: 10px;
}
</style>