<template>
  <div class="food-box">
    <img :src="getImageUrl(food.image)" :alt="food.name" />
    <h3>{{ food.name }}</h3>
    <p>{{ food.description }}</p>
    <p>Peso: {{ food.peso }}</p>
    <p>Preço: R$ {{ food.preco }}</p>
    <button @click="addToCart">Adicionar ao Carrinho</button>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(image) {
      if (image.startsWith('@/assets/')) {
        return require(`@/${image.substring(2)}`);
      }
      return image;
    },
    addToCart() {
      this.$emit('add-to-cart', this.food);
    },
  },
};
</script>

<style scoped>
.food-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: green;
  border: 2px solid #00ff00;
  border-radius: 10px;
  color: white;
  font-family: "Comic Sans MS", cursive;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}


.food-box img {
  width: 180px; /* Largura fixa para as imagens */
  height: 180px; /* Altura fixa para as imagens */
  object-fit: cover;
  margin-bottom: 10px;
}

.food-box p {
  margin: 0;
}

</style>
