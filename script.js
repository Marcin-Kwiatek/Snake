function snakeGoDown() {
    for (let i = 1; i <= 3; i++) {
        let element = document.getElementById("snakeTile" + i)
        let style = getComputedStyle(element)
        let numberCurrentTop = parseInt(style.top)
        if (30 + numberCurrentTop < 300) {
            element.style.top = (30 + numberCurrentTop).toString() + "px"
        }
        else { element.style.top = "0px" }
    }
}

function removeFirstTile(){
    let resultNumberValues = []
    let elements = document.getElementsByClassName("snakeTile")
    for (i=0;i<elements.length;i++){
    let valueSnakeTile = elements[i].id.replace('snakeTile','')
    let numberValueSnakeTile = parseInt(valueSnakeTile)
    resultNumberValues.push(numberValueSnakeTile)
    }
    let minValue = Math.min(...resultNumberValues)
    
}
document.addEventListener("DOMContentLoaded", function () {
    window.setInterval(snakeGoDown, 1000)
})