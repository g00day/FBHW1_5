import React, { useState, useEffect } from 'react';
import api from '../../API/apiClient';
import styles from './ProductManager.module.css';

function ProductManager() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: ''
    });

    // Загрузка товаров
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    };

    // Добавление товара
    const addProduct = async () => {
        try {
            await api.post('/products', {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
                rating: 0,
                photo: '/images/default.jpg'
            });
            setForm({ name: '', category: '', description: '', price: '', stock: '' });
            loadProducts();
        } catch (error) {
            console.error('Ошибка добавления:', error);
        }
    };

    // Обновление товара
    const updateProduct = async () => {
        if (!editingProduct) return;
        try {
            await api.put(`/products/${editingProduct.id}`, {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock)
            });
            setEditingProduct(null);
            setForm({ name: '', category: '', description: '', price: '', stock: '' });
            loadProducts();
        } catch (error) {
            console.error('Ошибка обновления:', error);
        }
    };

    // Удаление товара
    const deleteProduct = async (id) => {
        if (!confirm('Удалить товар?')) return;
        try {
            await api.delete(`/products/${id}`);
            loadProducts();
        } catch (error) {
            console.error('Ошибка удаления:', error);
        }
    };

    // Начало редактирования
    const startEdit = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            stock: product.stock
        });
    };

    // Отмена редактирования
    const cancelEdit = () => {
        setEditingProduct(null);
        setForm({ name: '', category: '', description: '', price: '', stock: '' });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Управление товарами</h2>
            
            {/* Форма добавления/редактирования */}
            <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                    {editingProduct ? 'Редактировать' : 'Добавить'} товар
                </h3>
                <input
                    type="text"
                    placeholder="Название"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Категория"
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Описание"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Цена"
                    value={form.price}
                    onChange={(e) => setForm({...form, price: e.target.value})}
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Количество"
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: e.target.value})}
                    className={styles.input}
                />
                
                <div className={styles.buttonGroup}>
                    {editingProduct ? (
                        <>
                            <button onClick={updateProduct} className={styles.saveButton}>
                                Сохранить
                            </button>
                            <button onClick={cancelEdit} className={styles.cancelButton}>
                                Отмена
                            </button>
                        </>
                    ) : (
                        <button onClick={addProduct} className={styles.addButton}>
                            Добавить
                        </button>
                    )}
                </div>
            </div>

            {/* Список товаров */}
            <div>
                <h3 className={styles.listTitle}>
                    Все товары ({products.length})
                </h3>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.productInfo}>
                            <div>
                                <span className={styles.productName}>{product.name}</span>
                                <span className={styles.productPrice}>{product.price}₽</span>
                                <span className={styles.productStock}>({product.stock} шт.)</span>
                                <div className={styles.productDetails}>
                                    {product.category} | {product.description}
                                </div>
                            </div>
                            <div>
                                <button 
                                    onClick={() => startEdit(product)}
                                    className={styles.editButton}
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => deleteProduct(product.id)}
                                    className={styles.deleteButton}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductManager;