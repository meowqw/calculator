new Vue({
    delimiters: ['{*', '*}'],
    el: '#app',
    data: {

        // API endpoint
        diameters: [
            { 'value': '20 см', 'weight': 10 },
            { 'value': '30 см', 'weight': 20 }
        ],

        wallThickness: [],

        wallMaterial: [
            { 'value': 'Газоблок', 'weight': 10 },
            { 'value': 'Кирпич', 'weight': 20 },
            { 'value': 'Бетон', 'weight': 30 }
        ],

        coefficients: [
            { 'value': 'Глубина отверстий более 80 см', 'weight': 20 },
            { 'value': 'Глубина отверстий менее 80 см', 'weight': 10 },
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
                'diameters': { "value": 0, 'total': 0 },
                'thickness': { "value": 0, 'total': 0 },
                'material': { "value": 0, 'total': 0 },
                'coefficient': { "value": 0, 'total': 0 },
                'remoteness': { "value": 0, 'total': 0 },
                'total': 0
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
                    if (buttons[i].classList.toString().includes('active')){
                        buttons[i].classList.remove('active')
                    }else {
                        buttons[i].classList.add('active')
                    }
                }
            }
            for (var i in panels) {
                if (panels[i].id == id) {
                    if (panels[i].style.cssText == 'max-height: 716px;'){
                       panels[i].style.cssText = ''
                    } else {
                        panels[i].style.cssText += 'max-height: 716px;'
                    }
                }
            }
        }

    },
    async mounted() {
        // this.renderScript();

    }
})