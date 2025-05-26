// src/api/auth.js
const API_URL = 'http://localhost:3000/api';

export async function login({ studentId, password }) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password })
    });
    return res.json();
}

export async function signup({ name, nickname, country, studentId, password, email }) {
    const res = await fetch(`${API_URL}/signup`, {
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
