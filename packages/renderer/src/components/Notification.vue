<template>
  <div class="notification elevation-5">
    <v-icon>fa-times</v-icon>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.notification {
  background-color: #ff5555;
  border-radius: 4px;
  padding-right: 15px;
  margin-bottom: 10px;
  will-change: clip-path height;
  width: max-content;
  float: right;
  clear: both;
  overflow: hidden;

  .v-icon {
    border-radius: 100%;
    background-color: lighten(#ff5555, 10%);
    width: 35px;
    height: 35px;
    margin: 5px 10px;
  }
}
</style>
