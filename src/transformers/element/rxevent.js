var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /rxevent/,
        itemType: 'Element',
        firstLevel: true,

        // Method
        init: element =>
        {
                // Get event name
                if (!element.attributes
                        || element.attributes.length != 1
                        || element.attributes [0].nodeName != 'name')
                        throw Error ('RxEvent should have one (and only one) attribute called name');

                var eventName = element.attributes[0].value.trim ();

                return {
                        createExternal: () => [
                                // var click;
                                b.variableDeclaration (
                                        "var", [
                                                b.variableDeclarator (
                                                        b.identifier (eventName),
                                                        b.identifier ('null'))
                                        ]),
                                // this.click = Rx.Observable
                                // .create (function (o) { click = o; })
                                // .publish ();
                                b.assignmentStatement (
                                        '=',
                                        b.memberExpression (
                                                b.identifier ("this"),
                                                b.identifier (eventName),
                                                false),
                                        b.callExpression (
                                                b.memberExpression (
                                                        b.callExpression (
                                                                b.memberExpression (
                                                                        b.memberExpression (
                                                                                b.identifier ("Rx"),
                                                                                b.identifier ("Observable"),
                                                                                false),
                                                                        b.identifier ("create"),
                                                                        false),
                                                                [b.functionExpression (
                                                                        b.identifier (''),
                                                                        [b.identifier ('o')],
                                                                        b.blockStatement ([
                                                                                b.assignmentStatement (
                                                                                        '=',
                                                                                        b.identifier (eventName),
                                                                                        b.identifier ('o'))
                                                                        ])
                                                                )]),
                                                        b.identifier ('publish'),
                                                        false),
                                                        [])),
                                // this.click.connect ();
                                b.expressionStatement (
                                        b.callExpression (
                                                b.memberExpression (
                                                        b.memberExpression (
                                                                b.identifier ("this"),
                                                                b.identifier (eventName),
                                                                false),
                                                        b.identifier ('connect'),
                                                        false),
                                                []))
                        ]
                };
        }
};
