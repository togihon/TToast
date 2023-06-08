//created by Togi Simaremare
//31 May 2023

var TIME_ON_SCREEN = 2000

function createNewElement(id, className, innerHTML = '') {
    var newElement = document.createElement('div')
    newElement.id = id
    newElement.className = className
    newElement.innerHTML = innerHTML

    return newElement
}

function createTToast(text) {
    var elementID = `TToast-${new Date().getTime()}`
    var newTToast = createNewElement(elementID, 'ttoast')
    var ttoastText = createNewElement('', 'ttoast-text', text)

    newTToast.appendChild(ttoastText)
    document.body.appendChild(newTToast)

    return [elementID, newTToast]
}

function checkPosition(positionString, top, bottom) {
    position = positionString.split("|")

    var positionArray = ["top", "middle", "bottom", "left", "center", "right"]
    var positionValue = [top + "%", "50%", bottom + "%", "15%", "50%", "85%"]
    for (let index = 0; index < positionArray.length; index++) {
        if (position[0] == positionArray[index]) {
            document.documentElement.style.setProperty('--position-top', positionValue[index])
        }
        if (position[1] == positionArray[index]) {
            document.documentElement.style.setProperty('--position-left', positionValue[index])
        }
    }
}

function fontSize() {

}

function multiplierMargin() {

}

function TToast(options) {
    const [elementID, newTToast] = createTToast(options.text)
    var existElement = document.getElementById(elementID)
    check = (existElement.offsetHeight - 30) / 16
    if (check <= 2) {
        multiplier = 1
    } else if (check <= 4) {
        multiplier = 2
    }

    topPosition = multiplier * (16 * 0.5)
    bottomPosition = 100 - topPosition

    checkPosition(options.position, topPosition, bottomPosition)

    // if (options.color != "") {
    //     document.documentElement.style.setProperty('--font-color', options.color);
    // }

    // if (options.background != "") {
    //     document.documentElement.style.setProperty('--background-color-active', options.background);
    // }

    setTimeout(function () {
        newTToast.className += ' active';
    }, 0);

    setTimeout(function () {
        newTToast.className = ' ttoast';
    }, TIME_ON_SCREEN);

    setTimeout(function () {
        newTToast.parentNode.removeChild(newTToast);
    }, TIME_ON_SCREEN + 500);
}