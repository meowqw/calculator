new Vue({
    delimiters: ['{*', '*}'],
    el: '#app',
    data: {

        // API endpoint
        diameters: [
            { 'value': '20 см', 'price': 20, 'total': 0 },
            { 'value': '30 см', 'price': 30, 'total': 0 }
        ],

        wallThickness: [],

        wallMaterial: [
            { 'value': 'Газоблок', 'price': 10, 'total': 0 },
            { 'value': 'Кирпич', 'price': 20, 'total': 0 },
            { 'value': 'Бетон', 'price': 30, 'total': 0 }
        ],

        coefficients: [
            { 'value': 'Глубина отверстий более 80 см', 'price': 10, 'total': 0 },
            { 'value': 'Глубина отверстий менее 80 см', 'price': 20, 'total': 0 },
        ],
        //


        items: [],
        count: 0,

        // results
        result: {
            'diameters': { "value": 0, 'total': 0 },
            'thickness': { "value": 0, 'total': 0 },
            'material': { "value": 0, 'total': 0 },
            'coefficient': { "value": 0, 'total': 0 },
            'remoteness': { "value": 0, 'total': 0 },
            'total': 0
        },
        //

    },
    methods: {
        addNewItem: async function () {
            var item = {
                'diameters': { "value": 'Не выбрано', 'price': 0, 'total': 0 },
                'thickness': { "value": 0, 'price': 0, 'total': 0 },
                'material': { "value": 'Не выбрано', 'price': 0, 'total': 0 },
                'coefficient': { "value": 'Не выбрано', 'price': 0, 'total': 0 },
                'total': 0,
                'count': 1,
            }
            this.items.push({ 'id': this.count, 'result': item });

            this.count++;

        },
        delItem: async function (id) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items.splice(i, 1);
                }
            }
        },
        calculate: function () {

        },

        openItem: function (id) {
            buttons = document.getElementsByClassName('btn-reset accordion hero__accordion')
            panels = document.getElementsByClassName('panel hero__panel')

            for (var i in buttons) {
                if (buttons[i].id == id) {
                    if (buttons[i].classList.toString().includes('active')) {
                        buttons[i].classList.remove('active')
                    } else {
                        buttons[i].classList.add('active')
                    }
                }
            }
            for (var i in panels) {
                if (panels[i].id == id) {
                    if (panels[i].style.cssText == 'max-height: 716px;') {
                        panels[i].style.cssText = ''
                    } else {
                        panels[i].style.cssText += 'max-height: 716px;'
                    }
                }
            }
        },
        changeValue: function (id, value, item) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result[value] = item
                }
            }
            this.caclulateTotalItem(id)
        },

        slider: function (el, id) {
            if (el == 'slider') {
                document.getElementById('amount' + id).value = document.getElementById('slider' + id).value
            } else if (el == 'amount') {
                document.getElementById('slider' + id).value = document.getElementById('amount' + id).value
            }
            var sliderValue = document.getElementById('amount' + id).value
            this.changeValue(id, 'thickness', { 'value': sliderValue, 'price': sliderValue, 'total': sliderValue })
        },

        changeCount: function (id) {
            var count = document.getElementById('count' + id).value
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['count'] = count
                }
            }

            this.caclulateTotalItem(id);
        },

        caclulateTotalItem: function (id) {
            for (var i in this.items) {
                if (this.items[i].id == id) {

                    this.items[i].result['diameters'] = {
                        'value': this.items[i].result['diameters'].value,
                        'total': Number(this.items[i].result['diameters'].price),
                        'price': Number(this.items[i].result['diameters'].price),
                    }
                    this.items[i].result['thickness'] = {
                        'value': this.items[i].result['thickness'].value,
                        'price': Number(this.items[i].result['thickness'].price),
                        'total': Number(this.items[i].result['thickness'].price * this.items[i].result['diameters'].price)
                    }
                    this.items[i].result['material'] = {
                        'value': this.items[i].result['material'].value,
                        'price': Number(this.items[i].result['material'].price),
                        'total': Number(this.items[i].result['material'].price * this.items[i].result['diameters'].total)
                    }
                    this.items[i].result['coefficient'] = {
                        'value': this.items[i].result['coefficient'].value,
                        'price': Number(this.items[i].result['coefficient'].price),
                        'total': Number(this.items[i].result['coefficient'].total)
                    }

                    var totals = [this.items[i].result['diameters'].total,
                    this.items[i].result['material'].total, 
                    this.items[i].result['thickness'].total,
                    this.items[i].result['coefficient'].total]
    
                    let result = totals.reduce(function(sum, elem) {
                        return sum + elem;
                    }, 0);
                    this.items[i].result.total = result * this.items[i].result.count
                }
            }
        },

    },
    async mounted() {
        // this.renderScript();

    }
})