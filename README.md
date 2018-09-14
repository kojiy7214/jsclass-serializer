# jsclass-serializer
Yet another serialize module for Node.js, with unique feature that desrializ to its original class based Object.

## What Makes class-serializer Unique
Amoung many serializers, jsclass-serializer module is unique for its class
restore ability.  That is, deserializing does not result in creating
Object object, but original class-based object are restored.

## How to Use
Just extend your class based on "Serializable" class.  And everything works.

## Date Ready
"jsclass-serializer" can de/serialize built-in Date type object collect.

## Some Notes
Class serializer consumes global with namespace "__serializable_classes__".
Within this name space, every constructor of Serializable subclasses are
stored.  This is because of its module-scoped nature of node, by default
class-serializer can not recognize target class definition.  Please note that
this results in extra node instance memory space
consuming.
Serializable subclasses are forced to have(auto defined) property "classname".  
It is necessary for class-serializer to recognize application defined classes.
Be aware classname is an enumerable property, which means developer may
have to handle classname property while iterating other user defined
properties.

## Code Usage
Please take a look at  test/test.js for more sample codes.

### usage1:
```
class SampleClass extends Serializable{};
let c = new SampleClass();

let json = Serializable.serialize(c);
let o = Serializable.deserialize(json);

//o is not a [Object object], but an instance of SampleClass
//below code returns, true.
console.log(o instanceof SampleClass);
```

### usage2:
```
class SampleClass extends Serializable{};
let c1 = new SampleClass();
c1.a = "A";

let json = c1.serialize();

let c2 = new SampleClass();
c2.deserialize(json);

//You can deserialize back to its original class.
//below code returns "A"
console.log(c2.a);
```
