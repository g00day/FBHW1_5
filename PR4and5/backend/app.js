const express = require('express');
const app = express();
const port = 3000;

// Подключаем Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API управления товарами для рыбалки',
            version: '1.0.0',
            description: 'API для интернет-магазина рыболовных снастей',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер',
            },
        ],
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let products = [
    { 
        id: 1, 
        name: 'Крючок Owner 5314', 
        category: 'Крючки',
        description: 'Острые крючки из углеродистой стали для ловли карповых пород рыб',
        price: 350,
        stock: 150,
        rating: 4.8,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 2, 
        name: 'Катушка Daiwa Ninja', 
        category: 'Катушки',
        description: 'Безынерционная катушка с 5 подшипниками, идеальна для спиннинга',
        price: 4990,
        stock: 12,
        rating: 4.9,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 3, 
        name: 'Удочка маховая 5м', 
        category: 'Удочки',
        description: 'Легкое углепластиковое удилище для поплавочной ловли',
        price: 2100,
        stock: 8,
        rating: 4.5,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 4, 
        name: 'Поплавок Sensas', 
        category: 'Поплавки',
        description: 'Чувствительный поплавок для ловли в стоячей воде',
        price: 180,
        stock: 200,
        rating: 4.6,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 5, 
        name: 'Леска Sunline 0.2мм', 
        category: 'Лески',
        description: 'Монофильная леска с высокой прочностью на разрыв',
        price: 890,
        stock: 45,
        rating: 4.7,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 6, 
        name: 'Приманка Kosadaka', 
        category: 'Приманки',
        description: 'Силиконовая приманка для ловли хищной рыбы',
        price: 420,
        stock: 75,
        rating: 4.5,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 7, 
        name: 'Воблер Yo-Zuri', 
        category: 'Воблеры',
        description: 'Плавающий воблер с реалистичной игрой',
        price: 1250,
        stock: 18,
        rating: 4.9,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 8, 
        name: 'Сачок подсачек 3м', 
        category: 'Аксессуары',
        description: 'Телескопический подсачек с крупной ячеей',
        price: 1800,
        stock: 5,
        rating: 4.4,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 9, 
        name: 'Кормушка фидерная', 
        category: 'Кормушки',
        description: 'Металлическая кормушка для фидерной ловли',
        price: 290,
        stock: 120,
        rating: 4.6,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 10, 
        name: 'Термос для рыбы', 
        category: 'Сумки',
        description: 'Термос для сохранения улова в жаркую погоду',
        price: 2500,
        stock: 7,
        rating: 4.7,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    },
    { 
        id: 11, 
        name: 'Грузила 50г', 
        category: 'Грузила',
        description: 'Набор грузил для различных условий ловли',
        price: 420,
        stock: 90,
        rating: 4.5,
        photo: 'https://rybalkashop.ru/img/cache/products/hq/400x400/HQNgqQh2Knvl5OB4qB--2LuxBE_enl.jpg'
    }
];

// Функция-помощник для поиска товара
function findProductOr404(id, res) {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
        res.status(404).json({ error: 'Товар не найден' });
        return null;
    }
    return product;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: Автоматически сгенерированный ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара в рублях
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         rating:
 *           type: number
 *           description: Рейтинг товара (0-5)
 *         photo:
 *           type: string
 *           description: Путь к фото товара
 *       example:
 *         id: 1
 *         name: "Крючок Owner 5314"
 *         category: "Крючки"
 *         description: "Острые крючки из углеродистой стали"
 *         price: 350
 *         stock: 150
 *         rating: 4.8
 *         photo: "/images/hook-owner.jpg"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Фильтр по категории
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/products', (req, res) => {
    const { category } = req.query;
    
    if (category) {
        const filtered = products.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
        return res.json(filtered);
    }
    
    res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get('/products/:id', (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;
    res.json(product);
});

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Получает товары по категории
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Название категории
 *     responses:
 *       200:
 *         description: Товары категории
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Категория не найдена
 */
app.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    const filtered = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
    );
    
    if (filtered.length === 0) {
        return res.status(404).json({ error: 'Категория не найдена' });
    }
    
    res.json(filtered);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               photo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post('/products', (req, res) => {
    const { name, category, description, price, stock, rating, photo } = req.body;
    
    if (!name || !category || !description || !price || !stock) {
        return res.status(400).json({ 
            error: 'Недостаточно данных. Необходимо: name, category, description, price, stock' 
        });
    }

    if (price <= 0 || stock < 0) {
        return res.status(400).json({ 
            error: 'Цена должна быть больше 0' 
        });
    }
    
    const newProduct = {
        id: Date.now(),
        name,
        category,
        description,
        price: Number(price),
        stock: Number(stock),
        rating: rating || 0,
        photo: photo || '/images/default.jpg'
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Полностью обновляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, category, description, price, stock, rating, photo } = req.body;
    
    const product = findProductOr404(id, res);
    if (!product) return;
    
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.rating = rating !== undefined ? rating : product.rating;
    product.photo = photo || product.photo;
    
    res.json(product);
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Частично обновляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.patch('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const product = findProductOr404(id, res);
    if (!product) return;

    Object.assign(product, updates);
    res.json(product);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 */
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    
    products = products.filter(p => p.id !== id);
    
    if (products.length === initialLength) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json({ message: 'Товар успешно удален' });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Swagger UI http://localhost:${port}/api-docs`);
    console.log('\nДоступные маршруты:');
    console.log('  GET    /products                       - все товары');
    console.log('  GET    /products?category=     - фильтр по категории');
    console.log('  GET    /products/:id                    - товар по ID');
    console.log('  GET    /products/category/:category     - товары категории');
    console.log('  POST   /products                        - создать товар');
    console.log('  PUT    /products/:id                    - полное обновление');
    console.log('  PATCH  /products/:id                    - частичное обновление');
    console.log('  DELETE /products/:id                    - удалить товар');
});