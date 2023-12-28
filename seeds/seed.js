const sequelize = require(`../config/connection`);
const {User, Post, Comment} = require(`../models`);

const userData = [
    {
        username:`test1`,
        password: 'password'
    },
    {
        username:`techGuy2`,
        password: `password`
    }
]

const postData = [{
    title: "Hello Everyone",
    contents: "Welcome to my tech blog!",
    user_id: 1
}]

const commentData = [{
    contents: "What a great post!",
    user_id: 2,
    post_id: 1
}]

const seedMe = async()=>{
    await sequelize.sync({force:true});

    const dbUsers = await User.bulkCreate(userData,{
        individualHooks: true
    });
    console.table(dbUsers.map(user=>user.toJSON()));

    const dbPost = await Post.bulkCreate(postData);
    console.table(dbPost.map(post=>post.toJSON()));

    const dbComment = await Comment.bulkCreate(commentData);
    console.table(dbComment.map(comment=>comment.toJSON()));

    await dbUsers[0].addPost(1);

    await dbUsers[1].addComment(1);

    process.exit(0);
}

seedMe();