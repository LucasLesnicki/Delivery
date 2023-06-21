<template>
  <div>
    <h1>Menu</h1>

    <div class="food-container">
      <div class="category" v-for="(category, categoryName) in Alimentos" :key="categoryName">
        <h2>{{ categoryName }}</h2>
        <div class="food-boxes">
          <div v-for="food in category" :key="food.id">
            <food-box :food="food" @add-to-cart="addToCart" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import FoodBox from '@/components/FoodBox.vue';
import axios from 'axios';

export default {
  components: {
    FoodBox,
  },
  data() {
    return {
      Alimentos: {
        Bebidas: [],
        Verduras: [],
        Laticinios: [],
        Legumes: [],
        Vegetais: [],
        Carnes: [],
      },
      user: null,
    };
  },
  created() {
    this.fetchAlimentos();
    this.fetchUser();
  },
  methods: {
    fetchAlimentos() {
      axios
        .get('http://localhost:3000/Alimentos')
        .then(response => {
          this.Alimentos = response.data[0];
        })
        .catch(error => {
          console.error('Erro ao recuperar a lista de Alimentos:', error);
        });
    },
    fetchUser() {
      const userId = localStorage.getItem('userId');
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Erro ao recuperar os dados do usuário:', error);
        });
    },
    goToCart() {
      this.$router.push('/Cart');
    },
    addToCart(food) {
      if (!this.user.cart) {
        this.user.cart = []; // Inicializa o carrinho do usuário se estiver vazio
      }

      const existingItem = this.user.cart.find(item => item.id === food.id);

      if (existingItem) {
        existingItem.quantity += 1; // Incrementa a quantidade se o item já estiver no carrinho
      } else {
        const newItem = {
          ...food,
          quantity: 1,
        };
        this.user.cart.push(newItem); // Adiciona um novo item ao carrinho
      }

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
  },
  computed: {
    valorTotal() {
      let total = 0;
      if (this.user && this.user.cart) {
        total = this.user.cart.reduce((acc, item) => acc + item.preco, 0);
      }
      return total.toFixed(2);
    }
  },
};
</script>

<style scoped>
.food-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.category {
  text-align: center;
  margin-bottom: 10px;
}

.food-boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.food-box {
  width: 250px;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  background-color: green;
  border: 2px solid #00ff00;
  border-radius: 5px;
  color: white;
  font-family: "Comic Sans MS", cursive;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.food-box img {
  width: 100%;
  height: 200px; /* Defina uma altura fixa para todas as imagens */
  object-fit: cover; /* Preenche a área de exibição mantendo a proporção */
  margin-bottom: 10px;
}

.food-box p {
  margin: 0;
}
</style>
