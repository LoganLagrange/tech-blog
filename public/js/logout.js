document.getElementById("logout-btn").addEventListener("click", e => {
    e.preventDefault();
    fetch("/api/users/logout", {
        method:"DELETE"
    }).then(res => {
        location.href = "/"
    }).catch(err => {
        console.error("Server error!", err);
    })
})