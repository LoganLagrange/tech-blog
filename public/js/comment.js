document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-contents');
    currentPost = sessionStorage.getItem("currentPost");

    const fetchComments = function() {
        fetch(`/api/comments/onpost/${currentPost}`)
        .then(res => {
            res.json();
            
        })
    }

    commentForm.addEventListener('submit', e=> {
        e.preventDefault()
        const newComment = {
            contents: commentInput.value,
            postId: sessionStorage.getItem("currentPost")
        }
        fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newComment)
        }).then(res => {
            res.json()
        }).catch(err => {
            console.error("Error!", err)
        })
    })
})