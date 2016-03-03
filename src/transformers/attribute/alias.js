var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /^alias$/,
        itemType: 'Attr',

        // Method
        init: attribute =>
        {
                return {
                        addToParent: parent => b.assignmentExpression (
                                '=',
                                b.memberExpression (
                                        b.thisExpression (),
                                        b.identifier (attribute.value),
                                        false),
                                parent)
                };
        }
};
