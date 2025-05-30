// src/api/auth.js
const API_URL = 'http://localhost:3000/api';

export async function login({ studentId, password }) {
    const res = await fetch(`http://localhost:3000/api/accounts/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password })
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    // 토큰 저장 (access, refresh)
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    return data;
}

export async function signup({ name, nickname, country, studentId, password, email }) {
    const res = await fetch(`${API_URL}/accounts/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nickname, country, studentId, password, email })
    });
    return res.json();
}

export async function findPassword({ studentId, password }) {
    const res = await fetch(`${API_URL}/findpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password })
    });
    return res.json();
}
