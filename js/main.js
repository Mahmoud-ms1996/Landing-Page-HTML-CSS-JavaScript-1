// Toggle Spin Class On Icon
// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {

  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty('--main-color', mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {

      // Add Active Class
      element.classList.add("active");

    }

  });

}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {

    element.classList.remove("active");

  });

  if (backgroundLocalItem === 'true') {

    backgroundOption = true;

    document.querySelector(".random-backgrounds .yes").classList.add("active");

  } else {

    backgroundOption = false;

    document.querySelector(".random-backgrounds .no").classList.add("active");

  }

}
//-----------------------------------------
// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
  
};
//-----------------------------
// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

  // Click On Every List Items
  li.addEventListener("click", (e) => {

    // Set Color On Root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);

  });

});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {

  // Click On Every Span
  span.addEventListener("click", (e) => {

    handleActive(e);

    if (e.target.dataset.background === 'yes') {

      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);

    } else {

      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);

    }

  });

});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["landing-bg-1.jpg", "landing-bg-2.jpg", "landing-bg-4.jpg", "landing-bg-5.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {

  if (backgroundOption === true) {

    backgroundInterval = setInterval(() => {

      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
    
      // Change Background Image Url 
      landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
    
    }, 9000);

  }

}

randomizeImgs();

// Select Skills Selecter
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup for Project
let ourProject = document.querySelectorAll(".gallery img");

ourProject.forEach(img => {

  img.addEventListener('click', (e) => {

    // Create Overlay Element
    let Overlay = document.createElement("div");

    // Add Class To Overlay
    Overlay.className = 'popup-overlay';

    // Append Overlay To The Body
    document.body.appendChild(Overlay);

    // Creat The  Popup Box
    let PopupBox = document.createElement("div");

    // Add Class To The Popup box
    PopupBox.className = 'popup-box';

    if (img.alt !== null){

      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text for Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To THe Popup Box
      PopupBox.appendChild(imgHeading);
    
    }

    // Create The Image
    let PopupImage = document.createElement("img");

    // Set Image Source
    PopupImage.src =img.src;

    // Add Image To Popup Box
    PopupBox.appendChild(PopupImage);

    // Append The Popup Box To Body
    document.body.appendChild(PopupBox);

    // Create The Close Span
    let CloseButton = document.createElement("span");

    // Create The Close Button Text
    let CloseButtonText = document.createTextNode("X");

    // Append Text To Close Button
    CloseButton.appendChild(CloseButtonText);

    // Add Class To Close  Button
    CloseButton.className = 'close-button';

    // Add Close Button To The Popup Box
    PopupBox.appendChild(CloseButton);

  });
});

// Close PopUp
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    // Remove The Current Popup
    e.target.parentNode.remove();
  
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  
  }

});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");


function scrollToLinks(elements){

  elements.forEach(element => {

    element.addEventListener("click", (e) => {

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      });
    });
  });
}

scrollToLinks(allBullets);
scrollToLinks(allLinks);

// Handle Active Classes links
function handleActive(event) {

  // Remove Classs Active From All Childrens
  event.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active");
  
  });
  
  // Add Active Class On Self
  event.target.classList.add("active");
  
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bullentsContainer = document.querySelector(".nav-bullets");

let bulletLocalStorage = localStorage.getItem("bullets_option");

if (bulletLocalStorage !== null){

  bulletsSpan.forEach(span => {

    span.classList.remove("active");

  });

  if (bulletLocalStorage === 'block'){

    bullentsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active");

  } else {

    bullentsContainer.style.display = 'none';

    document.querySelector(".bullets-option .no").classList.add("active");

  }

}

bulletsSpan.forEach(span => {

  span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show'){

      bullentsContainer.style.display = 'block';

      localStorage.setItem("bullets_option", 'block');

    } else {

      bullentsContainer.style.display = 'none';

      localStorage.setItem("bullets_option", 'none');

    }

    handleActive(e);

  });

});

// Reset Button
document.querySelector(".reset-options").onclick = function() {

  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload Window
  window.location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let Links = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  Links.classList.toggle("open");

}

// Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== Links){

    // Check If Menu Is Open
    if(Links.classList.contains("open")){

      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      Links.classList.toggle("open");
    }

  }

});

// Stop Propagation On Menu
Links.onclick = function (e) {
  e.stopPropagation();
}