function deepEqual(input1,input2){
  var numProp1 = 0;
  var numProp2 = 0;

  // Do initial test return if true
  if (input1 === input2){
    return true;
  }

  // check to make sure that we are comparing objects and they arent null
  if (typeof(input1) != "object" ||  input1 == null || typeof(input2) != "object" || input2 == null){
    return false;
  }

  // loop through count number of properties in input1
  for (var property in input1){
    numProp1 += 1;
  }

  // loop through input2 use recursive call to check nested objects
  for (var property in input2){
    numProp2 += 1;
    if ((property in input1) == false || deepEqual(input1[property], input2[property]) == false){
      return false;
    }
  }

  // check if numbner of properties is the same in both objects
  return numProp1 == numProp2;
}


// Test conditions from example
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
