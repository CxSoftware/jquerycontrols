var n = require("ast-types").namedTypes;
var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /(?:)/,
        itemType: 'Attr',

        // Method
        init: attribute =>
        {
                return {
                        addToParent: parent => b.callExpression (
                                b.memberExpression (
                                        parent,
                                        b.identifier ('attr'),
                                        false),
                                [
                                        b.literal (attribute.name),
                                        b.literal (attribute.value)
                                ])
                };
        }
};
