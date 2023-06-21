<template>
  <div>
    <h1>Carrinho</h1>

    <div v-if="user && user.cart.length > 0">
      <div class="cart-item" v-for="(item, index) in getDistinctItems()" :key="index">
        <div class="cart-item-box">
          <img :src="getImageUrl(item.image)" :alt="item.name" />
          <div>
            <h3>{{ item.name }}</h3>
            <p>Preço: R$ {{ item.preco }}</p>
            <p>Peso: {{ getPesoDisplay(item) }}</p>
            <div class="quantity">
              <label for="quantityInput">Quantidade:</label>
              <input type="number" v-model="item.quantity" id="quantityInput" min="1" @input="updateQuantity(item)">
            </div>
            <button @click="removeFromCart(item)">Remover</button>
          </div>
        </div>
      </div>

      <div class="cart-total">
        <h3>Total a pagar: R$ {{ calcularTotal() }}</h3>
        <button @click="checkout">Finalizar Compra</button>
      </div>
    </div>

    <div v-else>
      <p>O carrinho está vazio.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const userId = localStorage.getItem('userId');
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then(response => {
          this.user = response.data;
          // Adicionar IDs únicos aos itens do carrinho
          this.user.cart.forEach((item, index) => {
            item.id = index + 1;
            const { numeros, letras } = this.parsePesoString(item.peso);
            item.pesoNumeros = numeros;
            item.pesoLetras = letras;
            item.pesoTotal = item.pesoNumeros * item.quantity;
          });
        })
        .catch(error => {
          console.error('Erro ao recuperar os dados do usuário:', error);
        });
    },
    getImageUrl(image) {
      if (image.startsWith('@/assets/')) {
        return require(`@/${image.substring(2)}`);
      }
      return image;
    },
    getDistinctItems() {
      const distinctItems = [];
      const itemIds = new Set();

      this.user.cart.forEach(item => {
        if (!itemIds.has(item.id)) {
          distinctItems.push(item);
          itemIds.add(item.id);
        }
      });

      return distinctItems;
    },
    removeFromCart(item) {
      const index = this.user.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        this.user.cart.splice(index, 1);
        this.updateUser();
      }
    },
    calcularTotal() {
      let total = 0;
      if (this.user && this.user.cart) {
        this.user.cart.forEach(item => {
          total += item.preco * item.quantity;
        });
      }
      return total.toFixed(2);
    },
    getTotalToPay() {
      const total = this.calcularTotal();
      return isNaN(total) ? '0' : total;
    },
    checkout() {
      const notaFiscal = {
        id: this.user.historico.length + 1,
        itens: this.user.cart.map(item => ({ ...item })),
        total: this.calcularTotal()
      };
      this.user.historico.push(notaFiscal);
      this.user.cart = [];
      this.updateUser();
    },
    updateQuantity(item) {
      item.pesoTotal = item.pesoNumeros * item.quantity; // Atualizar o peso total
      this.updateUser();
    },
    updateUser() {
      const userId = this.user.id;
      axios
        .put(`http://localhost:3000/users/${userId}`, this.user)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    parsePesoString(pesoString) {
      const regex = /(\d+)([a-zA-Z]+)/;
      const matches = pesoString.match(regex);
      if (matches && matches.length === 3) {
        const numeros = parseInt(matches[1]);
        const letras = matches[2];
        return { numeros, letras };
      }
      return { numeros: 0, letras: '' };
    },
    getPesoDisplay(item) {
      return `${item.pesoTotal}${item.pesoLetras}`;
    }
  }
};
</script>

<style scoped>
.cart-item {
  display: flex;
  margin-bottom: 20px;
  
}

.cart-item-box {
  background-color: green;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 2px solid #00ff00;
}

.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.cart-item h3,
.cart-item p {
  color: white;
}

.cart-total {
  margin-top: 20px;
}

.quantity {
  display: flex;
  align-items: center;
  color: white;
}

.quantity button {
  padding: 5px 10px;
}
</style>
