const member = require('../app/models/member-profile');
const posts = require('../app/models/posts');

// create member: working
// member.createUser("Sophia", "Baah", "sbaah", "sbaah@gmail.com", "test1").then( newUser => console.log( newUser ))

// find user: working
// member.findUser("eobaah").then( oldUser => console.log( oldUser ))

// create post: working
// posts.createPost("the second post", 2, "this is a summary of the first post", "All the ladies in the place with style and grace allow me to introduce", "http://i.imgur.com/BpfH3s8l.jpg", "upper body, core",1,2).then( newPost => console.log( newPost ))

// get post by id: working
// posts.getPostByID(3).then( post => console.log( post))

// // get posts: working
// posts.getPosts().then(allPosts => console.log(allPosts));

// // // get by category: working
// posts.getPostsByCategoryID(2).then( posts => console.log( posts))

// // get post by member id: working
// posts.getPostsByMemberID(1).then( posts => console.log( posts))

// edit post: working
// posts.editPost( 1, {"title":"the edited post","member_id":1, "snippet":"this is a summary of the first edited post", "post_entry":"All the ladies in the place with style and grace allow me to introduce... this goes to you", "image_url":"http://i.imgur.com/BpfH3s8l.jpg","tags": "upper body, core","status":1,"categories":2} ).then( editedPost => console.log( editedPost ) )

// delete post by id: working
// posts.deletePost(1).then( post => console.log( post))

// search posts: working
// posts.searchPosts("ladies").then( post => console.log( post))

// create comment: working
// posts.createComment(4,2,'that verse was dope', 1).then(newComment => console.log(newComment))

// edit comment: working
// posts.editComment({
//     id: 1,
//     post_id: 1,
//     member_id: 1,
//     description: 'that edited verse was dope',
//     status: 1,
//     date_posted: '2017-11-13T00:48:58.194Z' }).then(editedComment => console.log(editedComment))

// delete comment by id: working
// posts.deleteComment(3).then( deletedComment => console.log( deletedComment))

// // get comment: working
// posts.getComments().then(allComments => console.log(allComments));

// // // get comment by id: working
//  posts.getCommentsByCategoryID(2).then(Comment => console.log(Comment));

// // // get comment by member id: working
 // posts.getCommentsByMemberID(1).then(Comment => console.log(Comment));

 // // // create workout: working
  // posts.createWorkout( 2,4, 'core  workout', 210, 682, 51, 99, 6, 7, 8, 7, 60, 6.1, 1, 'core, legs, cardio', 90, 'https://i.pinimg.com/originals/ef/d6/d2/efd6d2f4fb9cd192e705d11c83e606e9.jpg' ).then(workout => console.log(workout));

 // // // edit workout: working
  // posts.editWorkout( 3,{"post_id":3,"description": 'edited core workout',"weight": 210, "calories":682, "pushups":51,"squats": 99,"pullups_front_wide": 6,"pullups_front_close": 7,"pullups_reverse_wide": 8,"pullups_reverse_close": 7,"planks": 60,"distance": 6.1,"body_parts": 1, "tags": "core, legs, cardio","workout_length":90,"workout_image_url":'https://i.pinimg.com/originals/ef/d6/d2/efd6d2f4fb9cd192e705d11c83e606e9.jpg'} ).then(workout => console.log(workout));

  // get workouts by ID: working
  // posts.getWorkoutByID(3).then(workout => console.log(workout))

  // get workouts by bodypart: working
  // posts.getWorkoutsByBodyParts(1).then(workout => console.log(workout))

  // get workouts by member ID: working
  // posts.getWorkoutsByMemberID(2).then(workout => console.log(workout));

// search workouts : working
// posts.searchWorkouts('sbaah').then(workouts => console.log(workouts));

// delete workout : working
