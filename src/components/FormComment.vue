<template>
    <div class="container py-4">
        <h2>ADD COMMENT</h2>
        <form @submit.prevent="sendComment" class="mb-3">
            <label for="" class="form-label">Write a comment</label>
            <textarea
                v-model="comment"
                class="form-control" 
                @input="isFilled"
                rows="6"
            ></textarea>
            <div class="py-4">
                <button type="submit" class="btn btn-success">Send</button>
                <router-link 
                    class="btn btn-danger"
                    :to="'/comments/' + this.$route.params.id"
                >
                    Cancel
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    setup () {
        return {
            comment: '',
            baseUrl: 'http://127.0.0.1:3000/api/features/',
        }
    },
    methods: {
        async sendComment() {
            const id = this.$route.params.id;
            const url = this.baseUrl + id + '/comments';
            const body = { 
                feature_id: parseInt(id),
                comment: this.comment.trim()
            }

            try {
                const response = await axios.post(url, body);
                console.log(response.data);
                if(response.data) 
                    this.confirmationMessage = 'Formulario enviado correctamente. Redirigiendo...';

                setTimeout(() => {
                    this.$router.push('/');
                }, 2000);
            } catch (error) {
                console.log(error);
                throw new Error(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>