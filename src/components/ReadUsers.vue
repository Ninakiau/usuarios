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
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['usuarios'])
    },

    methods: {
        ...mapActions(['deleteUser']),
    },

    mounted() {
        this.$store.dispatch('getUsers')
    }
}
</script>