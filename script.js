function snakeGoDown() {
    removeFirstTile()
    addLastTile()
}

let direction = "down"

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
    let lastElement = document.getElementById(lastElementId)
    let lastElementStyle = getComputedStyle(lastElement)
    let lastElementTop = parseInt(lastElementStyle.top)
    let lastElementLeft = parseInt(lastElementStyle.left)
    if (direction === "down") {
        if (30 + lastElementTop < 300) {
            newTile.style.top = (30 + lastElementTop).toString() + "px"
            newTile.style.left = lastElementLeft + "px"
        }
        else {
            newTile.style.top = "0px"
            newTile.style.left = lastElementLeft + "px"
        }
    }
    if (direction === "right") {
        if (30 + lastElementLeft < 300) {
            newTile.style.left = (30 + lastElementLeft).toString() + "px"
            newTile.style.top = lastElementTop + "px"
        }
        else {
            newTile.style.left = "0px"
            newTile.style.top = lastElementTop + "px"
        }
    }
    let canvasElement = document.getElementById("canvas")
    canvasElement.appendChild(newTile)


}

function onKeyDown(event) {
    if (event.keyCode === 40 && direction !== "up") {
        direction = "down"
    }
    if (event.keyCode === 39 && direction !== "left") {
        direction = "right"
    }
    if (event.keyCode === 38 && direction !== "down") {
        direction = "up"
    }
    if (event.keyCode === 37 && direction !== "right") {
        direction = "left"
    }

}

document.addEventListener("DOMContentLoaded", function () {
    window.setInterval(snakeGoDown, 1000)
    document.addEventListener("keydown", onKeyDown)

})