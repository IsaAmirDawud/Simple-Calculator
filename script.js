/*const mathSymbolBtns = document.querySelectorAll(".math-symbol-btn-container button"); 
const numberBtnArray = document.querySelectorAll(".number-btn-container button"); */
const output = document.getElementById("output"); 

const zeroBtn = document.getElementById("zero-btn"); 
const decimalBtn = document.getElementById("decimal-btn"); 
const clearBtn = document.getElementById("clear-btn"); 

const equalBtn = document.getElementById("equal-btn"); 

const mathSymbolBtnContainer = document.getElementById("math-symbol-btn-container"); 
const numberBtnContainer = document.getElementById("number-btn-container"); 

let digitOutput = 0; 
let mathSymbolLimit = false; 
let calculate = false; 
let zeroBtnLimit = true; 

const add = (num1, num2) => {
    return parseFloat(num1) + parseFloat(num2); 
}

const subtract = (num1, num2) => {
    return num1 - num2 
}

const multiply = (num1, num2) => {
    return num1 * num2; 
}

const divide = (num1, num2) => {
    return num1 / num2; 
}

mathSymbolBtnContainer.addEventListener("click", e =>{
    if(calculate){
        calculate = false
    }
    if(e.target === mathSymbolBtnContainer || mathSymbolLimit){
        return; 
    } else {
        digitOutput += e.target.innerText; 
        mathSymbolLimit = true; 
        output.innerText = digitOutput; 
    }
})

numberBtnContainer.addEventListener("click", e =>{
    if(calculate){
        digitOutput = ""; 
        output.innerText = ""; 
        calculate = false; 
    }
    if(e.target.innerText === "0" && zeroBtnLimit){
        return; 
    }
    if (e.target === numberBtnContainer || e.target.innerText === "." || e.target.innerText === "c"){
        return; 
    } /*else if(e.target.innerText === "0" && !digitOutput){
        digitOutput = e.target.innerText; 
        mathSymbolLimit = false; 
        output.innerText = digitOutput;
        zeroBtnLimit = true; 
    }*/ else if(!digitOutput){
        digitOutput = e.target.innerText; 
        mathSymbolLimit = false; 
        output.innerText = digitOutput; 
        zeroBtnLimit = false; 
    } else {
        digitOutput += e.target.innerText; 
        mathSymbolLimit = false; 
        output.innerText = digitOutput; 
        zeroBtnLimit = false; 
    }
})



equalBtn.addEventListener("click", () =>{

    const digitOutputArray = digitOutput.split(""); 
    const lastChar = digitOutputArray[digitOutputArray.length - 1]; 

    
    if(lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "/"){
        digitOutputArray.pop(); 
    }
    

    for(let i = 0; i < digitOutputArray.length; i++){
        if(digitOutputArray[i] === "x" || digitOutputArray[i] === "/"){
            const equation = digitOutputArray[i]; 
            const number1 = []; 
            const number2 = []; 
            let numOfDigits = 1; 
            let j = i - 1;
            while (digitOutputArray[j] !== "+" && digitOutputArray[j] !== "-" && digitOutputArray[j] !== "x" && digitOutputArray[j] !== "/" && j !== -1){
                number1.unshift(digitOutputArray[j]); 
                numOfDigits++
                j--
            }
            let startIndex = j + 1; 
            j = i + 1;
            while (digitOutputArray[j] !== "+" && digitOutputArray[j] !== "-" && digitOutputArray[j] !== "x" && digitOutputArray[j] !== "/" && j < digitOutputArray.length){
                numOfDigits++
                number2.push(digitOutputArray[j]); 
                j++
            }
            if(equation === "x"){
                const result = multiply(number1.join(""), number2.join(""));
                digitOutputArray.splice(startIndex, numOfDigits, result); 
                console.log(digitOutputArray)
                i = -1
            } else {
                const result = divide(number1.join(""), number2.join(""));
                digitOutputArray.splice(startIndex, numOfDigits, result); 
                i = -1
            }
        }
        
        
    }

    for(let i = 0; i < digitOutputArray.length; i++){
        if(digitOutputArray[i] === "+" || digitOutputArray[i] === "-"){
            const equation = digitOutputArray[i]; 
            const number1 = []; 
            const number2 = []; 
            let numOfDigits = 1; 
            let j = i - 1; 
            while (digitOutputArray[j] !== "+" && digitOutputArray[j] !== "-" && j !== -1){
                number1.unshift(digitOutputArray[j]);
                numOfDigits++
                j--
            }
            let startIndex = j + 1; 
            j = i + 1; 
            while (digitOutputArray[j] !== "+" && digitOutputArray[j] !== "-" && j < digitOutputArray.length){
                number2.push(digitOutputArray[j]); 
                numOfDigits++
                j++
            }
            if(equation === "+"){
                const result = add(number1.join(""), number2.join(""));
                digitOutputArray.splice(startIndex, numOfDigits, result); 
                i = -1
            } else {
                const result = subtract(number1.join(""), number2.join(""));
                digitOutputArray.splice(startIndex, numOfDigits, result); 
                i = -1
            }
        }
        
    }
    digitOutput = digitOutputArray.join(""); 
    output.innerText = digitOutput; 
    calculate = true; 
})

clearBtn.addEventListener("click", () =>{
    digitOutput = 0; 
    output.innerText = digitOutput; 
})

zeroBtn.addEventListener("click", (e)=>{
    
})
