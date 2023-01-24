
new Vue({
    delimiters: ['{*', '*}'],
    el: '#app',
    data: {
        // API endpoint
        diameters: [
            // {
            //     'id': 1,
            //     'value': '10-16 см', 'total': 0,
            //     'material': [
            //         { 'value': 'Газоблок', 'price': 10},
            //         { 'value': 'Кирпич', 'price': 20},
            //         { 'value': 'Бетон', 'price': 30}
            //     ]
            // },
            // {
            //     'id': 2,
            //     'value': '16-20 см', 'total': 0,
            //     'material': [
            //         { 'value': 'Газоблок2', 'price': 15},
            //         { 'value': 'Кирпич2', 'price': 25},
            //         { 'value': 'Бетон2', 'price': 35}
            //     ]
            // },
        ],

        coefficients: [
            // { 'value': 'Глубина отверстий более 80 см', 'price': 10},
            // { 'value': 'Глубина отверстий менее 80 см', 'price': 20},
            // { 'value': 'Не выбрано', 'price': 1}
        ],
        //


        items: [],
        count: 0,

        // results
        result: {
            // 'diameters': { "value": 0, 'total': 0 },
            // 'thickness': { "value": 0, 'total': 0 },
            // 'material': { "value": 0, 'total': 0 },
            // 'coefficient': { "value": 0, 'total': 0 },
            'remoteness': { "value": 'Не указано', 'total': 0 },
            'total': 0
        },
        //

    },
    methods: {
        // add new item 
        addNewItem: async function () {
            var item = {
                'diameters': { "value": 'Не выбрано', 'total': 0 },
                'material': { "value": 'Не выбрано', 'price': 0 },
                'thickness': { "value": 0, 'price': 0, 'total': 0 },
                'coefficient': { "value": 'Не выбрано', 'price': 1 },
                'total': 0,
                'count': 1,
            }
            this.items.push({ 'id': this.count, 'result': item });

            this.count++;

        },
        // delete item by id
        delItem: async function (id) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items.splice(i, 1);
                }
            }

            this.calculate();
        },
        calculate: function () {
            total = 0
            for (var i in this.items) {
                total += this.items[i].result.total
            }

            if (this.result.remoteness.total != 0) {
                this.result.total = total + Number(this.result.remoteness.total)
            } else {
                this.result.total = total
            }



        },
        // show panel item
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

        changeDiameter: function (id, diameter) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['material'] = { "value": 'Не выбрано', 'price': 0 }
                    this.items[i].result['diameters'] = diameter
                    this.items[i].result['total'] = 0
                    this.items[i].result['diameters'].total = 0

                    this.items[i].result['diameters'].total = this.items[i].result['diameters'].total * this.items[i].result['coefficient'].price

                }
            }

            var materialsbtn = document.getElementsByName('material');
            for (var i in materialsbtn) {
                materialsbtn[i].checked = false;
            }

            this.calculate();
        },

        changeMaterial: function (id, material) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['diameters'].total = material.price * this.items[i].result['coefficient'].price
                    this.items[i].result['material'] = material

                    this.items[i].result['total'] = (this.items[i].result['diameters'].total * this.items[i].result['thickness'].total) * this.items[i].result['count']
                }
            }
            this.calculate();
        },

        changeThickness: function (id, thickness) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['thickness'] = thickness
                    this.items[i].result['total'] = (this.items[i].result['diameters'].total * this.items[i].result['thickness'].total) * this.items[i].result['count']
                }
            }
            this.calculate();
        },

        changeCoefficient: function (id, coefficient) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['coefficient'] = coefficient

                    // diameter
                    material = this.items[i].result['material']
                    this.items[i].result['diameters'].total = material.price * this.items[i].result['coefficient'].price

                    // total
                    this.items[i].result['total'] = (this.items[i].result['diameters'].total * this.items[i].result['thickness'].total) * this.items[i].result['count']

                }
            }
            this.calculate();
        },


        // SLIDER
        slider: function (el, id) {
            if (el == 'slider') {
                document.getElementById('amount' + id).value = document.getElementById('slider' + id).value
            } else if (el == 'amount') {
                document.getElementById('slider' + id).value = document.getElementById('amount' + id).value
            }
            var sliderValue = document.getElementById('amount' + id).value
            this.changeThickness(id, { 'value': sliderValue, 'price': sliderValue, 'total': sliderValue })
        },

        // total item
        caclulateTotalItem: function (id) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    count = this.items[i].result['count']
                    total = this.items[i].result['total']
                    this.items[i].result['total'] = (this.items[i].result['diameters'].total * this.items[i].result['thickness'].total) * count
                }
            }
            this.calculate();
        },

        // COUNT
        btnCountMinus: function (id) {
            current = document.getElementById('count' + id).value
            document.getElementById('count' + id).value = Number(current) - 1

            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['count'] = document.getElementById('count' + id).value
                }
            }

            this.caclulateTotalItem(id);


        },
        btnCountPlus: function (id) {
            current = document.getElementById('count' + id).value
            document.getElementById('count' + id).value = Number(current) + 1

            for (var i in this.items) {
                if (this.items[i].id == id) {
                    this.items[i].result['count'] = document.getElementById('count' + id).value
                }
            }

            this.caclulateTotalItem(id);
        },
        inputCount: function (id) {

            for (var i in this.items) {

                if (this.items[i].id == id) {
                    this.items[i].result['count'] = document.getElementById('count' + id).value
                }
            }

            this.caclulateTotalItem(id);

        },

        inputRemotenessValue: function () {
            // Authocomplete location in input 
            ymaps = window.ymaps;
            var suggestView1 = new ymaps.SuggestView('remValue');


        },
        getData: async function (url) {
            try {
                const response = await axios.get(url);
                return response;
            } catch (error) {
                console.error(error);
            }
        },
        

        remoteness: function () {
            minimalValue = 10
            coordHours = []
            hour = 0

            // search for the most suitable coordinates
            hours = {
                '12': [55.911814, 37.581631],
                '13': [55.893643, 37.701462],
                '14': [55.829645, 37.828263],
                '15': [55.756941, 37.842828],
                '16': [55.710303, 37.837371],
                '17': [55.628071, 37.798663],
                '18': [55.574423, 37.638674],
                '19': [55.613306, 37.491045],
                '20': [55.674274, 37.425127],
                '21': [55.773392, 37.372754],
                '22': [55.835345, 37.396326],
                '23': [55.885282, 37.458842]
            }

            
            // calculate remothess from MKAD to location
            let promise = new Promise((resolve, reject) => {
                loc = document.getElementById('remValue').value
                
                // GET COORD 
                ymaps.geocode(loc).then(function (res) {
                    var newCoords = res.geoObjects.get(0).geometry.getCoordinates();

                    for (var i in hours) {
                        differenceLatitude = Math.abs(hours[i][0] - newCoords[0])  // разница по широте
                        differenceLongitude = Math.abs(hours[i][1] - newCoords[1])  // разница по долготе
                        if (minimalValue > (differenceLongitude + differenceLatitude)) {
                            minimalValue = (differenceLongitude + differenceLatitude)
                            coordHours = hours[i]
                            hour = i
                        }
                    }
                    
                    // GET ROUTE
                    ymaps.route([
                        coordHours,
                        newCoords,
                    ],).then(function (route) {
                        resolve(route.getLength())
                    });
                    
                    
                });
            });


            promise.then(rem => this.calcRemoteness(rem, loc))

        },

        calcRemoteness: function (rem, loc) {
            this.result.remoteness = { 'value': loc, 'total': (rem / 1000).toFixed(2) }
            this.calculate();
        }
        //
    },
    async mounted() {
        let script = document.createElement("script");
        script.setAttribute(
            "src",
            "https://api-maps.yandex.ru/2.1/?apikey=334f77fd-ed61-4f8d-8b91-6b78273063bf&lang=ru_RU"
        );
        document.head.appendChild(script);

        var diameters = await this.getData('/api/v1/DiameterList/')
        var coefficients = await this.getData('/api/v1/CoefficientsList/')
        this.coefficients = coefficients.data;
        this.diameters = diameters.data;

        

    }
})