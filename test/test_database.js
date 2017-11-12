const posts = require( '../app/models/posts')
const member = require( '../app/models/member-profile')

// create member: working
// member.createUser("Eugene", "Baah", "eobaah", "eobaah@gmail.com", "test1").then( newUser => console.log( newUser ))

// find user: working
// member.findUser("eobaah").then( oldUser => console.log( oldUser ))

//create post: working
// posts.createPost("the first post", 1, "this is a summary of the first post", "All the ladies in the place with style and grace allow me to introduce", "http://i.imgur.com/BpfH3s8l.jpg", "upper body, core",1,2).then( newPost => console.log( newPost ))

// get post by id: working
// posts.getPostByID(3).then( post => console.log( post))

// // get posts: working
// posts.getPosts().then( posts => console.log( posts))

// // // get by category: working
// posts.getPostsByCategoryID(2).then( posts => console.log( posts))

// // get post by member id: working
// posts.getPostsByMemberID(1).then( posts => console.log( posts))

//edit post: working
// posts.editPost( 1, {"title":"the edited post","member_id":1, "snippet":"this is a summary of the first edited post", "post_entry":"All the ladies in the place with style and grace allow me to introduce... this goes to you", "image_url":"http://i.imgur.com/BpfH3s8l.jpg","tags": "upper body, core","status":1,"categories":2} ).then( editedPost => console.log( editedPost ) )

// delete post by id: working
// posts.deletePost(1).then( post => console.log( post))

// search posts: working
// posts.searchPosts("ladies").then( post => console.log( post))
