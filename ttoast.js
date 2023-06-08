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

function checkAndSetPosition(positionString, elementID) {
    position = positionString.split("|")

    var existElement = document.getElementById(elementID)
    check = (existElement.offsetHeight - 30) / 16
    if (check <= 2) {
        multiplier = 1
    } else if (check <= 4) {
        multiplier = 2
    }

    var top = multiplier * (16 * 0.5)
    var bottom = 100 - top
   
    var positionArray = ["top", "middle", "bottom", "left", "center", "right"]
    var positionValue = [top + "%", "50%", bottom + "%", "13%", "50%", "87%"]
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
    checkAndSetPosition(options.position, elementID)

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