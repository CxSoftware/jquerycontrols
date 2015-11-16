var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemName: /(?:)/,
        itemType: 'Element',

        // Method
        init: element =>
        {
                return {
                        createHtmlElement: () => b.callExpression (
                                        b.identifier ('jQuery'),
                                        [b.literal ('<' + element.nodeName + '>')]),
                        addToParent: (parent, currentElement) => b.callExpression (
                                        b.memberExpression (
                                                parent,
                                                b.identifier ('append'),
                                                false),
                                        [currentElement])
                };
        }
};
