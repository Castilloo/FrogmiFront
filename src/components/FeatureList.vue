<template>
    <div>
        <h2>EARTHQUAKE FEATURE LIST:</h2>
        <div class="container py-4">
            <table class="table table-dark striped-column">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Magnitude</th>
                        <th>Place</th>
                        <th>Tsunami</th>
                        <th>Mag Type</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(feat, index) in features" :key="feat.id">
                        <td>{{ lastItem + index + 1}}</td>
                        <td>{{ feat.type }}</td>
                        <td>{{ feat.attributes.title }}</td>
                        <td>{{ feat.attributes.magnitude }}</td>
                        <td>{{ feat.attributes.place }}</td>
                        <td>{{ feat.attributes.tsunami ? 'Yes' : 'No' }}</td>
                        <td>{{ feat.attributes.mag_type }}</td>
                        <td>{{ feat.attributes.coordinates.longitude }}</td>
                        <td>{{ feat.attributes.coordinates.latitude }}</td>
                        <td>
                            <router-link 
                                class="btn btn-info"
                                :to="'/comments/' + feat.id"
                            >
                                Comments
                            </router-link>
                        </td>
                        <!-- Agrega más columnas según sea necesario -->
                    </tr>
                </tbody>
            </table>
            <div class="">
                <button 
                    class="btn btn-sm btn-dark"
                    @click="loadPreviousPage" 
                    :disabled="page === 1"
                >
                    Anterior
                </button>
                <span>Página {{ page }} de {{ totalPages }}</span>
                <button
                    class="btn btn-sm btn-dark"
                    @click="loadNextPage" 
                    :disabled="page === totalPages"
                >
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'FeatureList',
    data() {
        return {
            features: [],
            baseUrl: 'http://127.0.0.1:3000/api/features',
            page: 1,
            perPage: 30,
            total: 0,
            totalPages: 0,
            lastItem: 0
        }
    },
    created() {
        this.getFeatures();
    },
    methods: {
        async getFeatures(){
            const url = this.baseUrl + '?page=' + this.page + '&per_page=' + this.perPage;
            console.log(url);
            try {
                const response = await axios.get(url);
                const pagination = response.data.pagination;
                this.features = response.data.data;
                this.total = pagination.total;
                this.page = pagination.current_page;
                this.totalPages = Math.ceil(this.total / this.perPage);
                console.log(this.features[0]);
            } catch (error) {
                throw new Error()
            }
        },
        async loadNextPage() {
            // Incrementa el número de página
            this.lastItem += this.perPage;
            this.page++;
            // Llama a la función para obtener características con la nueva página
            await this.getFeatures();
        },
        async loadPreviousPage() {
            // Incrementa el número de página
            this.lastItem -= this.perPage;
            this.page--;
            // Llama a la función para obtener características con la nueva página
            await this.getFeatures();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
