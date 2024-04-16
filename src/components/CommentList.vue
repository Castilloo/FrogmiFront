<template>
    <div>
        <p>
            Comments: 
        </p>
        <div class="container py-2">
            <router-link 
                    class="btn btn-danger"
                    :to="'/'"
                >
                    Cancel
            </router-link>
            <router-link 
                    class="btn btn-success"
                    :to="'/newcomment/' + this.$route.params.id"
                >
                    New comment
            </router-link>
            <div class="card">
                <div 
                    v-for="item in dataComments" :key="item.id"
                    class="card-body card"
                >
                    <h6 class="h6">Comentario {{ item.id }}</h6>
                    <p class="h5">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'commentList',
    data() {
        return {
            baseUrl: 'http://127.0.0.1:3000/api/features/',
            dataComments: {}
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        async getComments(){
            const id = this.$route.params.id;
            const url = this.baseUrl + id + '/comments';
            console.log(url);
            try {
                const response = await axios.get(url);
                this.dataComments = response.data.data;
                console.log(response.data);
            } catch (error) {
                throw new Error(error)
            }
        },
        
    }
}
</script>

<style lang="css" scoped>

</style>