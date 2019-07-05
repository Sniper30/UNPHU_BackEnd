//My library, i make this function 
//By Kelvin Rafael P.J

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} parent 
 * @returns {OBJ}
 */

function snip(element, parent) {
    element = document.createElement(element);

    function css(style) {
        Object.assign(element.style, style)
        return element
    }
    function attr(atributte) {
        Object.keys(atributte).forEach(at => {
            element.setAttribute(at, atributte[at]);
            element[at] = atributte[at]
        })
        return element
    }

    function content(string){
        element.innerHTML = string;
        return element
    }

    element.css = css
    element.attr = attr
    element.content = content

    if(parent) parent.appendChild(element);

    return element
}

class OBJ extends HTMLElement {
    constructor(){}
    /**
     * 
     * @param {CSSStyleDeclaration} style 
     * @returns {OBJ}
     */
    css(style) { }
    /**
     * 
     * @param {object} atributte
     * @returns {OBJ} 
     */
    attr(atributte) { }
    /**
     * 
     * @param {String} string 
     * @returns {OBJ}
     */
    content(string){}
}


