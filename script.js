function snakeGoDown(){
    for(let i=1;i<=2;i++){
        let element = document.getElementById("snakeTile"+i)
        let style = getComputedStyle(element)
        let numberCurrentTop = parseInt(style.top)
        document.getElementById("snakeTile"+i).style.top = (30+numberCurrentTop).toString()+"px"
    }
}
document.addEventListener("DOMContentLoaded", function(){
    console.log("now")
    window.setInterval(snakeGoDown,1000)
})