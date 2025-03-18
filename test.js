const myNum = 21;

function addTwo(num) {
  hello();  
  return num + 2;
}

function hello() {
  console.log('hello');
}

const sum = addTwo(myNum);
console.log(sum);