const db = require( './connection' )

const getPosts = () => {
  return db.any(`
    SELECT * FROM post
    `, [])
    .catch( error => {
      console.error( {message: "Get all posts error",error, arguments: arguments})
      throw error
    })
}

const getPostByID = ( postID ) => {
  return db.any(`
    SELECT * FROM post
    WHERE id = $1
    `, [ postID ])
    .catch( error => {
      console.error( {message: "Get post by ID", arguments: arguments})
      throw error
    })
}

const getPostsByCategoryID = ( CategoryID ) => {
  return db.any(`
    SELECT * FROM post
    WHERE categories = $1
    `, [ CategoryID ])
    .catch( error => {
      console.error( {message: "Get post by CategoryID", arguments: arguments})
      throw error
    })
}

const getPostsByMemberID = ( MemberID ) => {
  return db.any(`
    SELECT * FROM post
    WHERE id = $1
    `, [ MemberID ])
    .catch( error => {
      console.error( {message: "Get post by MemberID", arguments: arguments})
      throw error
    })
}

const createPost = ( title, member_id, snippet, post_entry, image_url, tags, status, categories  ) =>{
  return db.query(`
    INSERT INTO
      post (title, member_id, snippet, post_entry, image_url, tags, status, categories)
    VALUES
      ($1::text, $2::int, $3::text, $4::text, $5::text, $6::text, $7::int, $8::int)
    RETURNING
      *
    `,
    [ title, member_id, snippet, post_entry, image_url, tags, status, categories ])
    .catch( error => {
      console.error( {message: "Cannot create post", arguments: arguments})
      throw error
    })
}

const editPost = ( id, post ) =>{
  return db.query(`
    UPDATE post
      SET title=$2, member_id=$3, snippet=$4, post_entry=$5, image_url=$6, tags=$7, status=$8, categories=9
    WHERE id=$1
    RETURNING
      *
    `,
    [id, post.title, post.member_id, post.snippet, post.post_entry, post.image_url, post.tags, post.status, post.categories ])
    .catch( error => {
      console.error( {message: "Cannot edit post", arguments: arguments})
      throw error
    })
}

const deletePost = ( postID ) =>{
  return db.query(`
    DELETE FROM post
    WHERE id=$1::int
    RETURNING
      *
    `,
    [ postID ])
    .catch( error => {
      console.error( {message: "Cannot delete post", arguments: arguments})
      throw error
    })
}

const searchPosts = input => {
  input = `%${input}%`
  return db.manyOrNone(`
    SELECT * FROM post
    JOIN member
    ON member.id = post.member_id
    WHERE UPPER(post.title) like UPPER($1)
    OR UPPER(member.username) like UPPER($1)
    OR UPPER(post.snippet) like UPPER($1)
    OR UPPER(post.post_entry) like UPPER($1)
    OR UPPER(post.tags) like UPPER($1)`,
    [ input ] )
}

const createComment = ( post_id, member_id, description, status ) => {
  return db.query(`
    INSERT INTO
      comment (post_id, member_id, description, status )
    VALUES
      ($1::text, $2::int, $3::text, $4::int )
    RETURNING
      *
    `,
    [ post_id, member_id, description, status ])
    .catch( error => {
      console.error( {message: "Cannot create comment", arguments: arguments})
      throw error
    })
}

const editComment = ( comment ) => {
  return db.query(`
    UPDATE comment
      SET post_id=$2, member_id=$3, description=$4, status=$5
    WHERE id=$1
    RETURNING
      *
    `,
    [comment.id, comment.post_id, comment.member_id, comment.description, comment.status ])
    .catch( error => {
      console.error( {message: "Cannot edit comment", arguments: arguments})
      throw error
    })
}

const deleteComment = ( commentID ) =>{
  return db.query(`
    DELETE FROM comment
    WHERE id=$1::int
    RETURNING
      *
    `,
    [ commentID ])
    .catch( error => {
      console.error( {message: "Cannot delete post", arguments: arguments})
      throw error
    })
}

const getComments = () => {
  return db.any(`
    SELECT * FROM comment
    `, [])
    .catch( error => {
      console.error( {message: "Get all comments error",error, arguments: arguments})
      throw error
    })
}

const getCommentByID = ( commentID ) => {
  return db.any(`
    SELECT * FROM comment
    WHERE id = $1
    `, [ commentID ])
    .catch( error => {
      console.error( {message: "Get comment by commentID", arguments: arguments})
      throw error
    })
}

const getCommentsByCategoryID = ( categoryID ) => {
  return db.any(`
    SELECT * FROM comment
    WHERE id = $1
    `, [ categoryID ])
    .catch( error => {
      console.error( {message: "Get comments by CategoryID", arguments: arguments})
      throw error
    })
  }

