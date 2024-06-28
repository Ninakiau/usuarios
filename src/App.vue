<template>
<AddUser/>
<ReadUsers/>
</template>

<script>
// Importamos los componentes
import AddUser from './components/AddUser.vue';
import ReadUsers from './components/ReadUsers.vue';


export default {
  name: 'App',
  components: {
    AddUser,
    ReadUsers
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
