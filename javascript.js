//check if there's local storage color option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null){
    // console.log('local storage is not empty');
    // console.log(mainColors);
    document.documentElement.style.setProperty('--main-color',mainColors);
    // remove active class from all colors list item
    let lies = document.querySelectorAll(".colors-list li");
    lies.forEach(element => {
        element.classList.remove("active");

    //add active class on element
    if(element.dataset.color === mainColors){
        //add active class[[[[[[[[[[[[[[]
        element.classList.add("active");
    }
    });

}

//toggle spin class on icon
document.querySelector("i").onclick = function(){ // or querySelector(".toggle-setting .fa-gear")
    
this.classList.toggle("fa-spin");
document.querySelector(".settings-box").classList.toggle("open");

}

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
//loop on all list items
colorsLi.forEach(li => {

    //click on every list items
    li.addEventListener("click",(e) => {

    //set color on Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

    //set color on local storage 
        localStorage.setItem("color-option", e.target.dataset.color);
        
        handleActive(e);
    });
});

//random background option
let backgroundOption = false;

//variable to control the background interval
let backgroundInterval;

//check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

//check if random background local storage is not empty
if( backgroundLocalItem !== null ){
    if(backgroundLocalItem === 'true'){
        backgroundLocalItem = true;
    }
    else{
        backgroundLocalItem = false;
    }

    //remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    
    //add active class to yes or no
    if ( backgroundLocalItem === 'true' ){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

//switch backgrounds
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
//loop on all spans
randomBackEl.forEach(span => {

    //click on every span
    span.addEventListener("click",(e) => {
        
    handleActive(e);
    //control set interval function
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem("background-option",true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option",false);
        }
    });
});


// select landing page element 
let landingpage = document.querySelector(".landing-page");

// get array of images
let imgsArray=["girl.jpg","books.jpg","library.jpg","student.jpg","workplace.jpg"];



//function to randomize Images
function randomizeImg(){
    if (backgroundOption == true){

        backgroundInterval = setInterval( () => {
            // get random number
            let randomNumber = Math.floor( Math.random() * imgsArray.length);
        
            // change background image url
            landingpage.style.backgroundImage = 'url("pictures/' + imgsArray[randomNumber] + '")';
        },1000);

    }
}
randomizeImg();



//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
//skills offset top
    let skillsOfsetTop = ourSkills.offsetTop;
//skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
// window height
    let windowHeight = this.innerHeight;
//window scroll top
    let windowScrollTop = this.pageYOffset; //or window.scrollY

    if(windowScrollTop  >= (skillsOfsetTop + skillsOuterHeight - windowHeight))
    {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    
    allSkills.forEach(skill => {

        skill.style.width = skill.dataset.progress;

    });
    }
};

//create popup with the image
let ourGellary = document.querySelectorAll(".gellary img");

ourGellary.forEach(img => {

    img.addEventListener('click',(e) =>{
        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement("div");

        //add class to the popup box
        popupBox.className = 'popup-box';

        if(img.alt !== null){
            // create heading
            let imgHeading = document.createElement("h3");

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            //append the text to the heading
            imgHeading.appendChild(imgText);

            //append the heading to the popupbox
            popupBox.appendChild(imgHeading);
        }

        //create the image 
        let popupImage = document.createElement("img");

        //set image source
        popupImage.src = img.src;

        //add image to the popup box
        popupBox.appendChild(popupImage);

        //append the popup box to the body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement("span");

        //create the close button text
        let closeButtonText = document.createTextNode("X");

        //append text to the close button
        closeButton.appendChild(closeButtonText);

        //add class to the close button
        closeButton.className = "close-button";

        //append close button to the popup box
        popupBox.appendChild(closeButton);

    });

});

//close popup
document.addEventListener('click',function(e){
    if(e.target.className == "close-button"){
        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToAnyWhere(elements){
    elements.forEach(element => {
        element.addEventListener('click' ,(e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            });
        });
    });
}

scrollToAnyWhere(allBullets);
scrollToAnyWhere(allLinks);

//handle active state 
function handleActive(ev){

     //remove active class from all childrens
     ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });    
    //add active class on self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => {

        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        }
        else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});

//reset button
document.querySelector(".reset-options").onclick = function (){
    // localStorage.clear(); //clear all the data in our site
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("color-option");

    // reload window
    window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

    //stop propagation
    e.stopPropagation();

    //toggle class "menu-active" on Button
    this.classList.toggle("menu-active");

    //toggle class "open" on links
    theLinks.classList.toggle("open");
}

//click anywhere outside menu and toggle Button
document.addEventListener('click' , (e) => {

    if(e.target !== toggleBtn && e.target !== theLinks){

    //check if menu is open 
    if(theLinks.classList.contains("open")){
        //toggle class "menu-active" on Button
    toggleBtn.classList.toggle("menu-active");

    //toggle class "open" on links
    theLinks.classList.toggle("open");
    }
    }

});

//stop propagation on menu
theLinks.onclick = function(e){
    e.stopPropagation();
}