const getCommentsByMemberID = ( memberID ) => {
  return db.any(`
    SELECT * FROM comment
    WHERE id = $1
    `, [ memberID ])
    .catch( error => {
      console.error( {message: "Get comment by memberID", arguments: arguments})
      throw error
    })
  }

const getWorkouts = () => {
  return db.any(`
    SELECT * FROM workout
    `, [])
    .catch( error => {
      console.error( {message: "Get all workouts error",error, arguments: arguments})
      throw error
    })
}

const getWorkoutByID = ( workoutID ) => {
  return db.any(`
    SELECT * FROM workout
    WHERE id = $1
    `, [ workoutID ])
    .catch( error => {
      console.error( {message: "Get post by workoutID", arguments: arguments})
      throw error
    })
}

const getWorkoutsByBodyParts = ( bodyParts ) => {
  return db.any(`
    SELECT * FROM workouts
    WHERE UPPER(body_parts) LIKE UPPER($1)
    `, [ bodyParts ])
    .catch( error => {
      console.error( {message: "Get post by bodyParts", arguments: arguments})
      throw error
    })
}

const getWorkoutsByMemberID = ( MemberID ) => {
  return db.any(`
    SELECT * FROM workout
    JOIN post
    ON post.id = workout.post_id
    JOIN member
    ON member.id = post.member_id
    WHERE member.id = $1
    `, [ MemberID ])
    .catch( error => {
      console.error( {message: "Get workouts by MemberID", arguments: arguments})
      throw error
    })
}

const createWorkout = ( post_id, description, weight, calories, pushups, squats, pullups_front_wide, pullups_front_close, pullups_reverse_wide, pullups_reverse_close, planks, distance, body_parts, tags, workout_length, workout_image_url ) =>{
  return db.query(`
    INSERT INTO
      workout (post_id, description, weight, calories, pushups, squats, pullups_front_wide, pullups_front_close, pullups_reverse_wide, pullups_reverse_close, planks, distance, body_parts, tags, workout_length, workout_image_url)
    VALUES
      ($1::text, $2::int, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::text, $10::text, $11::text, $12::text, $13::text, $14::text, $15::text, $16::text )
    RETURNING
      *
    `,
    [ post_id, description, weight, calories, pushups, squats, pullups_front_wide, pullups_front_close, pullups_reverse_wide, pullups_reverse_close, planks, distance, body_parts, tags, workout_length, workout_image_url ])
    .catch( error => {
      console.error( {message: "Cannot create workout", arguments: arguments})
      throw error
    })
}

const editWorkout = ( id, workout ) =>{
  return db.query(`
    UPDATE workout
      SET
        post_id=$2,
        description=$3,
        weight=$4,
        calories=$5,
        pushups=$6,
        squats=$7,
        pullups_front_wide=$8,
        pullups_front_close=$9,
        pullups_reverse_wide=$10,
        pullups_reverse_close=$11,
        planks=$12,
        distance=$13,
        body_parts=$14,
        tags=$15,
        workout_length=$16,
        workout_image_url=$17
    WHERE id=$1
    RETURNING
      *
    `,
    [ id,
      workout.post_id,
      workout.description,
      workout.weight,
      workout.calories,
      workout.pushups,
      workout.squats,
      workout.pullups_front_wide,
      workout.pullups_front_close,
      workout.pullups_reverse_wide,
      workout.pullups_reverse_close,
      workout.planks,
      workout.distance,
      workout.body_parts,
      workout.tags,
      workout.workout_length,
      workout.workout_image_url
    ])
    .catch( error => {
      console.error( {message: "Cannot edit workout", arguments: arguments})
      throw error
    })
}

const deleteWorkout = ( workoutID ) =>{
  return db.query(`
    DELETE FROM workout
    WHERE id=$1::int
    RETURNING
      *
    `,
    [ workoutID ])
    .catch( error => {
      console.error( {message: "Cannot delete post", arguments: arguments})
      throw error
    })
}

const searchWorkouts = input => {
  input = `%${input}%`
  return db.any(`
    SELECT * FROM workout
    JOIN member
    ON member.id = workout.member_id
    WHERE UPPER(workout.description) like UPPER($1)
    OR UPPER(member.username) like UPPER($1)
    OR UPPER(workout.body_parts) like UPPER($1),
    OR UPPER(workout.tags) like UPPER($1),
    OR UPPER(workout.workout_length) like UPPER($1)`,
    [ input ] )
}

module.exports = {
  getPosts,
  getPostByID,
  getPostsByCategoryID,
  getPostsByMemberID,
  createPost,
  editPost,
  deletePost,
  searchPosts,
  getComments,
  getCommentByID,
  getCommentsByCategoryID,
  getCommentsByMemberID,
  createComment,
  editComment,
  deleteComment,
  getWorkouts,
  getWorkoutByID,
  getWorkoutsByBodyParts,
  getWorkoutsByMemberID,
  createWorkout,
  editWorkout,
  deleteWorkout,
  searchWorkouts
}
