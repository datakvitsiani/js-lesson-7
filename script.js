'use strict';

const mainWraper = document.getElementById("post-block");
const overlay = document.getElementById("overlay");
const close = document.getElementById("close");
const contentOverlay = document.getElementById("content");
const addButton = document.getElementById("add");
const postOvelayAdd = document.getElementById("postoverlayadd");
const form = document.getElementById("form");

function ajax(url, callback) {
    let requist = new XMLHttpRequest();
    requist.open("GET", url);
    requist.addEventListener("load", function () {
      
      let dataJs = JSON.parse(requist.responseText);
      callback(dataJs);
    });
    requist.send();
  }
  
  ajax("https://jsonplaceholder.typicode.com/posts", function (dataJs) {
    dataJs.forEach((item) => {
      createPost(item);
    });
  });
  
  
  function createPost(item) {
    const divWraper = document.createElement("div");
    divWraper.classList.add("posts");
    divWraper.setAttribute("data-id", item.id);
  
    const h3Post = document.createElement("h3");
    h3Post.textContent = item.id;
  
    const h2Post = document.createElement("h2");
    h2Post.textContent = item.title;
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete This Post";
    deleteButton.setAttribute("data-id", item.id);
    deleteButton.style.background = 'black'
    deleteButton.style.color = 'darkslategray'
    divWraper.appendChild(h3Post);
    divWraper.appendChild(h2Post);
    divWraper.appendChild(deleteButton);
  

    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      let id = event.target.getAttribute("data-id");
      let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      fetch(url, {
        method: "DELETE",
      }).then(() => divWraper.remove());
    });
  
  
    divWraper.addEventListener("click", function (event) {
    
      let id = event.target.getAttribute("data-id");
      
      overlay.classList.add("activeOverlay");
      let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      ajax(url, function (dataJs) {
        overlayFunction(dataJs);
      });
    });
  
    mainWraper.appendChild(divWraper);
    
  }
  
  function overlayFunction(item) {
    const description = document.createElement("p");
    description.textContent = item.body;
  
    contentOverlay.appendChild(description);
  }
  
 
  close.addEventListener("click", function () {
    overlay.classList.remove("activeOverlay");
    contentOverlay.innerHTML = " ";
  });
  
 
  addButton.addEventListener("click", function () {
    postOvelayAdd.classList.add("addPost");
  });
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
   
    let formInfo = {
      title: event.target[0].value,
    };
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  });