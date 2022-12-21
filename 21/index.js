const fs = require("fs");
let data;
let rs;
try {
  data = fs.readFileSync(__dirname + "/input.txt", "utf8");
} catch (err) {
  console.error(err);
}

let map = {}
data.split(/\r?\n/).forEach(el => {
    if(!el) return;
    const arr = el.split(": ")
    map[arr[0]] = arr[1]
})



console.log(cal('root'))

function cal(key){
    let value = map[key]
    let number = Number(value)
    if(!isNaN(number)) {
        return number 
    }

    let values = value.split(' ')
    if(isNaN(Number(values[0]))){
        values[0] = cal(values[0])
    }
    if(isNaN(Number(values[2]))){
        values[2] = cal(values[2])
    }
    const expr = values.join(' ')
    return eval(expr)
}