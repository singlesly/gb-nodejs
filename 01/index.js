const colors = require('colors');

// console.log(colors.red(`Hello, ${process.argv[2]}`));


let count = process.argv[2];
let arr = [];

/*next:
for (let i = 2; i <= count; i++){
    for(let j = 2; j < i; j++){
        if(i % j === 0) continue next;
    }
    arr.push(i);
}*/
// if( count !== undefined){
//     for (let i=0;i <= count;i++){
//         let firstValue = Math.round(Math.random() * 100);
//         arr.push(firstValue)
//     }
//     return arr;
// } else{
//     console.log("Введите число");
// }
// for (let j = 0; j < arr.length; j += 3){
//     console.log(colors.green(arr[j]));
//     if(arr[j + 1] !== undefined){
//         console.log(colors.yellow(arr[j + 1]));
//     }
//
//     if(arr[j + 2] !== undefined){
//         console.log(colors.red(arr[j + 2]));
//     }
// }
function randomGenerator(count) {
    let result = [];


    for (let i=0;i <= count;i++){
        let firstValue = Math.round(Math.random() * 100);
        result.push(firstValue)
    }
    return result;
}

console.log(randomGenerator(100));
