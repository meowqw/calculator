new Vue({
    delimiters: ["{*", "*}"],
    el: "#app",
  
    data: {
        clients: null
    },
    methods: {
        getData: async function (url) {
            try {
              const response = await axios.get(url);
              return response;
            } catch (error) {
              console.error(error);
            }
          },
    },
    async mounted() {
        let clients = await this.getData('/api/v1/clients')
        this.clients = clients.data;
    },
     
  });