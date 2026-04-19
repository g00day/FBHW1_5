import React, { useState } from 'react';
import { login, register } from '../../API/apiClient';
import styles from './Auth.module.css';

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const { email, password } = form;
                if (!email || !password) {
                    setError('Email и пароль обязательны');
                    return;
                }
                const data = await login({ email, password });
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                onLogin();
            } else {
                const { email, password, first_name, last_name } = form;
                if (!email || !password || !first_name || !last_name) {
                    setError('Все поля обязательны');
                    return;
                }
                await register({ email, first_name, last_name, password });
                setIsLogin(true);
                setForm({ email: '', password: '', first_name: '', last_name: '' });
                alert('Регистрация успешна! Теперь войдите в систему.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                {error && <div className={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Имя"
                                value={form.first_name}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Фамилия"
                                value={form.last_name}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </>
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                <p className={styles.switch}>
                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                    <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton}>
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;