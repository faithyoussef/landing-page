
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
let totalSections = 0;

//Custom nav timer

let customNavTimeout;

/* Helping Functions */
//Result: It worked!
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

//Return a random string
const returnRandomString = (numberOfTimes) => {
    let mainString = '';
    for (let i = 0; i < numberOfTimes; i++) { //Generate as many strings as required
        const string = getRandomArbitrary(0, globalRandomStrings.length - 1).toFixed(); //Return a random rounded value in the index of our global strings
        mainString += ` ${globalRandomStrings[string]} `; //Append the random string that was chosen automatically to the main string that will be returned by the function
    }
    return mainString;
};

//Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
//Create an observer for elements
//Note: I converted this function into an arrow function as requested by the Udacity reviewer
const createObserver = (elementToObserve) => {
    let options = {
        root: null,
        threshold: 0.4
    }
    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(elementToObserve);
};

//My own implementation of the handleIntersect function
//Thanks to the MDN for the rich resources

let lastActiveSection = null; //Identify the last active section

//Handle observer intersection calls
const handleIntersect = (entries, observer) => {
    for (const entry of entries) {
        if (entry.target.classList.contains('section')) {
            const getNavElement = document.querySelector(`#${entry.target.id}-nav.nav-li`); //Get the nav list item that matches the section

            //Now check if it's visible
            if (entry.isIntersecting === true) {
                if (lastActiveSection !== null && lastActiveSection != entry.target) { //Disable previous active section if exists
                    const getLastActiveNavElement = document.querySelector(`#${lastActiveSection.id}-nav.nav-li`);
                    lastActiveSection.classList.remove('section-active');
                    getLastActiveNavElement.classList.remove('li-active');
                }
                //Activate new section
                entry.target.classList.add('section-active');
                getNavElement.classList.add('li-active');
                entry.target.style.background = `rgba(237, 235, 235, ${entry.intersectionRatio})`;
                lastActiveSection = entry.target;
            } else {
                //If it's not intersecting, and isn't in the threshold (at least 40% visible), hide the section (or make sure it is)
                entry.target.classList.remove('section-active');
                getNavElement.classList.remove('li-active');
                entry.target.style.background = `rgba(237, 235, 235, ${entry.intersectionRatio})`;
            }
        }    
    }
};

/* Core Functions (and objects ;)) */

