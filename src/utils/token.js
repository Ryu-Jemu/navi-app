// src/utils/auth.js

/**
 * 로컬 스토리지에서 JWT 토큰을 가져와 Authorization 헤더 형태로 반환
 */
export function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * 현재 로그인한 사용자의 토큰을 반환
 */
export function getToken() {
    return localStorage.getItem('token');
}

/**
 * 토큰을 로컬 스토리지에 저장
 */
export function saveToken(token) {
    localStorage.setItem('token', token);
}

/**
 * 토큰을 삭제 (로그아웃 시 사용)
 */
export function clearToken() {
    localStorage.removeItem('token');
}