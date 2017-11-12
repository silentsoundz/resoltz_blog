const db = require( './connection' )

const createUser = function( fname, lname, username, email, password ){
  return db.query(`
    INSERT INTO
      member ( fname, lname, username, email, password )
    VALUES
      ( $1::text, $2::text, $3::text, $4::text, $5::text )
    RETURNING
      *
    `,
    [ fname, lname, username, email, password ] )
    .catch(error => { console.log( error.message );
    });
};

const editUser = function( member ){
  return db.oneOrNone(`
    UPDATE member
      SET fname=$2 , lname=$3, username=$4, email=$5, password=$6
    WHERE id=$1
    `,
    [member.id, member.fname, member.lname, member.username, member.email, member.password ] )
    .catch(error => { console.log( error.message );
    });
};

const removeUser = function( id ) {
  return db.none(`DELETE FROM member WHERE id=$1
    RETURNING *`,[ id ] )
}

const findUser = function( username ){
  return db.oneOrNone(`
    SELECT * FROM member
    WHERE username = $1
    `,
  [ username ] )
  .catch( error => { console.log( error.message );
  });
};

module.exports = {
  createUser,
  editUser,
  removeUser,
  findUser
};
