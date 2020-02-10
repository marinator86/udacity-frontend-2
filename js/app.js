
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
const NAV_BUILT = "navigationBuilt";

document.addEventListener("DOMContentLoaded", navigationBuilder);
document.addEventListener(NAV_BUILT, onClickScroller);
document.addEventListener(NAV_BUILT, activeSectionDecorator);


/**
 * Builds the navigation by iterating through sections, finding a title for each
 * and adding a list item to the nav bar.
 */
function navigationBuilder() {
    console.log("Building Navigation.")
    const navBar = document.getElementById("navbar__list");
    const sections = document.getElementsByTagName("section");
    const display = navBar.style.display;
    const log = [];
    navBar.style.display = "none";
    for(section of sections){
        const newItemTitle = extractSectionHeader(section.id);
        const newItemId = `${section.id}_navbarItem`;
        const newItem = createMenuItemElement(newItemTitle, newItemId);
        log.push({sectionId: section.id, newItemId: newItemId});
        navBar.appendChild(newItem);
    };
    navBar.style.display = display;
    document.dispatchEvent(createNavBuiltEvent(log));
}

function createNavBuiltEvent(log) {
    const event = new CustomEvent(NAV_BUILT);
    event.log = log;
    console.log(`Dispatching ${NAV_BUILT} event with log: ${JSON.stringify(log)}`);
    return event;
}

/**
 * Creates a menu list item element, specified by the title 
 * @param {String} title 
 */
function createMenuItemElement(title, id) {
    const newItem = document.createElement("li");
    newItem.classList.add("menu__link");
    newItem.id = id;
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
function activeSectionDecorator(event){
    const log = event.log;
    const sections = log.map(i => document.getElementById(i.sectionId));
    let topmost = null;
    window.addEventListener('scroll', function(e) {
        for(section of sections){
            if(topmost == null){
                topmost = section;
                continue;
            }
            const topOfSection = section.getBoundingClientRect().top;
            const currentTopmost = topmost.getBoundingClientRect().top;
            if(Math.abs(topOfSection) < Math.abs(currentTopmost)){
                topmost = section;
                console.log(`Section #${topmost.id} is topmost`);
                // TODO handle styles
                // add class
                // highlight menu item
            }
        }
    });
}

// Scroll to anchor ID using scrollTO event
function onClickScroller(event){
    console.log(event.log);
    // for every menu item id of log create a click 
    // handler that throws scrollTo event
}