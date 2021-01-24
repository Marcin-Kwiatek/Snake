let newDirection = "down"
let currentDirection = "down" 
let snakeGoInterval 

function getElementPositionById(id) {
    let element = document.getElementById(id)
    let elementStyle = getComputedStyle(element)
    let elementTop = parseInt(elementStyle.top)
    let elementLeft = parseInt(elementStyle.left)
    return {
        top: elementTop,
        left: elementLeft
    }
}

function getArrNumberSnakeTile() {
    let resultNumberValues = []
    let elements = document.getElementsByClassName("snakeTile")
    for (i = 0; i < elements.length; i++) {
        let valueSnakeTile = elements[i].id.replace('snakeTile', '')
        let numberValueSnakeTile = parseInt(valueSnakeTile)
        resultNumberValues.push(numberValueSnakeTile)
    }
    return resultNumberValues
}

function removeFirstTile() {
    let resultNumberValues = getArrNumberSnakeTile()
    let minValue = Math.min(...resultNumberValues)
    let firstElementId = 'snakeTile' + minValue
    document.getElementById(firstElementId).remove()

}

function addLastTile() {
    let resultNumberValues = getArrNumberSnakeTile()
    let maxValue = Math.max(...resultNumberValues)
    let lastElementId = 'snakeTile' + maxValue
    let newTile = document.createElement("div")
    newTile.classList.add("snakeTile")
    let newTileId = 'snakeTile' + (maxValue + 1)
    newTile.id = newTileId
    let { top: lastElementTop, left: lastElementLeft } = getElementPositionById(lastElementId)
    if (newDirection === "down") {
        if (30 + lastElementTop < 300) {
            newTile.style.top = (30 + lastElementTop).toString() + "px"
            newTile.style.left = lastElementLeft + "px"
        }
        else {
            newTile.style.top = "0px"
            newTile.style.left = lastElementLeft + "px"
        }
    }
    if (newDirection === "right") {
        if (30 + lastElementLeft < 300) {
            newTile.style.left = (30 + lastElementLeft).toString() + "px"
            newTile.style.top = lastElementTop + "px"
        }
        else {
            newTile.style.left = "0px"
            newTile.style.top = lastElementTop + "px"
        }
    }
    if (newDirection === "up") {
        if (lastElementTop - 30 >= 0) {
            newTile.style.top = (lastElementTop - 30).toString() + "px"
            newTile.style.left = lastElementLeft + "px"
        }
        else {
            newTile.style.top = "270px"
            newTile.style.left = lastElementLeft + "px"
        }
    }
    if (newDirection === "left") {
        if (lastElementLeft - 30 >= 0) {
            newTile.style.left = (lastElementLeft - 30).toString() + "px"
            newTile.style.top = lastElementTop + "px"
        }
        else {
            newTile.style.left = "270px"
            newTile.style.top = lastElementTop + "px"
        }
    }
    if(isPositionValid(newTile.style.top, newTile.style.left) === false){
        alert("Game over!!!")
        window.clearInterval(snakeGoInterval)
         

    }
    let canvasElement = document.getElementById("canvas")
    canvasElement.appendChild(newTile)
    return newTile
}

function onKeyDown(event) {
    if (event.keyCode === 40 && currentDirection !== "up") {
        newDirection = "down"
    }
    if (event.keyCode === 39 && currentDirection !== "left") {
        newDirection = "right"
    }
    if (event.keyCode === 38 && currentDirection !== "down") {
        newDirection = "up"
    }
    if (event.keyCode === 37 && currentDirection !== "right") {
        newDirection = "left"
    }

}

function snakeGo() {
    currentDirection = newDirection
    let newTile = addLastTile()
    let { top: appleTop, left: appleLeft } = getElementPositionById("apple")
    if (newTile.style.top === (appleTop + "px") && newTile.style.left === (appleLeft + "px")) {
        randomPlaceApple()
    }
    else {
        removeFirstTile()
    }
}

function isPositionValid(top, left) {
    let elements = document.getElementsByClassName("snakeTile")
    for (let i = 0; i < elements.length; i++) {
        if (top === elements[i].style.top && left === elements[i].style.left) {
            return false
        }
    }
    return true
}

function randomPlaceApple() {
    let topArr = []
    let leftArr = []
    for (let i = 0; i < 10; i++) {
        topArr.push(i * 30 + "px")
        leftArr.push(i * 30 + "px")
    }
    let appleTop = topArr[Math.floor(Math.random() * topArr.length)]
    let appleLeft = leftArr[Math.floor(Math.random() * leftArr.length)]
    while (isPositionValid(appleTop, appleLeft) === false) {
        appleTop = topArr[Math.floor(Math.random() * topArr.length)]
        appleLeft = leftArr[Math.floor(Math.random() * leftArr.length)]
    }
    let apple = document.getElementById("apple")
    apple.style.top = appleTop
    apple.style.left = appleLeft
}

document.addEventListener("DOMContentLoaded", function () {
    randomPlaceApple()
    snakeGoInterval = window.setInterval(snakeGo, 1000) 
    document.addEventListener("keydown", onKeyDown)

})