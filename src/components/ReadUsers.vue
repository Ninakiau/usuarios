<template>
    <!-- Listamos a los usuarios -->
    <div>
        <h1>Usuarios</h1>
        <ul>
            <li v-for="user in usuarios" :key="user.id">
                {{ user.id }} - {{ user.nombre }} -{{ user.mail }}-{{ user.telefono }}
                <!-- boton para elliminar el usuario -->
                <button @click="deleteUser(user.id)">Eliminar</button> 
                
            </li>
        </ul>
    </div>
</template>
<script>
//importamos el mapState y el mapActions
import { mapState, mapActions } from 'vuex'
export default {
    // computed: Usa mapState para mapear el estado usuarios del store de Vuex a una propiedad computada.
    computed: {
        ...mapState(['usuarios'])
    },
    //deleteUser es una mutacion que recibe el estado y el id del usuario como argumentos para eliminar el usuario de la base de datos.
    methods: {
        ...mapActions(['deleteUser']),
    },
    //mounted: Despacha la acción getUsers del store de Vuex cuando el componente se monta, para obtener la lista de usuarios.
    mounted() {
        this.$store.dispatch('getUsers')
    }
}
</script>