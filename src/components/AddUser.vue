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
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '',
        };
    },

    methods: {
        ...mapActions(['addUser']),
        async submitForm() {
            if (this.name === '' || this.email === '' || this.phone === '') {
                alert("Todos los campos son obligatorios.");
                return;
            }

            await this.addUser({ name: this.name, email: this.email, phone: this.phone });
            this.resetForm();
        },
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