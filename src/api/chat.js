
const API_URL = 'http://localhost:3000/api'; // 백엔드 주소에 맞게 수정

export const sendChatMessage = async (message) => {
    try {
        const res = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) {
            throw new Error('Failed to fetch response');
        }

        return await res.json(); // 예: { reply: 'ChatGPT 응답' }
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
};