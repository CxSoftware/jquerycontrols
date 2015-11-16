

$(function ()
{
        // Add every control to the container
        var container = $('#container');
        var tests = [testAlias, testClass, testEmpty, testEvent, testID, testProperty, testScript, testTable, testTextAndDivs, testText];
        $.each (tests, function (index, test)
        {
                var control = new test ();
                container.append (control.root);
        });

        // Test event
        var eventControl = new testEvent ();
        eventControl.modified (function () { alert ('triggered 1!'); });
        eventControl.modified (function () { console.log ('triggered 2!'); });
        container.append (eventControl.root.text ('click me to trigger!'));

        // Test property
        var propertyControl = new testProperty ();
        console.log ('initial value', propertyControl.count());
        propertyControl.count (10);
        console.log ('new value', propertyControl.count());
});
