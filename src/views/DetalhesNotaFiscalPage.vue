<template>
  <div>
    <h1>Detalhes da Nota Fiscal</h1>
    <compra-detalhes :id="compraId" />
  </div>
</template>

<script>
import CompraDetalhes from '@/components/CompraDetalhes';

export default {
  data() {
    return {
      compraId: null,
    };
  },
  created() {
    this.fetchCompraId();
  },
  methods: {
    fetchCompraId() {
      this.compraId = parseInt(this.$route.params.id);
    },
  },
  components: {
    CompraDetalhes,
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
