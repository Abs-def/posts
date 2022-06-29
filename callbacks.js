const posts = [
    { title: 'post one', body: 'this is post one', createdAt: new Date().getTime()},
    { title: 'post two', body: 'this is post two', createdAt: new Date().getTime()}
];

let intervalId = 0;
function getPosts(){
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        let output = '';
        posts.forEach((post) => {
            output +=  `<li>${post.title} - created ${(new Date().getTime() - post.createdAt)/1000} seconds ago</li>`;
        });
        document.body.innerHTML = output;
        //console.log(intervalId);     //to verify only one interval is running finally
    }, 1000);
}

function createPost(post, callback){
    setTimeout(() => {
       posts.push({...post, createdAt: new Date().getTime()});
        callback();
    }, 2000);
}

function create4thPost(post, callback1){
    setTimeout(() => {
        posts.push({...post, createdAt: new Date().getTime()});
        callback1();
    }, 4000);
}

getPosts();

createPost({ title: 'post three', body: 'this is post three'}, getPosts);

create4thPost({ title: 'post four', body: 'this is fourth post'}, getPosts);