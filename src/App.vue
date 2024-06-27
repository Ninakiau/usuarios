<template>
<AddUser/>
<ReadUsers/>
</template>

<script>
import AddUser from './components/AddUser.vue';
import ReadUsers from './components/ReadUsers.vue';
import { getFirestore, collection, onSnapshot, addDoc, doc, deleteDoc } from
    'firebase/firestore';
import firebaseApp from './firebaseconfig.js';

export default {
  name: 'App',
  components: {
    AddUser,
    ReadUsers
  },
  data() {
        return {
            usuarios: [],
            name: '',
            email: '',
            phone: '',
        };
    },
    mounted() {
        const db = getFirestore(firebaseApp);
        const usuariosRef = collection(db, 'usuarios')

        onSnapshot(usuariosRef, (snapshot) => {
            this.usuarios = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()


            }));
        })
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
