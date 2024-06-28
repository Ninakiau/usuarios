<template>
    <div>
        <form @submit.prevent="submitForm">
            <input type="text" placeholder="Adrian Vargas.." v-model="name">
            <input type="email" placeholder="2S5i6@example.com" v-model="email">
            <input type="number" placeholder="12345645" v-model="phone">
            <button type="submit">Agregar</button>
        </form>
    </div>
</template>

<script>
//importamos mapActionsde la store de vuex
import { mapActions } from 'vuex';

export default {
    //en data() guardamos los datos del formulario (v-model) para agregarlos al objeto usuario .
    data() {
        return {
            name: '',
            email: '',
            phone: '',
        };
    },
    methods: {

        //addUser es un action que sirve para agregar un nuevo usuario a la base de datos.
        ...mapActions(['addUser']),

        //Creamos una función asíncrona para para poder validar los datos del formulario. y enviarlos 
        async submitForm() {
            //Validamos los datos
            if (this.name === '' || this.email === '' || this.phone === '') {
                alert("Todos los campos son obligatorios.");
                return;
            }
            //Con los datos ya validados agregamos los datos del usuario a la base de datos
            await this.addUser({ name: this.name, email: this.email, phone: this.phone });
            //Limpiamos el formulario
            this.resetForm();
        },

        //Función para limpiar el formulario
        resetForm() {
            this.name = '';
            this.email = '';
            this.phone = '';
        }
    },
}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
    width: 300px;
    justify-content: center;
    align-items: center;
    gap: 1rem;

}
</style>