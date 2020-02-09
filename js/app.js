/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
document.addEventListener("DOMContentLoaded", buildNavigation);

/**
 * Builds the navigation by iterating through sections, finding a title for each
 * and adding a list item to the nav bar.
 */
function buildNavigation() {
    console.log("Building Navigation.")
    const navBar = document.getElementById("navbar__list");
    const sections = document.getElementsByTagName("section");
    const display = navBar.style.display;
    navBar.style.display = "none";
    for(section of sections){
        const newItemTitle = extractSectionHeader(section.id);
        const newItem = createMenuItemElement(newItemTitle);
        navBar.appendChild(newItem);
    };
    navBar.style.display = display;
}

/**
 * Creates a menu list item element, specified by the title 
 * @param {String} title 
 */
function createMenuItemElement(title) {
    const newItem = document.createElement("li");
    newItem.classList.add("menu__link");
    console.log(`Section ${title} found to add`);
    newItem.textContent = title;
    return newItem;
}

/**
 * Extracts a section's title.
 * The section is specified by its sectionId.
 * Returns the textContent of the first <h2> child tag.
 * @param {String} section 
 */
function extractSectionHeader(sectionId) {
    return document.querySelector(`#${sectionId} h2`).textContent;
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


