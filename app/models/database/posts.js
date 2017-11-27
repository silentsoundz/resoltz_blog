const db = require('./connection');

const getPosts = () => db.any(`
    SELECT * FROM post
    `, [])
  .catch((error) => {
    console.error({ message: 'Get all posts error', error, arguments });
    throw error;
  });

const getPostByID = postID => db.any(`
    SELECT * FROM post
    WHERE id = $1
    `, [postID])
  .catch((error) => {
    console.error({ message: 'Get post by ID', arguments });
    throw error;
  });

const getPostsByCategoryID = CategoryID => db.any(`
    SELECT * FROM post
    WHERE categories = $1
    `, [CategoryID])
  .catch((error) => {
    console.error({ message: 'Get post by CategoryID', arguments });
    throw error;
  });

const getPostsByMemberID = MemberID => db.any(`
    SELECT * FROM post
    WHERE id = $1
    `, [MemberID])
  .catch((error) => {
    console.error({ message: 'Get post by MemberID', arguments });
    throw error;
  });

const createPost = (title, member_id, snippet, post_entry, image_url, tags, status, categories) => db.query(
  `
    INSERT INTO
      post (title, member_id, snippet, post_entry, image_url, tags, status, categories)
    VALUES
      ($1::text, $2::int, $3::text, $4::text, $5::text, $6::text, $7::int, $8::int)
    RETURNING
      *
    `,
  [title, member_id, snippet, post_entry, image_url, tags, status, categories],
)
  .catch((error) => {
    console.error({ message: 'Cannot create post', arguments });
    throw error;
  });

const editPost = (id, post) => db.query(
  `
    UPDATE post
      SET title=$2, member_id=$3, snippet=$4, post_entry=$5, image_url=$6, tags=$7, status=$8, categories=9
    WHERE id=$1
    RETURNING
      *
    `,
  [id, post.title, post.member_id, post.snippet, post.post_entry, post.image_url, post.tags, post.status, post.categories],
)
  .catch((error) => {
    console.error({ message: 'Cannot edit post', arguments });
    throw error;
  });

const deletePost = postID => db.query(
  `
    DELETE FROM post
    WHERE id=$1::int
    RETURNING
      *
    `,
  [postID],
)
  .catch((error) => {
    console.error({ message: 'Cannot delete post', arguments });
    throw error;
  });

const searchPosts = (input) => {
  input = `%${input}%`;
  return db.manyOrNone(
    `
    SELECT * FROM post
    JOIN member
    ON member.id = post.member_id
    WHERE UPPER(post.title) like UPPER($1)
    OR UPPER(member.username) like UPPER($1)
    OR UPPER(post.snippet) like UPPER($1)
    OR UPPER(post.post_entry) like UPPER($1)
    OR UPPER(post.tags) like UPPER($1)`,
    [input],
  );
};

const getComments = () => db.any(`
    SELECT * FROM comment
    `, [])
  .catch((error) => {
    console.error({ message: 'Get all comments error', error, arguments });
    throw error;
  });

const getCommentByID = commentID => db.any(`
    SELECT * FROM comment
    WHERE id = $1
    `, [commentID])
  .catch((error) => {
    console.error({ message: 'Get comment by commentID', arguments });
    throw error;
  });

const getCommentsByCategoryID = categoryID => db.any(`
    SELECT * FROM post
    JOIN comment
    ON comment.post_id = post.id
    WHERE post.categories = $1
    `, [categoryID])
  .catch((error) => {
    console.error({ message: 'Get comments by CategoryID', arguments });
    throw error;
  });

const getCommentsByMemberID = memberID => db.any(`
    SELECT * FROM post
    JOIN comment
    ON comment.post_id = post.id
    WHERE post.member_id = $1
    `, [memberID])
  .catch((error) => {
    console.error({ message: 'Get comment by memberID', arguments });
    throw error;
  });


