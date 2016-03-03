# jQueryControls
jQuery controls (AKA widgets) Code Generator

## Introduction

The jQuery Controls generates JS code based on XML files (HTML like files) and optional JS scripts.

This is useful to encapsulate code related with any specific widget on your HTML page.

## Runtime dependencies

The generated code works thanks to these libraries:

* [jQuery](https://jquery.com): A fast, small, and feature-rich JavaScript library.
* [RxJS](https://github.com/Reactive-Extensions/RxJS): The Reactive Extensions for JavaScript (optional, needed only for rxevent)

## Build dependencies

All the magic behind jQueryControls works thanks to these external dependencies:

* [ast-types](https://github.com/benjamn/ast-types): Esprima-compatible implementation of the Mozilla JS Parser API
* [escodegen](https://github.com/estools/escodegen): ECMAScript code generator
* [esprima](https://github.com/jquery/esprima): ECMAScript parsing infrastructure for multipurpose analysis http://esprima.org
* [fs-promise](https://github.com/kevinbeaty/fs-promise): Node fs methods as Promise/A+ (optional fs-extra, graceful-fs)
* [linq](https://github.com/mihaifm/linq): LINQ for JavaScript library
* [traceur](https://github.com/google/traceur-compiler/): JavaScript.next-to-JavaScript-of-today compiler
* [xmldom](https://github.com/jindw/xmldom): A PURE JS W3C Standard based (XML DOM Level2 CORE) DOMParser and XMLSerializer

## Compile

In order to compile the generator:

```bash
# Install gulp
sudo npm install -g gulp

# Install the dependencies
npm install

# Run gulp
gulp
```

## Create your first control

### Step 1: Create a file named LoginForm.jc:

```xml
<div class="loginForm">
  <rxevent name="login" />
  Username: <input alias="username" /><br />
  Password: <input type="password" alias="password" /><br />
  <button alias="button">Click me!</button>
</div>
```

### Step 2: Create a file named LoginForm.js:

```javascript
control.button.click (
  function ()
  {
    login.onNext (control.username.val ())
  });
```

### Step 3: Run jquerycontrols

```bash
./dist/run.js sourceDirectory destinationDirectory
```

where source directory is the directory where you placed your .jc file and destinationDirectory is any other directory (likely empty).

### Step 4: Use your control on your page

Add a reference to the output LoginForm.js file:

```xml
<script src="outputDirectory/LoginForm.js"></script>
```

Note that jQuery is required as well.

Create and play with your control in your own JS file:

```javascript
// Init
var form = new LoginForm ();

// Subscribe to the event
form.login.subscribe (function (username) { alert (username + ' is trying to log in'); });
$('#someContainer').append (form.root);
```

Reload your page and play :)

## More samples

Read the documentation in the [Wiki](../../wiki). See [the test code](/test).
