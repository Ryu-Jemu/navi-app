import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post('http://localhost:3000/api/signup', async ({ request }) => {
        const body = await request.json();
        console.log('Signup request body"', body);
        return HttpResponse.json({ success: true, message: 'Signup simulated successfully' });
    }),
    http.post('http://localhost:3000/api/login', async ({ request }) => {
        const body = await request.json();
        console.log('Login request body"', body);
        return HttpResponse.json({ success: true, message: 'Login simulated successfully' });
    }),
    http.post('http://localhost:3000/api/findpassword', async ({ request }) => {
        const body = await request.json();
        console.log('Findpassword request body"', body);
        return HttpResponse.json({ success: true, message: 'Temporary password sent' });
    }),
    http.post('http://localhost:3000/api/chat', async ({ request }) => {
        const body = await request.json();
        console.log('Chat request body:', body);
        return HttpResponse.json({ reply: `Echo: ${body.message}` });
    }),
    http.post('http://localhost:3000/api/community', async ({ request }) => {
        const body = await request.json();
        console.log('Test request body:', body);
        return HttpResponse.json({ success: true, result: 'Test API response' });
    }),
];