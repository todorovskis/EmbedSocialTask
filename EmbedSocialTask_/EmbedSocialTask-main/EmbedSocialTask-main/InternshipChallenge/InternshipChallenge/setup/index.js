let posts;

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        posts = data
        loadInitialPosts()
    });

let output_container = document.querySelector("#data-output")
let load_more_button = document.querySelector("#load-more-btn")
let starting_posts_count = 4
let posts_to_load_count = 4

function loadInitialPosts() {
    let out = ""
    let counter = 0
    for (let post of posts) {
        if (counter < starting_posts_count) {
            out += `
             <div class="post">
                      <div class="post-header">
                        <img class="profile-picture" src='${post.profile_image}'>
                        <div class="post-info">
                          <h2 class="name">${post.name}</h2>
                          <p class="date">${post.date}</p>
                        </div>
                      </div>
                      <div class="post-content">
                        <p class="caption">${post.caption}</p>
                        <img onclick="lightboxevent(this)" class="post-image" src="${post.image}" alt="Post Image">
                      </div>
                      <div class="post-footer">
                        <button class="post-button">Like</button>
                        <button class="post-button">Comment</button>
                        <button class="post-button">Share</button>
                      </div>
                </div>
         `;
        }
        counter++;
    }

    let div = document.createElement("div");
    output_container.insertBefore(div, load_more_button);
    div.innerHTML = out;
}

function loadData() {
    let current_displayed_posts = document.querySelectorAll(".post").length;
    let out = "";
    let counter = 0;
    for (let post of posts) {
        if (counter >= current_displayed_posts && counter < posts_to_load_count + current_displayed_posts) {
            if(toggle){
                out += `
           <div class="post-dark">
                      <div class="post-header">
                        <img class="profile-picture" src='${post.profile_image}'>
                        <div class="post-info">
                          <h2 class="name">${post.name}</h2>
                          <p class="date">${post.date}</p>
                        </div>
                      </div>
                      <div class="post-content">
                        <p class="caption-dark">${post.caption}</p>
                        <img onclick="lightboxevent(this)" class="post-image" src="${post.image}" alt="Post Image">
                      </div>
                      <div class="post-footer">
                        <button class="post-button">Like</button>
                        <button class="post-button">Comment</button>
                        <button class="post-button">Share</button>
                      </div>
                </div>
         `;
            } else {
                out += `
           <div class="post">
                      <div class="post-header">
                        <img class="profile-picture" src='${post.profile_image}'>
                        <div class="post-info">
                          <h2 class="name">${post.name}</h2>
                          <p class="date">${post.date}</p>
                        </div>
                      </div>
                      <div class="post-content">
                        <p class="caption">${post.caption}</p>
                        <img onclick="lightboxevent(this)" class="post-image" src="${post.image}" alt="Post Image">
                      </div>
                      <div class="post-footer">
                        <button class="post-button">Like</button>
                        <button class="post-button">Comment</button>
                        <button class="post-button">Share</button>
                      </div>
                </div>
         `;
            }
        }
        counter++;
    }

    let div = document.createElement("div");
    output_container.insertBefore(div, load_more_button);
    div.innerHTML = out;

    if (document.querySelectorAll(".post").length === posts.length) {
        load_more_button.style.visibility = "hidden";
    }

}

const dark_mode_toggle = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");
const profile = document.querySelector('.profile-element');
const all_posts = document.getElementsByClassName('post');
const captions = document.getElementsByClassName("caption");

let toggle = false

dark_mode_toggle.addEventListener("click", function () {
    toggle = !toggle

    if(toggle){
        body.classList.toggle("dark-mode");
        profile.classList.toggle("profile-element-dark");
        for (let post of document.getElementsByClassName('post-dark')) {
            post.classList.remove("post");
            post.classList.add("post-dark");
        }
        for (let caption of captions) {
            caption.classList.toggle("caption-dark");
        }
        load_more_button.classList.toggle("load-more-btn-dark")
    } else{
        body.classList.remove("dark-mode");
        profile.classList.remove("profile-element-dark");
        for (let post of document.getElementsByClassName('post-dark')) {
            post.classList.remove("post-dark");
            post.classList.add("post");
        }
        for (let caption of captions) {
            caption.classList.remove("caption-dark");
        }
        load_more_button.classList.remove("load-more-btn-dark")
    }

});



// This line selects only html image of user, not images for posts.
// Lightbox functionality works only for profile picture of user Stefan Todorovski.
const images = document.querySelectorAll('img');

function lightboxevent(image){
    const lightbox = document.createElement('div')
    lightbox.id = 'lightbox'
    document.body.appendChild(lightbox)

    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    })
}

