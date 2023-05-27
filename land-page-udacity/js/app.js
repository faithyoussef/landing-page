
// Start Global Variables
const navBar = document.querySelector('.navbar__menu')
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');
const header = document.querySelector('.page__header');
// End Global Variables
const globalRandomStrings = [
    //First String
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru',
    //Second String
    'Mermaid ipsum dolor sit amet. Sea turtle sea turtle sea turtle sea turt le s',
    'ea turtle sea tur',


    //Third String
 'cupcakes are delicious',
    'cupcakes are sweet',
    'cupcakes are yummy',
    //Fourth String
 '       mermaids are lovely ',
 '       mermaids are cute',
 '       mermaids are unique',

];
document.addEventListener('DomContentLoaded', navBar());
document.addEventListener('DOMContentLoaded', navBarStyle());

// Create the Navigation Menu on Top and activate current clicked item
function navBar() {
    const section = document.getElementsByTagName('section');

    for (let i = 0; i < section.length; i++) {
        let list = document.createElement('li');
        let anchor = document.createElement('a');
        let sectionName = section[i].getAttribute('data-nav');
        let sectionNameAttribute = sectionName.replace(/\s/g, '').toLowerCase();

        anchor.innerText = sectionName;
        anchor.setAttribute('href', `#${sectionNameAttribute}`);
        anchor.setAttribute('id', 'link_no' + (i + 1))
        list.appendChild(anchor);
        document.getElementById('navbar__list').appendChild(list);
        document.getElementById('link_no' + (i + 1)).addEventListener('click', function() {
            scrollEvent(i + 1);
            sectionActivate(i + 1);
            navActivate(i + 1);
        }) 
    }
}

// Scroll Event on Click
function scrollEvent(no) {
    let section = document.getElementById('section' + no);
    let position = section.offsetTop;
    event.preventDefault();
    window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth'
    })
}

//Dynamic Style for Navigation Menu
function navBarStyle () {
    let anchor = document.getElementsByTagName('a');
    let styles = `
        display: flex;
        flex-direction: row;
        align-items: stretch;
        color: #000;
        text-decoration: none;
        margin: 0 0.5em 0 0.5em;
        padding: 0.5em;
        background-color: rgb(220, 220, 220);
        font-size: large;
        transform:translateX(-0.5em);
    `;

    for (i = 0; i < anchor.length; i++) {
        anchor[i].setAttribute('style', styles);
    }

    mouseOver();
}

//Dynamic Style on hover
function mouseOver () {
    let anchor = document.getElementsByTagName('a');

    for (i = 0; i < anchor.length; i++) {
        anchor[i].addEventListener('mouseenter', function (event) {
            event.target.style.backgroundColor = "rgb(100, 0, 255)";
            event.target.style.color = "#fff";
        })
        //Blue color stays in case of activation
        if (anchor[i].style.backgroundColor == "rgb(47, 0, 255)") {
            anchor[i].addEventListener('mouseout', function (event) {
                event.target.style.backgroundColor = "rgb(220, 220, 220)";
                event.target.style.color = "#000";
            })
        }
    }
}

// Activate section on click and deactivate previous one
function sectionActivate(no) {
    let activeClass = 'your-active-class';
    let activeSection = document.getElementsByClassName(activeClass)[0];
    let newActiveSection = document.getElementById('section' + no);

    activeSection.removeAttribute('class');
    newActiveSection.setAttribute('class', activeClass);
}

// Activate clicked navigation menu element
function navActivate(no) {
    let activeNav = document.getElementById('link_no' + no);
    let otherNavs = document.getElementsByTagName('a');

    for (i = 0; i <otherNavs.length; i++) {
        if (otherNavs[i].style.backgroundColor == "rgb(47, 0, 255)") {
            oldNav = otherNavs[i];
            oldNav.style.backgroundColor = "rgb(220, 220, 220)";
            oldNav.style.color = "#000";          
        }
    }

    activeNav.style.backgroundColor = "rgb(47, 0, 255)";
    activeNav.style.color = "#fff";
}