<template>
    <div>
      <h1>Compra ID: {{ compraId }}</h1>
      <div v-if="compra">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Peso Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in compra.itens" :key="index">
                <td>
                  <img :src="getImageUrl(item.image)" :alt="item.name" class="product-image" />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.preco }}</td>
                <td>{{ item.pesoTotal }}{{ item.pesoLetras }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Total: R$ {{ compra.total }}</h2>
      </div>
      <div v-else>
        <p>Compra não encontrada.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        compraId: null,
        historico: [],
      };
    },
    created() {
      this.fetchHistorico();
      this.fetchCompraId();
    },
    methods: {
      fetchHistorico() {
        const userId = localStorage.getItem('userId');
        axios
          .get(`http://localhost:3000/users/${userId}`)
          .then(response => {
            this.historico = response.data.historico;
          })
          .catch(error => {
            console.error('Erro ao recuperar o histórico do usuário:', error);
          });
      },
      fetchCompraId() {
        this.compraId = parseInt(this.id);
      },
      getCompra(compraId) {
        return this.historico.find(item => item.id === compraId);
      },
      getImageUrl(image) {
        if (image.startsWith('@/assets/')) {
          return require(`@/${image.substring(2)}`);
        }
        return image;
      },
    },
    computed: {
      compra() {
        return this.getCompra(this.compraId);
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .table-container {
    margin: 0 auto;
    max-width: 800px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .product-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  </style>
  