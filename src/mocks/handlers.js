import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post('http://localhost:3000/api/signup', async ({ request }) => {
        const body = await request.json();
        console.log('Signup request body"', body);
        return HttpResponse.json({ success: true, message: 'Signup simulated successfully' });
    }),
    http.post('http://localhost:3000/api/accounts/login/', async ({ request }) => {
        const body = await request.json();
        console.log('Login request body:', body);
        return HttpResponse.json({
            access: 'mock-access-token',
            refresh: 'mock-refresh-token'
        });
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

    http.get('http://localhost:3000/api/posts', () => {
        return HttpResponse.json([
            {
                id: 1,
                title: '첫 번째 글',
                content: '이건 첫 번째 게시글입니다.',
                isAnon: true,
                date: new Date().toISOString(),
                likes: 5,
                comments: ['좋아요', '잘 봤어요']
            },
            {
                id: 2,
                title: '두 번째 글',
                content: '이건 두 번째 게시글입니다.',
                isAnon: false,
                date: new Date().toISOString(),
                likes: 2,
                comments: []
            }
        ]);
    }),
    http.get('http://localhost:3000/api/posts/:id', ({ params }) => {
      return HttpResponse.json({
        id: Number(params.id),
        title: '샘플 글',
        content: '이건 샘플 게시글입니다.',
        isAnon: false,
        date: new Date().toISOString(),
        likes: 0,
        comments: []
      });
    }),

    http.put('http://localhost:3000/api/posts/:id', async ({ request, params }) => {
      const updatedPost = await request.json();
      console.log('Updated post:', updatedPost);
      return HttpResponse.json(updatedPost);
    }),
];