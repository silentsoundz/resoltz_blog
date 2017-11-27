const router = require('express').Router();
const db = require('../../models/posts');
// const { isLoggedIn } = require('../utilities/middlewares');

router.get('/', (request, response) => {
  console.log( "homepage:", request.session )
  db.getPosts()
    .then((posts, error) => {
      console.log(posts);
      if (error) {
        response.status(500).render('utilities/error', { error });
      } else {
        response.status(200).render('index', { posts });
      }
    });
});

router.get('/post/new', (request, response) => {
  const { member } = request.session;
  console.log('======> create post', request.session);
  response.status(200).render('pages/posts/new', { member });
});

router.post('/post', (request, response) => {
  const { post } = request.body;
  db.createPost(
    post.title,
    post.member_id,
    post.snippet,
    post.post_entry,
    post.image_url,
    post.tags,
    post.status,
    post.categories,
  )
    .then((newPost, error) => {
      console.log(newPost);
      if (error) {
        response.status(500).render('utilities/error', { error });
      } else {
        response.status(200).redirect('/');
      }
    });
});

module.exports = router;
