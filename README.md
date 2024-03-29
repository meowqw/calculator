# Калькулятор

## API
| URL      | Ответ |
| --------- | -----|
| api/v1/CoefficientsList/  | Коэффициенты |
| api/v1/DiameterList/      |   Диаметры коронок с материалами |
| api/v1/MaterialsList/  | Материалы |
| api/v1/LogisticList/  | Цена за 1 км |

## v0.1
- Базовая струтура проекта

## v0.2
- Логика для подсчета занчений у отдельного отверстия
- Возможность указать кол-во отвертий

## v0.3
- Законченная логика (без api)
- Рассчет расстояния
- Новая методика рассчета (отдельные методы для каждого атрибута)

## v0.4
- API

| URL      | Ответ |
| --------- | -----|
| api/v1/CoefficientsList/  | Коэффициенты |
| api/v1/DiameterList/      |   Диаметры коронок с материалами |

- Рассчет с api yandex
- Небольшие изменения в верстке

## v0.5
- Смета (попап, только верстка)
- Небольшие изменения в верстке 

## v0.6
- API (new URL)

| URL      | Ответ |
| --------- | -----|
| api/v1/MaterialsList/  | Материалы |

- Модели диаметров и материалов имееют новую структуру
- Админка отредактирована (Заполнение JSON material в диаметрах имеет вид формы)
- JSON материалы в модели диаметров + возможность удобно их редактировать через админку
- Рассчет маршрута для удаленности 
- Маршрут считается от одной из 12 точек (часы) МКАДА

## v0.7

- API (new URL)

| URL      | Ответ |
| --------- | -----|
| api/v1/LogisticList/  | Цена за 1 км |

- Скрыто поле тотал в админ панели у диаметров
- Добавлена модель логистика для установки цены за 1 км
- Изменено отображение json материалов у диаметров
- radiobutton заменен на select для коэффициентов
- Добавлено значение НЕ ВЫБРАНО (price 1) для коэффициентов
- Округление чисел
- Вывод кол-ва км

## v0.8

- API (new URL)

| URL      | Ответ |
| --------- | -----|
| api/v1/ExtraWorksList/  | Дополнительные работы |

- Новое поле Дополнительные работы 
- Можно выбрать несколько доп работ, цена которых суммируется с тоталом
- Можно выбрать несколько Коэффициентов
- Полностью переработана логика множественного выбора (селекты были заменены на чекбоксы)

## v0.8.1

- Доп работы вынесены за пределы отверстий и теперь суммируются сразу с тоталом 

## v0.9

- API (new URL)

| URL      | Ответ |
| --------- | -----|
| api/v1/StartTotalList/  | Стартовая начальная цена |

- Нопое поле стартовая цена 
- Начальная цена берется с бд, но ее можно изменить в поле начальная цена

## v0.9.1

- Рассчет скидки в главном калькуляторе


## v1.0 (Новый калькулятор)
- Верстка нового калькулятора
- Логика нового калькулятора
- При рассчете цены используется данные одного из диаметра, который выбирается в админ панели
- Новая модель DiameterSecondCalc
- Рассчет кол-ва отверстий (периметр / диаметр отверстия)

- API (new URL)

| URL      | Ответ |
| --------- | -----|
| api/v1/DimeterSecondCalcList/  | Выбор дефолтного диаметра для второго калькудятора |

## v1.0.1 
- Изменена логика начального тотала для первого каоткулятора, теперь она берется из коэффициента 
- Изменена модель Коэффициента, добавлено поле start_total которое ссылается на модель StartTotal 

## v1.0.2
- Возможность добавить несколько проемов во втором калькуляторе
- Общий результат для первого и второго калькулятора
- Доп работа, скидка и логистика - общая для двух калькуляторов

## v1.0.3 (изменение логики стартового тотала)
- API (new URL)
| URL      | Ответ |
| --------- | -----|
| api/v1/StartTotal/  | Получение стартового тотала |

- Новая таблица в бд (StartTotalWithoutCoef)
- Данные с новой даблицы будут учитываться как стартовый тотал до того момента как пользователь не укажит Коэффициент


## v1.0.4 (работа с данными клиента)
- API (new URL)
| URL      | Ответ |
| --------- | -----|
| api/v1/client/  | Пост запрос на доабвления нового клиента |
| api/v1/client/<int:id>  | Получение конерктного клиента по id |

- Новая таблица в бд (Client)
- Выпадающее менб сбогу для добавления данных о клиенте 
- Возможно записать данные о клиенте 
- В поле заметки генерируется результат работы калькулятора (calc1 calc2)


## v1.0.5 (Календарь)
- Возможность управлять ко-во проемов во втором калькуляторе
- Подстановка данныъ о клиенте по номеру телефона

- API (new url)
| URL      | Ответ |
| --------- | -----|
| api/v1/clientNote/  | Создать заметку о заказе клиента |
| api/v1/clientByPhone/<str:phone>  | Получить список клиентов по телефону |

- Новая таблица в бд для разделения заметок о заказе и данных клиента (ClientNote)
- При создании заметки СОЗДАЕТСЯ ЗАМЕТКА В ГУГЛ КАЛЕНДАРЕ (api/googleAPI/calendar/calendar.py)


## v1.0.6
- Привязан новый календарь
- Добавлено поле time в форму и в модель ClientNote
- Маска на номере 
- Выбор телефона из возможных если введен полный 

## v1.0.7
- Переработанный вид sidebar (формы ввода данных клиента)
