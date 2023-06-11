/*!
* TToast v.1.1
* Released under the MIT License.
* Created by Togihon 
* 31 May 2023
*/

const TIME_ON_SCREEN = 2000
const ATTRIBUTES = ['text', 'position', 'fontsize', 'background', 'color', 'icon']

function createCSSClass(className, style) {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);

    const styleSheet = styleElement.sheet;
    let cssRules = '';

    for (const property in style) {
        const rule = `${property}: ${style[property]};`;
        cssRules += rule;
    }

    const cssText = `.${className} { ${cssRules} }`;
    styleSheet.insertRule(cssText, 0);
}

const ttoastStyle = {
    'display': 'flex',
    'border-radius': '10px',
    'width': '250px',
    'position': 'fixed',
    'padding': '15px 20px',
    'z-index': '9999',
    'background-color': 'rgba(0, 0, 0, 0)',
    'color': 'rgba(0, 0, 0, 0)',
    'text-transform': 'capitalize',
    'font-family': 'Arial',
    'transform': 'translate(-50%, -50%)',
    'transition': '500ms ease-in-out'
}

const ttoastIcon = { 'flex-basis': '12%' }
const ttoastText = { 'flex-basis': '88%' }

createCSSClass('ttoast', ttoastStyle)

function createNewElement(id, className, innerHTML = '') {
    const newElement = document.createElement('div')
    newElement.id = id
    newElement.className = className
    newElement.innerHTML = innerHTML

    return newElement
}

function createTToast(text, icon) {
    const elementID = `ttoast-${new Date().getTime()}`
    const newTToast = createNewElement(elementID, 'ttoast')
    const ttoastText = createNewElement('', 'ttoast-text', text)
    const ttoastIcon = createNewElement('', 'ttoast-icon', '<i class="' + icon + '"></i>')

    icon != "" ? newTToast.appendChild(ttoastIcon) : null
    document.body.appendChild(newTToast)
    newTToast.appendChild(ttoastText)

    return newTToast
}

function checkAttribute(options) {
    let isValid = true

    Object.keys(options).forEach(attribute => {
        if (!ATTRIBUTES.includes(attribute)) {
            console.log("'" + attribute + "' is a wrong attribute. please check carefully.")
            isValid = false
        } else {
            setDefaultValue(options)

            var pattern = /^[a-z]+(\|[a-z]+)$/;
            if (!pattern.test(options.position)) {
                console.log("'position' value format is not valid.");
                isValid = false
            }
        }
    })

    return isValid
}

function setDefaultValue(options) {
    if (!options.hasOwnProperty('text')) {
        options.text = 'Your text here';
    }
    if (!options.hasOwnProperty('position')) {
        options.position = 'bottom|center';
    }
    if (!options.hasOwnProperty('fontsize')) {
        options.fontsize = 'normal';
    }
    if (!options.hasOwnProperty('background')) {
        options.background = 'rgb(39, 39, 37)';
    }
    if (!options.hasOwnProperty('color')) {
        options.color = 'white';
    }
}


function checkAndSetPosition(newTToast, toastPosition) {
    const position = toastPosition.split("|")
    const [top, bottom] = calculateTopBottom(newTToast)
    let falseCountTop = 0
    let falseCountLeft = 0

    const positionArray = ["top", "middle", "bottom", "left", "center", "right"]
    let positionValue = [top + "%", "50%", bottom + "%", "13%", "50%", "87%"]

    for (let index = 0; index < 3; index++) {
        position[0] == positionArray[index]
            ? newTToast.style.top = positionValue[index]
            : falseCountTop += 1

        position[1] == positionArray[index + 3]
            ? newTToast.style.left = positionValue[index + 3]
            : falseCountLeft += 1
    }

    !positionArray.includes(position[0]) || falseCountTop == 3 ? newTToast.style.top = positionValue[2] : null
    !positionArray.includes(position[1]) || falseCountLeft == 3 ? newTToast.style.left = positionValue[4] : null

}

function calculateTopBottom(newTToast) {
    let top, bottom, checkRow, multiplier
    checkRow = (newTToast.offsetHeight - 30) / 16

    if (checkRow <= 2) {
        multiplier = 1
    } else if (checkRow <= 4) {
        multiplier = 1.25
    } else if (checkRow <= 6) {
        multiplier = 1.5
    }

    top = multiplier * (16 * 0.5)
    bottom = 100 - top

    return [top, bottom]

}

function setColor(fontColor, bgColor) {
    const ttoastStyleActive = {
        'background-color': bgColor,
        'color': fontColor
    };
    createCSSClass('active', ttoastStyleActive);
}

function setFontSize(newTToast, fontSize) {
    switch (fontSize) {
        case "small":
            newTToast.style.fontSize = "12px"
            break
        case "large":
            newTToast.style.fontSize = "16px"
            break
        default:
            newTToast.style.fontSize = "14px"
            break
    }
}

function isMobileDevice() {
    return window.matchMedia("(orientation: portrait)").matches || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function TToast(options) {
    checkAttribute(options) ?
        (() => {
            setDefaultValue(options)

            let newTToast
            options.hasOwnProperty('icon')
                ? (() => {
                    createCSSClass('ttoast-text', ttoastText)
                    createCSSClass('ttoast-icon', ttoastIcon)

                    newTToast = createTToast(options.text, options.icon)
                })()
                : newTToast = createTToast(options.text, '')

            setFontSize(newTToast, options.fontsize)
            checkAndSetPosition(newTToast, options.position)
            setColor(options.color, options.background)

            setTimeout(function () { newTToast.className += ' active' }, 0)
            setTimeout(function () { newTToast.className = ' ttoast' }, TIME_ON_SCREEN)
            setTimeout(function () { newTToast.parentNode.removeChild(newTToast) }, TIME_ON_SCREEN + 500)
        })() : (() => { return })()

}
