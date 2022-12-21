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
    if(key === 'root'){
        console.log(expr)
    }
    return eval(expr)
}

function hasHumn(key){
    let value = map[key]
    let rs = false
    if(key === 'humn') {
        return true 
    }
    let number = Number(value)
    if(!isNaN(number)) {
        return false 
    }
    let values = value.split(' ')
    let first = false
    let last = false
    if(isNaN(Number(values[0]))){
        first = hasHumn(values[0])
    }
    if(isNaN(Number(values[2]))){
        last = hasHumn(values[2])
    }

    return rs || first || last
}

function traceHumn(total, key){
    let value = map[key]
    let number = Number(value)
    if(!isNaN(number)) {
        return total
    }
    let values = value.split(' ')
    let first = false
    if(isNaN(Number(values[0]))){
        first = hasHumn(values[0])
    }

    let remain = 0
    let nxt = ''
    if(first){
        remain = cal(values[2])
        nxt = values[0]
    }else{
        remain = cal(values[0])
        nxt = values[2]
    }

    const ops = values[1]
    switch(ops){
        case '+': 
            total -= remain
        break;
        case '-': 
            if(first){
                total += remain
            }else{
                total = remain - total
            }
        break;
        case '*':
            total /= remain
        break;
        case '/': 
            if(first){
                total *= remain
            }else{
                total = remain / total
            }
        break;
    }
    
    if(key === 'humn'){
        return total
    }else{
        return traceHumn(total, nxt)
    }

}

let values = map['root'].split(' ')
let first = false
let last = false
if(isNaN(Number(values[0]))){
    first = hasHumn(values[0])
}
if(isNaN(Number(values[2]))){
    last = hasHumn(values[2])
}
console.log(values[0], first)
console.log(values[2], last)

let total = 0
let key = ''
if(first){
    key = values[0]
    total = cal(values[2])
}else{
    key = values[2]
    total = cal(values[0])
}
console.log(total,key)
let humn = traceHumn(total,key)
console.log(humn)
map.humn = humn
console.log('cal(): ', cal('root'))