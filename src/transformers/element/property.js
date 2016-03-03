var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /^property$/,
        itemType: 'Element',
        firstLevel: true,

        // Method
        init: element =>
        {
                if (!element.attributes
                        || element.attributes.length != 1
                        || element.attributes [0].nodeName != 'name')
                        throw Error ('Property should have one (and only one) attribute called name');

                var propertyName = element.attributes[0].value.trim();
                if (propertyName.length == 0)
                        throw Error ('Property should have a name');

                var localValueName = propertyName + 'Value';

                return {
                        createExternal: () => [
                                // Local value
                                b.variableDeclaration (
                                        "var", [
                                                b.variableDeclarator (
                                                        b.identifier (localValueName),
                                                        b.identifier ('null'))
                                        ]),

                                // Function
                                b.assignmentStatement (
                                        '=',
                                        b.memberExpression (
                                                b.identifier ("this"),
                                                b.identifier (propertyName),
                                                false),
                                        b.functionExpression (
                                                b.identifier (''),
                                                [b.identifier ('newValue')],
                                                b.blockStatement ([
                                                        b.ifStatement (
                                                                b.binaryExpression (
                                                                        "===",
                                                                        b.identifier ('newValue'),
                                                                        b.identifier ('undefined')),
                                                                b.blockStatement ([
                                                                        b.returnStatement (b.identifier (localValueName))
                                                                ]),
                                                                b.blockStatement ([
                                                                        b.assignmentStatement (
                                                                                '=',
                                                                                b.identifier (localValueName),
                                                                                b.identifier ('newValue')
                                                                        )
                                                                ])
                                                        )
                                                ])
                                        ))
                        ]
                };
        }
};
