var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /^class$/,
        itemType: 'Attr',

        // Method
        init: attribute =>
        {
                return {
                        addToParent: parent => b.callExpression (
                                b.memberExpression (
                                        parent,
                                        b.identifier ('addClass'),
                                        false),
                                [b.literal (attribute.nodeValue)])
                };
        }
};
