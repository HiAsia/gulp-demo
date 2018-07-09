var obj = {
	name: 'asa',
	age: 18,
	gender: "man"
};

var name = obj.name,
    age = obj.age,
    gender = obj.gender;


var sayHello = function sayHello() {
	return alert("hello " + name);
};

console.log(name, age, gender);