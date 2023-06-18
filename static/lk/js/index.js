new Vue({
  delimiters: ["{*", "*}"],
  el: "#app",

  data: {
    pageSize: 5,
    currentPage: 1,

    clients: null,
    clientForm: {
      phone: null,
      fio: null,
      email: null,
    },
    clientFormError: null,
    pagesLinks: [],
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
    deleteData: async function (url) {
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
        document.getElementById("clientError").style.display = "";

        setTimeout(function () {
          document.getElementById("clientError").style.display = "none";
        }, 2000);
      }
    },

    goToPage: async function (page) {
      let clients = await this.getData(`/api/v1/clients/?page=${page}`);
      this.currentPage = Number(page);

      let clientsData = [];
      for (let client of clients.data.results) {
        orders = await this.getOrders(client.id);
        client["orders"] = orders;
        clientsData.push(client);
      }
      this.clients = clientsData;
    },

    deleteClient: async function (id) {
      let client = await this.deleteData(`/api/v1/client/delete/${id}`);
      // let index = this.clients.map(item => item.id).indexOf(id);
      // this.clients.splice(index, 1);
    },
    showOrders(id) {
      if (
        document.getElementById(`order-panel-${id}`).className ==
        "table-order-panel active"
      ) {
        let panels = document.getElementsByClassName('table-order-panel');
        for (let i in panels) {
          if (panels[i].id == 'order-panel-' + id) {
            panels[i].className = "table-order-panel";
          }
        }
      } else {
        let panels = document.getElementsByClassName('table-order-panel');
        for (let i in panels) {
          if (panels[i].id == 'order-panel-' + id) {
            panels[i].className = "table-order-panel active";
          }
        }
      }
    },
    getOrders: async function (id) {
      let clientsOrders = await this.getData(`/api/v1/client/orders/${id}`);
      return clientsOrders.data;
    },

    goCalc: function(orderId) {
      document.location.href = `/?note=${orderId}`;
    }
  },
  async mounted() {
    let clients = await this.getData("/api/v1/clients");
    let pageCount = Math.ceil(clients.data.count / this.pageSize);
    let link = clients.data.next;

    for (let i of Array(pageCount).keys()) {
      linkId = {
        link: link.replace("page=2", `page=${i + 1}`),
        page: `${i + 1}`,
      };
      this.pagesLinks.push(linkId);
    }

    let clientsData = [];
    for (let client of clients.data.results) {
      orders = await this.getOrders(client.id);
      client["orders"] = orders;
      clientsData.push(client);
    }

    this.clients = clientsData;
  },
});