const createComment = (post_id, member_id, description, status) => db.query(
  `
    INSERT INTO
      comment (post_id, member_id, description, status )
    VALUES
      ($1::int, $2::int, $3::text, $4::int )
    RETURNING
      *
    `,
  [post_id, member_id, description, status],
)
  .catch((error) => {
    console.error({ message: 'Cannot create comment', arguments });
    throw error;
  });

const editComment = comment => db.query(
  `
    UPDATE comment
      SET post_id=$2, member_id=$3, description=$4, status=$5
    WHERE id=$1
    RETURNING
      *
    `,
  [comment.id, comment.post_id, comment.member_id, comment.description, comment.status],
)
  .catch((error) => {
    console.error({ message: 'Cannot edit comment', arguments });
    throw error;
  });

const deleteComment = commentID => db.query(
  `
    DELETE FROM comment
    WHERE id=$1::int
    RETURNING
      *
    `,
  [commentID],
)
  .catch((error) => {
    console.error({ message: 'Cannot delete post', arguments });
    throw error;
  });
const getWorkouts = () => db.any(`
    SELECT * FROM workout
    `, [])
  .catch((error) => {
    console.error({ message: 'Get all workouts error', error, arguments });
    throw error;
  });

const getWorkoutByID = workoutID => db.any(`
    SELECT * FROM workout
    WHERE id = $1
    `, [workoutID])
  .catch((error) => {
    console.error({ message: 'Get post by workoutID', arguments });
    throw error;
  });

const getWorkoutsByBodyParts = bodyParts => db.any(`
    SELECT * FROM workout
    WHERE body_parts=$1
    `, [bodyParts])
  .catch((error) => {
    console.error({ message: 'Get post by bodyParts', arguments });
    throw error;
  });

const getWorkoutsByMemberID = MemberID => db.any(`
    SELECT * FROM workout
    JOIN post
    ON post.id = workout.post_id
    JOIN member
    ON member.id = post.member_id
    WHERE member.id = $1
    `, [MemberID])
  .catch((error) => {
    console.error({ message: 'Get workouts by MemberID', arguments });
    throw error;
  });

const createWorkout = (member_id, post_id, description, weight, calories, pushups, squats, pullups_front_wide, pullups_front_close, pullups_reverse_wide, pullups_reverse_close, planks, distance, body_parts, tags, workout_length, workout_image_url) => db.query(
  `
    INSERT INTO
      workout (member_id, post_id, description, weight, calories, pushups, squats, pullups_front_wide, pullups_front_close, pullups_reverse_wide, pullups_reverse_close, planks, distance, body_parts, tags, workout_length, workout_image_url)
    VALUES
      ($1::int, $2::int, $3::text, $4::int, $5::int, $6::int, $7::int, $8::int, $9::int, $10::int, $11::int, $12::int, $13::int, $14::int, $15::text, $16::int, $17::text )
    RETURNING
      *
    `,
  [member_id, post_id, description, weight, calories, pushups, squats, pullups_front_wide, pullups_front_close, pullups_reverse_wide, pullups_reverse_close, planks, distance, body_parts, tags, workout_length, workout_image_url],
)
  .catch((error) => {
    console.error({ message: 'Cannot create workout', arguments });
    throw error;
  });

const editWorkout = (id, workout) => db.query(
  `
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
  [id,
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
    workout.workout_image_url,
  ],
)
  .catch((error) => {
    console.error({ message: 'Cannot edit workout', arguments });
    throw error;
  });

const deleteWorkout = workoutID => db.query(
  `
    DELETE FROM workout
    WHERE id=$1::int
    RETURNING
      *
    `,
  [workoutID],
)
  .catch((error) => {
    console.error({ message: 'Cannot delete post', arguments });
    throw error;
  });

const searchWorkouts = (input) => {
  input = `%${input}%`;
  return db.any(
    `
    SELECT * FROM workout
    JOIN member
    ON member.id = workout.member_id
    WHERE UPPER(workout.description) like UPPER($1)
    OR UPPER(member.username) like UPPER($1)
    OR UPPER(workout.tags) like UPPER($1)
    `,
    [input],
  );
};


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
  searchWorkouts,
};
