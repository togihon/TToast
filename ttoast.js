//created by Togi Simaremare
//31 May 2023

const TIME_ON_SCREEN = 2000
const ATTRIBUTES = ['text', 'position', 'fontSize', 'background', 'color']

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
    'border-radius': '10px',
    'width': '250px',
    'position': 'fixed',
    'font-size': '14px',
    'padding': '15px 20px',
    'z-index': '9999',
    'background-color': 'rgba(0, 0, 0, 0)',
    'color': 'rgba(0, 0, 0, 0)',
    'text-transform': 'capitalize',
    'font-family': 'Arial',
    'transform': 'translate(-50%, -50%)',
    'transition': '500ms ease-in-out'

};

const ttoastStyleActive = {
    'background': 'rgb(39, 39, 37)',
    'color': 'white'
};

createCSSClass('ttoast', ttoastStyle);
createCSSClass('active', ttoastStyleActive);

function createNewElement(id, className, innerHTML = '') {
    const newElement = document.createElement('div')
    newElement.id = id
    newElement.className = className
    newElement.innerHTML = innerHTML

    return newElement
}

function createTToast(text) {
    const elementID = `ttoast-${new Date().getTime()}`
    const newTToast = createNewElement(elementID, 'ttoast')
    const ttoastText = createNewElement('', 'ttoast-text', text)

    newTToast.appendChild(ttoastText)
    document.body.appendChild(newTToast)

    return newTToast
}

function checkAttribute(options) {
    let isValid = true

    Object.keys(options).forEach(attribute => {
        if (!ATTRIBUTES.includes(attribute)) {
            console.log("`${attribute}` is a wrong attribute. please check carefully.")
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
    if (!options.hasOwnProperty('fontSize')) {
        options.fontSize = 'normal';
    }
}


function checkAndSetPosition(newTToast, toastPosition, fontSize) {
    const position = toastPosition.split("|")
    const [top, bottom] = calculateTopBottom(newTToast, fontSize)
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

function calculateTopBottom(newTToast, fontSize) {
    let top, bottom, checkRow, multiplier

    fontSize = setFontSize(fontSize)
    newTToast.style.fontSize = fontSize
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

function setFontSize(fontSize) {
    switch (fontSize) {
        case "small":
            return "12px"
        case "large":
            return "16px"
        default:
            return "14px"
    }
}

function isMobileDevice() {
    return window.matchMedia("(orientation: portrait)").matches || (navigator.userAgent.indexOf('IEMobile') !== -1);
}


function TToast(options) {
    checkAttribute(options) ?
        (() => {
            setDefaultValue(options)

            const newTToast = createTToast(options.text)
            checkAndSetPosition(newTToast, options.position, options.fontSize)

            setTimeout(function () { newTToast.className += ' active' }, 0)
            setTimeout(function () { newTToast.className = ' ttoast' }, TIME_ON_SCREEN)
            setTimeout(function () { newTToast.parentNode.removeChild(newTToast) }, TIME_ON_SCREEN + 500)
        })() : (() => { return })()

}