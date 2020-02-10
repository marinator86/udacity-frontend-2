# Landing Page Project

Author: Mario Hammer
2020

## Table of Contents

* [Instructions](#instructions)

## Instructions

This landing page project is based on the starter project from udacity, which I used and 
adapted to the project requirements.
To view it, simply visit: https://marinator86.github.io/udacity-frontend-2

The code starts with the DOMContentLoaded event, which triggers navigationBuilder function. When building the navigation is complete, a custom event is thrown which causes
the activeSectionDecorator function to run and register a "scroll" event listener itself, which determines the topmost section and if the topmost section has changed. In case of a change a curried function is returned which handles the class changes.