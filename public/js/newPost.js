const newPostTitleInput =  document.getElementById("new-post-title");
const newPostContentsInput =  document.getElementById("new-post-contents");

document.getElementById("new-post-form").addEventListener("submit", e => {
    e.preventDefault();

    const newPost = {
        title: newPostTitleInput.value,
        contents: newPostContentsInput.value
    }

    fetch("/api/posts", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newPost)
    }).then(res => {
        res.json()
    }).catch(err => {
        console.error("Error!", err)
    })
})