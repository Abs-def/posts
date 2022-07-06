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

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({...post, createdAt: new Date().getTime()});
            
            let error = false;

            if(!error){
                resolve(posts);
            }else {
                reject();
            }
        }, 0);  
    });

}

function create4thPost(post, callback1){
    setTimeout(() => {
        posts.push({...post, createdAt: new Date().getTime()});
        callback1();
    }, 4000);
}

function deletePost(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            if(posts.length > 0) {
                posts.pop();
                resolve();
            }else {
                reject('array is empty now');
            }

        }, 1000);
    });
}

const user = {
    name: 'yash',
    lastActivityTime: '30 june 2022'
};

function updateLastActivityTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            user.lastActivityTime = new Date().getTime();
            let error = false;

            if(!error){
                resolve(user.lastActivityTime);
            }else {
                reject();
            }      

        },1000);
    });
}

getPosts();

createPost({ title: 'post three', body: 'this is post three'})
.then((fromResolve) => {
    //console.log(fromResolve);
    getPosts();
    // deletePost().then(() => {
    //     getPosts();
    // })
    // .catch(err => console.log(err));

})
.catch(function() {
    console.log('Error: could not create post');
});

//create4thPost({ title: 'post four', body: 'this is fourth post'}, getPosts);

// deletePost().then(getPosts).catch(function(fromReject){
//     console.log(fromReject);
// });



// PROMISE.ALL
// const promise1 = Promise.resolve('hello world');
// const promise2 = 100;
// const promise3 = new Promise((resolve, reject) =>
//  setTimeout(resolve, 2000, 'Goodbye')
// );

// Promise.all([promise1, promise2, promise3])
// .then(values =>
//     console.log(values)
// );

Promise.all([createPost({ title: 'post four', body: 'this is post four'}), updateLastActivityTime()])
.then(([fromCreatePost, fromUpdateLastActivityTime]) => {
    console.log(fromCreatePost, fromUpdateLastActivityTime);
    
    deletePost().then(() => {
        console.log(posts);
    })
})
.catch(err => console.log(err));

//console.log(user.lastActivityTime);
//changes 



