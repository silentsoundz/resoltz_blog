const db = require( './database/posts')

module.exports = {
  getPosts: db.getPosts,
  getPostByID: db.getPostByID,
  getPostsByCategoryID: db.getPostsByCategoryID,
  getPostsByMemberID: db.getPostsByMemberID,
  createPost: db.createPost,
  editPost: db.editPost,
  deletePost: db.deletePost,
  searchPosts: db.searchPosts,
  getComments: db.getComments,
  getCommentByID: db.getCommentByID,
  getCommentsByCategoryID: db.getCommentsByCategoryID,
  getCommentsByMemberID: db.getCommentsByMemberID,
  createComment: db.createComment,
  editComment: db.editComment,
  deleteComment: db.deleteComment,
  getWorkouts: db.getWorkouts,
  getWorkoutByID: db.getWorkoutByID,
  getWorkoutsByBodyParts: db.getWorkoutsByBodyParts,
  getWorkoutsByMemberID: db.getWorkoutsByMemberID,
  createWorkout: db.createWorkout,
  editWorkout: db.editWorkout,
  deleteWorkout: db.deleteWorkout,
  searchWorkouts: db.searchWorkouts
}
