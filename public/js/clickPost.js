document.addEventListener("DOMContentLoaded", function () {
    const postDivs = document.getElementsByClassName("post-card");
    console.log("Number of post cards:", postDivs.length)

    for (let i = 0; i < postDivs.length; i++) {
        postDivs[i].addEventListener('click', e => {
            const postId = e.target.dataset.postId;
            if (postId) {
                window.location.href = `/post/${postId}`;
            }
        })
    }
})

