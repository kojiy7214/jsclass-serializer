<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [constructor][1]
    -   [Parameters][2]
-   [setStoragePath][3]
    -   [Parameters][4]
-   [serialize][5]
-   [saveToFile][6]
    -   [Parameters][7]
-   [saveToFile][8]
-   [loadFromFile][9]
    -   [Parameters][10]
-   [loadFromFile][11]
    -   [Parameters][12]
-   [serialize][13]
    -   [Parameters][14]
-   [deserialize][15]
    -   [Parameters][16]
-   [deserialize][17]
    -   [Parameters][18]

## constructor

"jsclass-serializer" provides features to serialize and deserialize to memory
and to file in json format.  Deserializing returns instance of original class.

### Parameters

-   `baseclass` **any** Set "this", when use with jsclass-mixin.

## (static) serialize

Serialize object to json format.
This method can serialize any type of object.

### Parameters

-   `o` **any** Object to serialize.

Returns **[json][20]** Json text.

## (static) deserialize

Deserialize json text to object
This method can deserialize any file with json text.

### Parameters

-   `json` **[json][20]** [description]

## (static) setStoragePath

Set directory path to save/load serialized information to/from file.

### Parameters

-   `p` **[string][19]** Absolute or relative directory path

## (static) saveToFile

Save serialized json object to file.  Where directory path would be the
path previously set by setStoragePath().
This method can serialize any type of object.

### Parameters

-   `o` **any** Object to serialize.
-   `filename` **[string][19]** Filename to save object.

Returns **[json][20]** Json text.

## (static) loadFromFile

Load json text from file and convert to object. Where directory path would
be the path previously set by setStoragePath().
This method can deserialize any file with json text.

### Parameters

-   `filename` **[string][19]** Filename to load json from.

Returns **any** Deserialized object.

## serialize

Serialize object to json format.

Returns **[json][20]** Json text.

## deserialize

Deserialize json text to object

### Parameters

-   `json` **[json][20]** [description]

## saveToFile

Save serialized json object to file.  Where directory path would be the
path previously set by setStoragePath(), and file name would be set equally
to given objects uuid.

Returns **[json][20]** Json text.


## loadFromFile

Load json text from file and convert to object. Where directory path would
be the path previously set by setStoragePath().

### Parameters

-   `uuid` **[string][19]** Unique identifier to specify the file to load from.


[1]: #constructor

[2]: #parameters

[3]: #setstoragepath

[4]: #parameters-1

[5]: #serialize

[6]: #savetofile

[7]: #parameters-2

[8]: #savetofile-1

[9]: #loadfromfile

[10]: #parameters-3

[11]: #loadfromfile-1

[12]: #parameters-4

[13]: #serialize-1

[14]: #parameters-5

[15]: #deserialize

[16]: #parameters-6

[17]: #deserialize-1

[18]: #parameters-7

[19]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON