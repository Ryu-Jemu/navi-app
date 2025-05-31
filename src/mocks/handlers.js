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

    /* addCommunityPost - param request
        const newPost = {
              title,
              content,
              isAnon,
              date: new Date().toISOString(),
            };
     */
    http.post('http://localhost:3000/api/community', async ({ request }) => {
        const body = await request.json();
        console.log('Test request body:', body);
        return HttpResponse.json({ success: true, result: 'Test API response' });
    }),

    // fetchCommunityPosts
    // 커뮤니티 main 페이지이다.
    http.get('http://localhost:3000/api/posts', () => {
        return HttpResponse.json([
            {
                id: 1,
                title: '첫 번째 글',
                content: '이건 첫 번째 게시글입니다.',
                isAnon: true,
                date: new Date().toISOString(), // string
                likes: 5,
                comments: ['좋아요', '잘 봤어요']
            },
            {
                id: 2,
                title: '두 번째 글',
                content: '이건 두 번째 게시글입니다.',
                isAnon: false,
                date: new Date().toISOString(), //string
                likes: 2,
                comments: []
            }
        ]);
    }),

    // fetchPostDetail
    // 커뮤니티 main 페이지에서 글을 클릭하면 해당 글의 상세 정보를 가져온다. 여기에서는 댓글이 명시적으로 보인다. 다른점은 해당 글의id를 파라미터로 받는다는 것이다.
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

    // updatePost
    // 커뮤니티 main 페이지에서 글을 수정할 때 사용한다. ex) 댓글 달기, 댓글 입력
    /*
        {
          "id": 3,
          "title": "수정된 제목",
          "content": "수정된 내용",
          "likes": 4,
          "comments": ["좋아요!", "감사합니다."]
        }
     */
    http.put('http://localhost:3000/api/posts/:id', async ({ request, params }) => {
      const updatedPost = await request.json();
      console.log('Updated post:', updatedPost);
      return HttpResponse.json(updatedPost);
    }),
];