const customNav = { //An object for handling custom navigation (dynamic, you say)
    navParentElement: document.querySelector('.nav'),
    navElement: document.querySelector('.nav-ul'),
    createDynamicNavSections: function() {
        const sectionsNodeList = document.querySelectorAll('.section');
        if (sectionsNodeList.length === 0) { //If there is nothing, don't continue with the rest of the functionality
            return false;
        }
        const docFrag = document.createDocumentFragment();
        for (let section of sectionsNodeList) { //Loop through the NodeList
            const sectionName = section.id.split('-').join(' ').toUpperCase(); //Change section-1 to SECTION 1
            const sectionNavElementList = document.createElement('li'); //Create a new nav list element
     
            sectionNavElementList.className = 'nav-li'; //Use proper layout for nav list 
            sectionNavElementList.id = `${section.id}-nav`;
    
            sectionNavElementList.textContent = sectionName; //Use the modified section name for the list text

            docFrag.appendChild(sectionNavElementList); //Append the nav list element to the virtual DOM
        }
        customNav.navElement.appendChild(docFrag); //Append the nav list element to the nav unordered list element (parent)

        //An event listener for handling navigation clicks
        customNav.navElement.addEventListener('click', (e) => {
            if ((e.target.nodeName === 'LI') && e.target.id !== 'logo.li' && e.target.id !== 'hamburger.li') { //If user clicked the list item from nav menu
                let targetId = e.target.id;
                targetId = targetId.split('-nav'); //Remove the -nav from the ID to return section-1 instead of section-1-nav
                targetId.pop(); //Remove the -nav index from the array
                const sectionElement = document.querySelector(`#${targetId}`); //Find the section
                window.scrollTo(0, sectionElement.offsetTop - 100); //Go to section
            } else if (e.target.id === 'hamburger.li' || e.target.parentElement.id === 'hamburger.li') {
                const navItems = document.querySelectorAll('.nav-li');
                for (const navItem of navItems) {
                    if (navItem.id !== 'logo.li' && navItem.id !== 'hamburger.li') {
                        if (navItem.style.display === 'none') {
                            navItem.style.display = 'block';
                        } else {
                            navItem.style.display = 'none';
                        }
                    }
                }
            }
            clearTimeout(customNavTimeout);
        }); //Handle clicks to navigation unordered list
        return sectionsNodeList.length;
    },
    createNavLogo: function(iconURL, logoName) { //Create the logo using the icon url and logo name supplied to it
        const logoList = document.createElement('li'); //Create a list item
        const logoIcon = document.createElement('img'); //Create the image tag
        const logoLink = document.createElement('a'); //Create the link tag
        logoList.className = 'nav-li nav-logo li-active'; //Add appropriate styling to nav logo
        logoLink.className = 'nav-link'; //Add appropriate styling to nav link
        logoLink.textContent = logoName; //Use the argument (or parameter in this context) to set logo name
        logoIcon.setAttribute('src', iconURL); //Add Logo source image to the image tag
        logoIcon.setAttribute('alt', logoName); //Add alt text to the Logo source image
        logoLink.setAttribute('href', '#'); //Links to nothing, still a link? I could probably use index.html so that it refreshes on click
        logoList.setAttribute('id', 'logo.li'); //Let's make it easier to identify our logo list item
        logoList.appendChild(logoIcon); //Finally add the image tag to the list
        logoList.appendChild(logoLink); //And add the link tag to the list
        customNav.navElement.appendChild(logoList); //Append all the stuff above into the custom nav (our navigation element), retrieved from the customNav object
        return logoList;
    },
    //This function creates the navigation hamburger list dynamically
    createNavHamburger: function() {
        const hamburgerElement = document.createElement('li'); //Create the list tag
        const hamburgerIcon = document.createElement('i'); //Create the i tag
        hamburgerElement.id = 'hamburger.li'; //Add a unique identifier to be looked up easily
        hamburgerElement.classList.add('nav-li'); //Follow the same inline style as the siblings
        hamburgerElement.classList.add('hamburger-li'); //Follow the same inline style as the siblings
        hamburgerElement.style.float = 'right'; //Make it appear in the right not too close to the logo
        hamburgerIcon.className = 'fas fa-hamburger'; //Use the fontawesome hamburger instead of bars
        hamburgerElement.appendChild(hamburgerIcon); //Add the icon to the list
        customNav.navElement.appendChild(hamburgerElement); //Add the list to the unordered list
        return hamburgerElement;
    }
};

