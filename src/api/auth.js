// src/api/auth.js
const API_URL = 'http://127.0.0.1:8000/api';

export async function login({ username, password }) {
    const res = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    // 토큰 저장 (access, refresh)
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    return data;
}

export async function signup({ username, password, email, student_id, nickname }) {
    const res = await fetch(`${API_URL}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, student_id, nickname })
    });

    if (!res.ok) throw new Error('Signup failed');

    return res.json();
}

export async function findPassword({ studentId, password }) {
    const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password })
    });
    return res.json();
}

export async function refreshToken(refresh) {
    const res = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
    });

    if (!res.ok) throw new Error('Token refresh failed');

    return res.json();
}

export async function resetPassword({ current_password, new_password }) {
    const res = await fetch(`${API_URL}/reset-password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({ current_password, new_password })
    });

    if (!res.ok) throw new Error('Password reset failed');

    return res.json();
}