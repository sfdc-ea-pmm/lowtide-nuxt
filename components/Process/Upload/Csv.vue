<template>
    <form class="" @submit.prevent="upload">
        <h2 class="text-xs font-medium text-gray-500 mb-2">UPLOAD CSV</h2>
        <div class="space-y-4">
            <div>
                <button :disabled="this.uploadStatus" type="submit" :class="(this.uploadStatus ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-3.5 py-2.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                    UPLOAD
                </button>
                <button @click="uploadJSON()" :disabled="this.uploadStatus" type="button" :class="(this.uploadStatus ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-3.5 py-2.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                    JSON TEST
                </button>
            </div>
            <div class="">
                <label for="cover_photo" class="block text-sm font-medium text-gray-700 mb-2">
                    Select your CSV file
                </label>
                <div :class="(this.dragStatus ? 'border-blue-400 ' : 'border-gray-300 ') + 'w-full flex justify-center p-6 border-2 border-dashed rounded-md'" @drop="drop" @dragover="dragover" @dragleave="dragleave">
                    <div class="space-y-1 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload your files</span>
                                <input @change="getFiles" id="file-upload" name="file-upload" type="file" class="sr-only" multiple accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required>
                            </label>
                            <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                            CSV up to 10MB
                        </p>
                    </div>
                </div>
                <div class="mt-4 p-6 border border-gray-300 rounded-md">
                    <div class="grid md:grid-cols-3 gap-4">
                        <div v-for="(v, i) in this.files" v-bind:key="v.name">
                            <div class="w-full mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p class="max-w-lg text-xs font-medium text-gray-500 text-center mt-1">{{v.name}}</p>
                            </div>
                            <div class="w-full mb-1 md:mb-2">
                                <label :for="'dataset-name'" class="block text-sm font-medium text-gray-700 mb-2">Dataset name</label>
                                <input pattern="^[a-zA-Z0-9_]*$" title="This field should contain only underscores and alphanumeric characters." v-model="datasetNames[i]" type="text" :name="'dataset-name'" :class="'focus:ring-blue-500 focus:border-blue-500 inline-block w-full text-sm border-gray-300 rounded-md w-96'" :placeholder="'The dataset name'" required>
                            </div>
                        </div>
                    </div>
                    <div v-if="this.files.length<=0" class="w-full text-sm text-gray-600 space-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                        </svg>
                        <p class="text-center">No se seleccionaron archivos.</p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data(){
        return {
            datasetNames: [],
            label: 'No selected files.',
            files: [],
            dragStatus: false,
            uploadStatus: false
        }
    },
    methods: {
        async upload(){
            this.uploadStatus = true;
            let formData = new FormData();
            this.files.forEach((value, i) => {
            formData.append("file"+i, value); 
            });
            formData.append("names", JSON.stringify(this.datasetNames));
            try {
                await this.$axios.post(`${process.env.API_URL}/services/dataset/upload`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.uploadStatus = false;
            } catch (e) {
                console.error(e);
                this.uploadStatus = false;
            }
        },
        async uploadJSON(){
            const json = {
                dataset: {
                label: 'Mis Oportunidades 2',
                name: 'mis_oportunidades_2',
                description: '',
                columnNames: [
                    'Industry',
                    'Amount',
                    'Outcome'
                ]
                },
                rows: [
                { Industry: 'Manufacturing', Amount: 5000, Outcome: 'Yes' },
                { Industry: 'Healthcare', Amount: 1234, Outcome: 'Yes' },
                { Industry: 'Other', Amount: 5346, Outcome: 'No' }
                ]
            };
            try {
                await this.$axios.post(`${process.env.API_URL}/services/dataset/upload`, { json: json }, {
                    withCredentials: true
                });
                this.uploadStatus = false;
            } catch (e) {
                console.error(e);
                this.uploadStatus = false;
            }
        },
        createInputs(files){
            files.forEach((file, i) => {
                let filteredSpaces = file.name.replace(/\s/g, "_");
                let filteredFormat = filteredSpaces.replace(".csv", "");
                this.datasetNames.push(filteredFormat);
            });
        },
        async getFiles(event){
            this.createInputs(event.target.files);
            this.files = event.target.files;
        },
        dragover(event) {
            event.preventDefault();
            this.dragStatus = true;
        },
        dragleave() {
            this.dragStatus = false;
        },
        drop(event){
            event.preventDefault();
            this.dragStatus = false;
            this.createInputs(event.dataTransfer.files);
            this.files = event.dataTransfer.files;
        }
    }
}
</script>