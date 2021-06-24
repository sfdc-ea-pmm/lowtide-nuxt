<template>
    <form class="" @submit.prevent="upload">
        <h2 class="text-xs font-medium text-gray-500 mb-2">UPLOAD CSV</h2>
        <div class="space-y-4">
            <div>
                <label :for="'dataset-name'" class="block text-sm font-medium text-gray-700 mb-2">Dataset name</label>
                <input v-model="datasetName" type="text" :name="'dataset-name'" :class="'focus:ring-blue-500 focus:border-blue-500 inline-block w-72 sm:text-sm border-gray-300 rounded-md w-96'" :placeholder="'The dataset name'" required>
                <button type="submit" class="inline-flex items-center ml-1 px-3.5 py-2.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </div>
            <div class="">
                <label for="cover_photo" class="block text-sm font-medium text-gray-700 mb-2">
                    Select your CSV file
                </label>
                <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
            </div>
        </div>
    </form>
</template>

<script>
export default {
  computed: {
    
  },
  methods: {
    async upload(){
        let formData = new FormData();
        this.files.forEach((value, i) => {
           formData.append("file"+i, value); 
        });
        formData.append("name", this.datasetName);
        
        await this.$axios.post(`${process.env.API_URL}/services/dataset/upload`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async getFiles(event){
        this.files = event.target.files;
    }
  },
  data(){
      return {
          datasetName: '',
          files: []
      }
  }
}
</script>