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

function TToast(options) {
    var elementID = `TToast-${new Date().getTime()}`
    var newTToast = createNewElement(elementID, 'ttoast')
    var ttoastText = createNewElement('', 'ttoast-text', options.text)

    newTToast.appendChild(ttoastText)
    document.body.appendChild(newTToast)

    var existElement = document.getElementById(elementID)
    check = (existElement.offsetHeight - 30) / 16
    if (check <= 2) {
        multiplier = 1
    } else if (check <= 4) {
        multiplier = 2
    }

    topPosition = multiplier * (16 * 0.5)
    bottomPosition = 100 - topPosition

    position = options.position.split("|")

    var positionArray = ["top", "middle", "bottom", "left", "center", "right"]
    var positionValue = [topPosition + "%", "50%", bottomPosition + "%", "15%", "50%", "85%"]
    for (let index = 0; index < positionArray.length; index++) {
        if (position[0] == positionArray[index]) {
            document.documentElement.style.setProperty('--position-top', positionValue[index])
        }
        if (position[1] == positionArray[index]) {
            document.documentElement.style.setProperty('--position-left', positionValue[index])
        }
    }

    if (options.color != "") {
        document.documentElement.style.setProperty('--font-color', options.color);
    }

    if (options.background != "") {
        document.documentElement.style.setProperty('--background-color-active', options.background);
    }

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

function notify(msg) {
    var exists = document.querySelectorAll('.notify');
    if (exists.length < 1) {
        var uid = `notify-${new Date().getTime()}`;
        var newEl = createElement(uid, 'notify');
        var text = createElement('', 'notify-text', msg);
        newEl.appendChild(text);

        document.body.appendChild(newEl);
        newEl.style.bottom = (10 + 55 * (exists.length)) + 'px';

        setTimeout(function () {
            newEl.className += ' notify-active';
        }, 0);

        setTimeout(function () {
            newEl.className = ' notify';
        }, TIME_ON_SCREEN);

        setTimeout(function () {
            newEl.parentNode.removeChild(newEl);
        }, TIME_ON_SCREEN + 500);
    }

};
