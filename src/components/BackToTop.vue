<template>
  <vm-back-top :height="150" :bottom="20" :duration="1000" :timing="'ease'">
    <v-btn class="back-btn" fab dark small title="zurück nach oben"
      ><v-icon>mdi-chevron-up</v-icon></v-btn
    >
  </vm-back-top>
</template>

<script>
export default {};
</script>

<style scoped>
.back-btn {
  background-color: black;
  color: #fff;
  opacity: 0.5;
}
</style>
