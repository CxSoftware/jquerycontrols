var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /^visible$/,
        itemType: 'Attr',

        // Method
        init: attribute =>
        {
                return {
                        addToParent: parent =>
                                attribute.nodeValue === "false" ?
                                        b.callExpression (
                                                b.memberExpression (
                                                        parent,
                                                        b.identifier ('hide'),
                                                        false),
                                                        [])
                                : null
                };
        }
};
