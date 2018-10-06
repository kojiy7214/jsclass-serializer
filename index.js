var fs = require("fs");
var uuid = require("uuid/v4")

let environment = Symbol();
let srializable_classes = Symbol();

class DateProxyForClassSerializer {
  constructor(date) {
    this.classname = "DateProxyForClassSerializer";
    this.value = date;
  }
}

/**
 * Serializable object and deserialize back to its original class instance.
 * Also supports save/load to/from file system.
 * @class Serializable
 */
class Serializable {
  /**
   * Set directory path to save/load serialized information to/from file.
   * @method setStoragePath
   * @param  {string}       p Absolute or relative directory path
   * @static
   * @memberof Serializable
   */
  static setStoragePath(p) {
    Serializable[environment].storage_path = p;
  }

  /**
   * Save serialized json object to file.  Where directory path would be the
   * path previously set by setStoragePath().
   * This method can serialize any type of object.
   * @method saveToFile
   * @param  {any}   o Object to serialize.
   * @param  {string}   filename Filename to save object.
   * @return {json}     Json text.
   * @static
   * @memberof Serializable
   */
  static saveToFile(o, filename) {
    let json = Serializable.serialize(o);
    // if storage_path is not set, throw exception
    if (!Serializable[environment].storage_path) {
      throw "Set storage path with Serializable.setStoragePath() method";
    }

    // check if storage path exists, if it doesnt create one
    let dirname = Serializable[environment].storage_path;

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    // overwrite file
    let filepath = dirname + filename;
    fs.writeFileSync(filepath, json, "utf8", (error) => {});

    return json;
  }
  /**
   * Load json text from file and convert to object. Where directory path would
   * be the path previously set by setStoragePath().
   * This method can deserialize any file with json text.
   * @method loadFromFile
   * @param  {string}     filename Filename to load json from.
   * @return {any}          Deserialized object.
   * @static
   * @memberof Serializable
   */
  static loadFromFile(filename) {
    let dirname = Serializable[environment].storage_path;
    let filepath = dirname + filename;
    let json = fs.readFileSync(filepath);

    return Serializable.deserialize(json);
  }

  /**
   * Load all json files under storage directory.
   * @method loadAll
   * @param  {function(object)} Callback function applies to retrieved objects.
   * @return {Array} Retrieved objects.
   * @static
   * @memberof Serializable
   */
  static loadAll(callback) {
    let dirname = Serializable[environment].storage_path;
    let retval = [];
    fs.readdirSync(dirname).forEach(file => {
      let o = Serializable.loadFromFile(file);
      let callback_returns = true;
      if (callback) {
        callback_returns = callback(o);
      }

      if (!callback_returns === false) {
        retval.push(o);
      }
    });
    return retval;
  }

  /**
   * Serialize object to json format.
   * This method can serialize any type of object.
   * @method serialize
   * @param  {any}   o Object to serialize.
   * @return {json}    Json text.
   * @static
   * @memberof Serializable
   */
  static serialize(o) {
    let r = function(k, v) {
      if (o[k] instanceof Date) {
        v = new DateProxyForClassSerializer(v);
      }
      return v;
    }
    return JSON.stringify(o, r);
  }

  /**
   * Deserialize json text to object
   * This method can deserialize any file with json text.
   * @method deserialize
   * @param  {json}    json [description]
   * @static
   * @memberof Serializable
   */
  static deserialize(json) {
    let r = function(k, v) {
      if (v instanceof Object && v.classname) {
        if (global[srializable_classes][v.classname]) {
          let c = global[srializable_classes][v.classname];
          v = Object.assign(new c(), v);
        } else if (v.classname === "DateProxyForClassSerializer") {
          return new Date(v.value);
        }
      }
      return v;
    }

    return JSON.parse(json, r);
  }

  /**
   * "jsclass-serializer" provides features to serialize and deserialize to memory
   * and to file in json format.  Deserializing returns instance of original class.
   * @method constructor
   * @param  {any}    baseclass Set "this", when use with jsclass-mixin.
   */
  constructor(baseclass) {
    let that = baseclass || this;

    let classname = that.constructor.name;
    global[srializable_classes][classname] = that.constructor;
    that.classname = classname;
    that.uuid = uuid();
    Object.defineProperty(that, "classname", {
      configurable: false,
      writable: true,
    });
  }

  /**
   * Serialize object to json format.
   * @method serialize
   * @return {json}    Json text.
   * @instance
   * @memberof Serializable
   */
  serialize() {
    return Serializable.serialize(this);
  }

  /**
   * Save serialized json object to file.  Where directory path would be the
   * path previously set by setStoragePath(), and file name would be set equally
   * to given objects uuid.
   * @method saveToFile
   * @return {json}     Json text.
   * @instance
   * @memberof Serializable
   */
  saveToFile() {
    return Serializable.saveToFile(this, this.uuid);
  }

  /**
   * Deserialize json text to object
   * @method deserialize
   * @param  {json}    json [description]
   * @instance
   * @memberof Serializable
   */
  deserialize(json) {
    let o = Serializable.deserialize(json);
    if (!this instanceof o.constructor) {
      throw "Type unmatch: [" + this.classname + "] is not instance of [" + o.constructor.name + "]";
    }
    Object.assign(this, o);
  }

  /**
   * Load json text from file and convert to object. Where directory path would
   * be the path previously set by setStoragePath().
   * @method loadFromFile
   * @param  {string}     uuid Unique identifier to specify the file to load from.
   * @instance
   * @memberof Serializable
   */
  loadFromFile(uuid) {
    let o = Serializable.loadFromFile(uuid);
    if (!this instanceof o.constructor) {
      throw "Type unmatch: [" + this.classname + "] is not instance of [" + o.constructor.name + "]";
    }
    Object.assign(this, o);
  }
}

if (!global[srializable_classes]) {
  global[srializable_classes] = {};
};

if (!Serializable[environment]) {
  Serializable[environment] = {};
};

/**
 * A module for de/serializing objects.
 * @module jsclass-serializer
 */
module.exports = Serializable;