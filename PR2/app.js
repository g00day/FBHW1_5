const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// имитация бд в памяти
let products = [
    { id: 1, name: 'Крючок', price: 75000 },
    { id: 2, name: 'Катушка', price: 2500 },
    { id: 3, name: 'Удочка', price: 8900 }
];

// получить все товары
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(product);
});

// CREATE - создать новый товар
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Not enought data' });
    }
    
    const newProduct = {
        id: Date.now(), // в качестве id - актуальное время
        name,
        price
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});


app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Not found' });
    }
    
    if (name) product.name = name;
    if (price) product.price = price;
    
    res.json(product);
});


app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    
    products = products.filter(p => p.id !== id);
    
    if (products.length === initialLength) {
        return res.status(404).json({ error: 'Not found' });
    }
    
    res.json({ message: 'The good was deleted successfully' });
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log('\nAvailable routes:');
    console.log('GET    /products');
    console.log('GET    /products/:id');
    console.log('POST   /products');
    console.log('PUT    /products/:id');
    console.log('DELETE /products/:id');
});