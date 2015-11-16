# jQueryControls
jQuery controls (AKA widgets) Code Generator

## Introduction

The jQuery Controls generates JS code based on XML files (HTML like files) and optional JS scripts.

This is useful to encapsulate code related with any specific widget on your HTML page.

## Compile

In order to compile the generator, you will need to install traceur: `npm install -g traceur`

```
npm install
gulp
```

## Create your first control

### Step 1: Create a file named LoginForm.jc:

```
<div class="loginForm">
  <event name="login" />
  Username: <input alias="username" /><br />
  Password: <input type="password" alias="password" /><br />
  <button alias="button">Click me!</button>
</div>
```

### Step 2: Create a file named LoginForm.js:

```
control.button.click (
  function ()
  {
    triggerLogin (control.username.val ())
  });
```

### Step 3: Run jquerycontrols

`./dist/run.js sourceDirectory destinationDirectory`

where source directory is the directory where you placed your .jc file and destinationDirectory is any other directory (likely empty).

### Step 4: Use your control on your page

Add a reference to the output LoginForm.js file:

`<script src="outputDirectory/LoginForm.js"></script>`

Note that jQuery is required as well.

Create and play with your control in your own JS file:

```
// Init
var form = new LoginForm ();

// Subscribe to the event
form.login (function (username) { alert (username + ' is trying to log in'); });
$('#someContainer').append (form.root);
```

Reload your page and play :)
