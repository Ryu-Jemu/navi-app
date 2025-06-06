import {getAuthHeader} from "../utils/token";

const API_URL = 'http://127.0.0.1:8000/api/schedule/';

// 일정 목록 조회
export async function fetchSchedules() {
    const res = await fetch(API_URL, {
        method: 'GET',
        headers: {
            ...getAuthHeader(),
        },
    });

    if (!res.ok) throw new Error('일정 목록 불러오기 실패');

    return res.json();
}

// 일정 생성
export async function createSchedule({ title, description, start_time, end_time }) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify({ title, description, start_time, end_time }),
    });

    if (!res.ok) throw new Error('일정 생성 실패');

    return res.json();
}