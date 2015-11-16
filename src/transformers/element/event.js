var b = require("ast-types").builders;

var capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

module.exports =
{
        // Config
        itemName: /event/,
        itemType: 'Element',
        firstLevel: true,

        // Method
        init: element =>
        {
                // Get event name
                if (!element.attributes
                        || element.attributes.length != 1
                        || element.attributes [0].nodeName != 'name')
                        throw Error ('Event should have one (and only one) attribute called name');

                var eventName = element.attributes[0].value.trim ();
                var handlersVariableName = eventName + 'Handlers';
                var triggerVariableName = 'trigger' + capitalize (eventName);

                return {
                        createExternal: () => [
                                b.variableDeclaration (
                                        "var", [
                                                b.variableDeclarator (
                                                        b.identifier (handlersVariableName),
                                                        b.arrayExpression ([]))
                                        ]),
                                b.variableDeclaration (
                                        "var", [
                                                b.variableDeclarator (
                                                        b.identifier (triggerVariableName),
                                                        b.functionExpression(
                                                                b.identifier (''),
                                                                [b.identifier ('args')],
                                                                b.blockStatement([
                                                                        b.expressionStatement (
                                                                                        b.callExpression (
                                                                                        b.memberExpression (
                                                                                                b.identifier ('jQuery'),
                                                                                                b.identifier ('each'),
                                                                                                false
                                                                                        ),
                                                                                        [
                                                                                                b.identifier (handlersVariableName),
                                                                                                b.functionExpression (
                                                                                                        b.identifier (''),
                                                                                                        [
                                                                                                                b.identifier ('handlerIndex'),
                                                                                                                b.identifier ('handler')
                                                                                                        ],
                                                                                                        b.blockStatement ([
                                                                                                                b.expressionStatement (
                                                                                                                        b.callExpression (
                                                                                                                                b.identifier ('handler'),
                                                                                                                                [b.identifier ('args')]
                                                                                                                        )
                                                                                                                )
                                                                                                        ])
                                                                                                )
                                                                                        ]
                                                                                )
                                                                        )
                                                                ])
                                                        ))
                                        ]),
                                b.assignmentStatement (
                                        '=',
                                        b.memberExpression (
                                                b.identifier ("this"),
                                                b.identifier (eventName),
                                                false),
                                        b.functionExpression (
                                                b.identifier (''),
                                                [b.identifier ('callback')],
                                                b.blockStatement ([
                                                        b.expressionStatement (
                                                                b.callExpression (
                                                                        b.memberExpression (
                                                                                b.identifier (handlersVariableName),
                                                                                b.identifier ('push'),
                                                                                false),
                                                                                [b.identifier ('callback')]))
                                                ])
                                        ))
                        ]
                };
        }
};
