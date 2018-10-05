
> jsclass-serializer@0.2.0 jsdoc /Volumes/SDDrive/Google Drive/project/JsDDD/lib/jsclass-serializer
> jsdoc2md --template README.hbs --files index.js

[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Classes

<dl>
<dt><a href="#Serializable">Serializable</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#constructor">constructor(baseclass)</a></dt>
<dd><p>&quot;jsclass-serializer&quot; provides features to serialize and deserialize to memory
and to file in json format.  Deserializing returns instance of original class.</p>
</dd>
</dl>

<a name="Serializable"></a>

## Serializable
**Kind**: global class  

* [Serializable](#Serializable)
    * [new Serializable()](#new_Serializable_new)
    * [.saveToFile(o, filename)](#Serializable.saveToFile) ⇒ <code>json</code>

<a name="new_Serializable_new"></a>

### new Serializable()
[Serializable description]

<a name="Serializable.saveToFile"></a>

### Serializable.saveToFile(o, filename) ⇒ <code>json</code>
Save serialized json object to file.  Where directory path would be the
path previously set by setStoragePath().
This method can serialize any type of object.

**Kind**: static method of [<code>Serializable</code>](#Serializable)  
**Returns**: <code>json</code> - Json text.  
**Group**: Serializable  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>any</code> | Object to serialize. |
| filename | <code>string</code> | Filename to save object. |

<a name="constructor"></a>

## constructor(baseclass)
"jsclass-serializer" provides features to serialize and deserialize to memory
and to file in json format.  Deserializing returns instance of original class.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| baseclass | <code>any</code> | Set "this", when use with jsclass-mixin. |

<a name="serialize"></a>

## .serialize() ⇒ <code>json</code>
Serialize object to json format.

**Kind**: instance function  
**Returns**: <code>json</code> - Json text.  
<a name="saveToFile"></a>

## .saveToFile() ⇒ <code>json</code>
Save serialized json object to file.  Where directory path would be the
path previously set by setStoragePath(), and file name would be set equally
to given objects uuid.

**Kind**: instance function  
**Returns**: <code>json</code> - Json text.  
<a name="deserialize"></a>

## .deserialize(json)
Deserialize json text to object

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>json</code> | [description] |

<a name="loadFromFile"></a>

## .loadFromFile(uuid)
Load json text from file and convert to object. Where directory path would
be the path previously set by setStoragePath().

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | Unique identifier to specify the file to load from. |

<a name="setStoragePath"></a>

## .setStoragePath(p)
Set directory path to save/load serialized information to/from file.

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>string</code> | Absolute or relative directory path |

<a name="loadFromFile"></a>

## .loadFromFile(filename) ⇒ <code>any</code>
Load json text from file and convert to object. Where directory path would
be the path previously set by setStoragePath().
This method can deserialize any file with json text.

**Kind**: static function  
**Returns**: <code>any</code> - Deserialized object.  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Filename to load json from. |

<a name="serialize"></a>

## .serialize(o) ⇒ <code>json</code>
Serialize object to json format.
This method can serialize any type of object.

**Kind**: static function  
**Returns**: <code>json</code> - Json text.  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>any</code> | Object to serialize. |

<a name="deserialize"></a>

## .deserialize(json)
Deserialize json text to object
This method can deserialize any file with json text.

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>json</code> | [description] |


* * *

&copy; 1942-2016 Muhammad Ali
