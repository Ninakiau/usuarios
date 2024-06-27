<template>
    <div>
        <h1>Usuarios</h1>
        <ul>
            <li v-for="user in usuarios" :key="user.id">
                {{ user.id }} - {{ user.nombre }} -{{ user.mail }}-{{ user.telefono }}
                <button @click="deleteUser(user.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>
<script>
import { getFirestore, collection, onSnapshot, addDoc, doc, deleteDoc } from
    'firebase/firestore';
import firebaseApp from '../firebaseconfig.js';
export default {
    data() {
        return {
            usuarios: []
        }
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
    methods: {
        async deleteUser(id){
            const db = getFirestore(firebaseApp);
            const usuariosRef=doc(db, 'usuarios', id)
            await deleteDoc(usuariosRef);

}
    },
}
</script>