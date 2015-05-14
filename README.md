# angular-idleness
A simple, ultra-lighweigth angular service whice executes callbacks when user goes idle or active

# Demo

TODO

# Installation

Installation is easy as Idleness has no dependencies.

#### Install with Bower
```sh
$ bower install angular-idleness
```

### Adding dependency to your project

When you are done downloading all this, the only remaining part is to add dependencies on the `angular-idleness` AngularJS module:

```js
angular.module('myModule', ['angular-idleness']);
```

This was tested to work with the following browsers:
* Chrome
* Latest Firefox
* IE 8, 9, 10 and 11
* Opera

Also Tested on Galaxy S3 Mobile Android (4.3) using Mobile Chrome, Firefox Mobile, Opera Mini, and the Stock Android 

Modern mobile browsers should work without problems.

# Usage

On your run blocks
```
app.run(function (idleness) {
  idleness.observe();
});
```

Controller
```
app.controller('MyController', function (idleness) {
  idleness.onIdle(function() {
    console.log('i am idle :(');
  }, function() {
    alert('i am alive');
  });
});
```

Or you can explicitly set the onIdle and onNotIdle functions
```
app.controller('MyController', function ($rootScope, idleness) {
  idleness.onIdleFn = function() {
    $rootScope.idle = true;
  };
  idleness.onNotIdle = function() {
    $rootScope.idle = false;
  };
});
```
