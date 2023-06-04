new Vue({
  delimiters: ["{*", "*}"],
  el: "#app",

  data: {
    clients: null,
    clientForm: {
      phone: null,
      fio: null,
      email: null,
    },
    clientFormError: null,
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

    postData: async function (url, data) {
      token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFTOKEN": token,
        },
        body: JSON.stringify(data),
        method: "POST",
      });

      return response.json();
    },
    deleteData: async function(url) {
      token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

      const response = await fetch(url, {
        headers: {
          "X-CSRFTOKEN": token,
        },
        method: "DELETE",
      });

      return response.json();
    },

    addClient: async function () {
      let error = null;
      for (let clientItem of this.clients) {
        if (clientItem.email == this.clientForm.email) {
          error = "Клиент с такой почтой уже существует";
        }

        if (clientItem.phone == this.clientForm.phone) {
          error = "Клиент с таким номером уже существует";
        }
      }

      if (error == null) {
        let client = await this.postData("/api/v1/client/", this.clientForm);
        this.clients.push(client);
      } else {
        this.clientFormError = error;
        document.getElementById('clientError').style.display = ''

        setTimeout(function () {
          document.getElementById('clientError').style.display = 'none'
        }, 2000);
      }
    },

    deleteClient: async function(id) {
      let client = await this.deleteData(`/api/v1/client/delete/${id}`);
      // let index = this.clients.map(item => item.id).indexOf(id);
      // this.clients.splice(index, 1);
    },
    showOrders(id) {
      if (document.getElementById(`order-panel-${id}`).className == 'order-panel active') {
        document.getElementById(`order-panel-${id}`).className = 'order-panel'
      } else {
        document.getElementById(`order-panel-${id}`).className = 'order-panel active'
      }
      
    },
    getOrders: async function(id) {
      let clientsOrders = await this.getData(`/api/v1/client/orders/${id}`);
      return clientsOrders.data;
    }
  },
  async mounted() {
    let clients = await this.getData("/api/v1/clients");

    let clientsData = [];
    for (let client of clients.data) {
      orders = await this.getOrders(client.id);
      client['orders'] = orders
      clientsData.push(client)
    }
    
    this.clients = clientsData;
  },
});