const createSections = (sections) => { //Create as many sections as you can get to need... Why'd you need a random section, though?
    const textContainer = document.querySelector('.container');
    const docFrag = document.createDocumentFragment();
    for (let i = 0; i < sections; i++) { //For as many sections, repeat the code
        //Create necessary elements
        sectionElement = document.createElement('section');
        sectionHeader = document.createElement('h2');
        sectionParagraph = document.createElement('p');

        //Add the 'section' class to our section element
        sectionElement.classList.add('section');

        //Set the ID of our section element to section-x where x is the index of the total sections variable plus one (it starts from one until forever)
        sectionElement.setAttribute('id', `section-${totalSections + 1}`);

        //Tell the script to dynamically add the section no. to the heading in form of SECTION x: Section title that is 25 chars ...
        sectionHeader.textContent = `SECTION ${totalSections + 1}: ${returnRandomString(1).substring(0, 25).toUpperCase()} ...`;

        //Populate our section paragraph with random text
        sectionParagraph.textContent = returnRandomString(5);

        //Finally append the children
        sectionElement.appendChild(sectionHeader);
        sectionElement.appendChild(sectionParagraph);

        //Observe the section
        createObserver(sectionElement);

        //Append & Process... We use virtual DOM to save resources
        docFrag.appendChild(sectionElement);
        if (totalSections === 0) {
            sectionElement.classList.add('section-active');
        }
        totalSections ++;
    }
    //One reflow and one repaint. That's a win for performance.
    textContainer.appendChild(docFrag);

    //Accept events (listen) on double click to the textContainer element... Actually that's also to save resources
    //Instead of per-section event, we use one event on the parent, and take advantage of the ability to identify the actual selected element
    //By using event.target as I did in the arrow function
    textContainer.addEventListener('dblclick', (e) => {
        if (e.target.nodeName === 'SECTION') { //If the user selected a section, not the entire container (appending listener to entine container was done for performance
            const sectionParagraph = e.target.lastElementChild; //Paragraph is supposed to be the last element of the section
            sectionParagraph.classList.toggle('hide-element'); //Toggle the element on double key press
    
            //The following code was created for the purpose of going to the next section in case there is
            //This only applies if the user closed the previous section not opening it
            const nextSection = e.target.nextElementSibling;
            if (nextSection !== null && sectionParagraph.className === 'hide-element') {
                window.scrollTo(0, nextSection.offsetTop);
            }
        }
    });
    return totalSections;
};

/* Main Function */

const main = () => {
    //This function is the thing that processes all the code we created, to actually make use of it.

    //Create the logo, use our emerald image and my... well.. name :)
    customNav.createNavLogo('img/emerald-icon.png', 'Abdelhady\'s');

    //Add our hamburger list at the beginning
    customNav.createNavHamburger();

    //You can create a billion (wouldn't be out of bounds? idk)
    createSections(11);

    //Create navigation list based on how many sections you created!
    customNav.createDynamicNavSections();

    /* Scroll top functionality */
    const scrollTopElement = document.querySelector('.scroll-top');
    scrollTopElement.addEventListener('click', function() { //If you click it, you go up
        window.scrollTo(0, 0);
    });
};

window.onload = main();

/* Browser Events */

window.onscroll = (e) => { //Respond to scroll
    //Navigation Work
    const container = document.querySelector('#content');
    const containerOffset = container.offsetTop;
    //If the current vertical offset exceeded the container offset (where our content reside at)
    //We begin to show the sticky navigation and adjust margins as needed, if not, show nav where it normally would be
    if (window.pageYOffset >= containerOffset) {
        customNav.navParentElement.classList.add('nav-sticky');
        container.style.margin = '25px 50px 0';
    } else {
        customNav.navParentElement.classList.remove('nav-sticky');
        container.style.margin = '0 50px';
    }

    //We normally wouldn't hide navigation if the user is scrolling, also, we would kill the timer if it's running due to
    //the user being idle beforehand, to avoid visual errors and inconvenience
    customNav.navParentElement.classList.remove('hide-element');
    clearTimeout(customNavTimeout);

    //After 5 seconds, if the user is in the middle of nowhere, hide navigation
    //If the user isn't 100 pixels below default, then they're at top, we'd still show navigation
    //Only hide navigation if user is deep below, and didn't scroll for some time (5 seconds, again)
    customNavTimeout = setTimeout(function() {
        if (window.pageYOffset > 100) {
            customNav.navParentElement.classList.add('hide-element');
        }    
    }, 15000);

    //Scroll to Top
    const scrollTopElement = document.querySelector('.scroll-top');
    if (window.pageYOffset > 100) { //If the user scrolled down 100 pixels
        scrollTopElement.style.display = 'block'; //Show the scorll to top magic icon
    } else {
        scrollTopElement.style.display = 'none'; //Otherwise, hide it (it's not needed)
        
    }
};