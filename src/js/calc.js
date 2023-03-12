const buttons = document.querySelectorAll('button')
const display = document.querySelector('#display')


buttons.forEach((btn) => {
  btn.addEventListener('click', function(e){
    let inpFirst, inpSecond, operator
    let inpCompleted = false
    let innerText = +this.innerText
    function inpParam(param){
      param += innerText
      display.value += param
      return param
    }
    function storeParam(input){
      let param = input
      do{
        if(!isNaN(+innerText)){
          inpParam(param);
        } else{
          inpCompleted = true
        }
      } while(!inpCompleted)
    }
    storeParam(inpFirst)

    if(inpCompleted) {
      inpParam(operator)
      inpCompleted = false
    }

    if(operator){
      inpParam(inpSecond)
    }

    console.log(inpFirst, inpSecond, operator);
        
  })
})
