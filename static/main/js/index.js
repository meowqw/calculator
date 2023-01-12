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
        }
        //

    },
    methods: {
        addNewItem: function() {
            var item = {
                'diameters': { "value": 0, 'total': 0 },
                'thickness': { "value": 0, 'total': 0 },
                'material': { "value": 0, 'total': 0 },
                'coefficient': { "value": 0, 'total': 0 },
                'remoteness': { "value": 0, 'total': 0 },
                'total': 0
            }
            this.items.push({'id': this.count, 'result': item});
            this.count++;

        },
        delItem: function(id){

        },
        calculate: function(){

        }

    },
    mounted() {

        let script = document.createElement("script");
        script.setAttribute(
        "src",
        "/static/main/js/main.js"
        );
        document.head.appendChild(script);
        //
    }
})