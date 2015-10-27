# Basic XSLT from XML using JavaScript

## Installation
Generally, just clone from GitHub then run ```npm install```

```
$ git clone https://github.com/cicorias/XmlValidation
$ cd XmlValidation
$ npm install
```

## Needed Java JVM update
This library depends upon xslt4node which unfortnately depends upon JNI being enabled
for the JVM.

However, in the latest updates to Java from Oracle, this is not set.

see [this](https://github.com/joeferner/node-java/issues/223) for more information.
and [this](https://github.com/joeferner/node-java/issues/90#issuecomment-45613235)

**cite taken from above**
In short, Oracle's JDK doesn't advertise itself as supporting JNI, so even though node-java links to JAVA_HOME correctly, when the JNI_CreateJavaVM call is made the system sees that the linked JDK doesn't "support" JNI and switches to Java 6 instead.

To fix this I manually enabled JNI by editing 
```/Library/Java/JavaVirtualMachines/<version>.jdk/Contents/Info.plist``` and adding JNI as an option in JVMCapabilities:

```javascript
<key>JVMCapabilities</key>
<array>
    ...
    <string>JNI</string>
</array>
```

## Running
put your XML, XSD, and XSLT into the ```./drop``` folder and then from the root where
you cloned run:

```
$ node runit.js
```

or, you can just run the following on a Nix platform like OSX or Linux (not sure about windows).

```
$ ./runit.js
```

