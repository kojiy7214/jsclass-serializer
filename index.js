/**
  Yet another serialize module for Node.js.

  <h3>What makes class-serializer unique.</h3><br>
  Amoung many serializeds, class-serializer module is unique for its class
  restore ability.  That is, deserializing does not result in creating
  Object object, but original class-based object.
  <br>

  <h3>Some notes</h3>
  Class serializer consumes global with namespace "__serializable_classes__".
  Within this name space, every constructor of Serializable subclasses are
  stored.  This is because of its module-scoped nature of node, by default
  class-serializer can not recogize target class definition.  Please note that
  this results in extra node instance memory space
  consuming.<br>
  Serializable subclasses forced to have(auto defined) property "classname".  It is
  necessary so class-serializer can detect its original class from JSON string.
  Be aware classname is an enumarable property, which means developer many
  have to handle classname property while iterating other user defined
  properties.

  <h3>Code usage</h3><br>
  usage1:
  <pre><code>
  class SampleClass extends Serializable{};
  let c = new SampleClass();

  let json = Serializable.serialize(c);
  let o = Serializable.deserialize(json);

  //o is not a [Object object], but an instance of SampleClass
  //below code returns, true.
  console.log(o instanceof SampleClass);
  </code></pre>
  <br>

  usage2:
  <pre><code>
  class SampleClass extends Serializable{};
  let c1 = new SampleClass();
  c1.a = "A";

  let json = c1.serialize();

  let c2 = new SampleClass();
  c2.deserialize(json);

  //You can deserialize back to its original class.
  //below code returns "A"
  console.log(c2.a);
  </code></pre>

 */

/**
 * Proxy class to support Date type object de/serialization.
 */
class DateProxyForClassSerializer {
  constructor(date) {
    this.classname = "DateProxyForClassSerializer";
    this.value = date;
  }
}

module.exports = class Serializable {
  static serialize(o) {
    let r = function(k, v) {
      if (o[k] instanceof Date) {
        v = new DateProxyForClassSerializer(v);
      }
      return v;
    }
    return JSON.stringify(o, r);
  }

  static deserialize(s) {
    let r = function(k, v) {
      if (v instanceof Object && v.classname) {
        if (global.__serializable_classes__[v.classname]) {
          let c = global.__serializable_classes__[v.classname];
          v = Object.assign(new c(), v);
        } else if (v.classname === "DateProxyForClassSerializer") {
          return new Date(v.value);
        }
      }
      return v;
    }

    return JSON.parse(s, r);
  }

  constructor(baseclass) {
    let that = baseclass || this;

    let classname = that.constructor.name;
    !global.__serializable_classes__ && (global.__serializable_classes__ = {});
    global.__serializable_classes__[classname] = that.constructor;
    that.classname = classname;
    Object.defineProperty(that, "classname", {
      configurable: false,
      writable: true,
    });
  }

  serialize() {
    return Serializable.serialize(this);
  }

  deserialize(json) {
    let o = Serializable.deserialize(json);
    if (!this instanceof o.constructor) {
      throw "Type unmatch: [" + this.classname + "] is not instance of [" + o.constructor.name + "]";
    }
    Object.assign(this, o);
  }
}