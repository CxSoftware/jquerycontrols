var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /^localAlias$/,
        itemType: 'Attr',

        // Method
        init: attribute =>
        {
                return {
                        addToParent: parent => b.assignmentExpression (
                                '=',
                                b.identifier (attribute.value),
                                parent),
                        createExternal: () => [
                                b.variableDeclaration (
                                        "var", [
                                                b.variableDeclarator (
                                                        b.identifier (attribute.value),
                                                        b.identifier ('null'))
                                        ]
                                )
                        ]
                };
        }
}
