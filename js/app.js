
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
        const newItem = createMenuItemElement(newItemTitle, section.id);
        log.push({sectionId: section.id, menuItemId: newItem.id});
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
    const link = document.createElement("a");
    link.setAttribute("href", `#${id}`);
    link.textContent = title
    newItem.appendChild(link);
    newItem.classList.add("menu__link");
    newItem.id = `${id}_navbarItem`;
    console.log(`Section ${title} found to add`);
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
        const oldTop = topmost;
        
        for(section of sections){
            if(topmost == null){
                topmost = section;
                continue;
            }
            const currentSectionTop = section.getBoundingClientRect().top;
            const currentTopmost = topmost.getBoundingClientRect().top;
            if(Math.abs(currentSectionTop) < Math.abs(currentTopmost)){
                topmost = section;
                console.log(`Section #${topmost.id} is topmost`);
            }
        }

        const activeSectionChanged = topmost != oldTop;
        if(activeSectionChanged)
            window.setTimeout(getSectionActiveUpdater(oldTop, topmost, log), 0);
    });
}

const getSectionActiveUpdater = function(oldTop, newTop, log){
    return function() {
        if(oldTop)
            oldTop.classList.remove("your-active-class");
        newTop.classList.add("your-active-class");
        
        // iterate over all menu items and set/unset
        for(entry of log){
            const menuItemId = entry.menuItemId;
            const menuItem = document.getElementById(menuItemId);
            if(entry.sectionId == newTop.id)
                menuItem.classList.add("active");
            else
                menuItem.classList.remove("active");
        }
    }
}