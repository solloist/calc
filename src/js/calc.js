const buttons = document.querySelectorAll('button')
const display = document.querySelector('#display')

buttons.forEach(btn => {
  btn.addEventListener('click', function(e){
    let innerText = e.target.innerText;         // зміст кожної кнопки калькулятора
    checkConditions(innerText);
  })
})

function calc(obj) {     // визначаєм, який оператор і робим відповідний підрахунок і виводим в інпут
  let counter = obj.operator;
  let a = obj.inpFirst;
  let b = obj.inpSecond;
  let res;
  switch(counter) {
    case "+":
      res = a + b;
   return display.value = changeSymbol(res, ".", ",");
   case "-":
    res = a - b;
    return display.value = changeSymbol(res, ".", ",");
  case "/": 
    res = Math.round((a / b) * 100) / 100;
    return display.value = changeSymbol(res, ".", ","); 
   case "x":
      res =  Math.round((a * b) * 100) / 100;
      return  display.value = changeSymbol(res, ".", ",");
   case "%": 
      res = Math.round(a * (b / 100) * 100) / 100;
      return display.value = changeSymbol(res, ".", ",");
  }
 }

 function toNumber(arr, item){               //функція отримання з масиву числа, з яким будуть робитись підрахунки
  let str = arr.join("");
  if(str.includes(item))  {                  //шукаєм в строці числа позначку, що воно має бути відємним
   return str = Number(str.replace(item, "") * -1);             // якщо знаходим, то робим число відємним
   } else{
    return str = Number(str)                // якщо не знаходим, просто робим із строки число
   }
}

function checkConditions(btnValue){
  if(btnValue === "C"){         // спочатку описуємо дії по кнопках, які є більш унікальними
    display.value = "";
   } else if(btnValue === "+-"){ // замінюєм зміст кнопки на такий, що буде відображатись в інпуті і не буде плутатись програмою з звичайним мінусом 
    display.value += " -";
   }
    else if (btnValue !== "=") { // якщо не натуснуто равно та кнопки вище, то відображаєм все в інпуті
      display.value += btnValue
    } else {                      // у всіх інших випадках робим підрахунок
    let obj =  createNumber(display.value)
    calc(obj);
     }
}

function createNumber(inpString){
  let operator, inpFirst, inpSecond;       // описуємо перемінні, які беруть участь в підрахунку
  let inpArray = [], firstArray = [], secArray=[]; // обявляєм тимчасові перемінні

    inpString = changeSymbol(inpString, " -", "n");
    inpString = changeSymbol(inpString, ",", ".");
    inpArray = inpString.split("").map(item => item);
    inpArray.forEach((num, i)=>{ // перебираєм масив інпуту
      if (isNaN(num) && num != "." && num != "n") {// знаходим елемент-оператор підрахунку, це розділовий елемент між двома числами, над якими здійснюються підрахунок
      operator = num;                             // присваюєм знайдений елемент відповідній перемінній
      firstArray = inpArray.slice(0, i);          // все, що перед цим елементом-оператором буде першим числом
      secArray = inpArray.slice(i + 1, inpArray.length);
      inpFirst = toNumber(firstArray, "n"); // перетворюєм масив першого числа власне у перше число
      inpSecond = toNumber(secArray, "n"); // перетворюєм масив другого числа власне у друге число
      } 
    }); 
    let countObj = new NewObj(operator, inpFirst, inpSecond)
    return countObj;
  }

class NewObj{
  constructor(operator, inpFirst, inpSecond){
    this.operator = operator;
    this.inpFirst = inpFirst;
    this.inpSecond = inpSecond;
  }
}

function changeSymbol(datas, initial, changed){
  let str = String(datas);
 return str.includes(initial) ? str = str.replaceAll(initial, changed) : str;
}

