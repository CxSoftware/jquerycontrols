var b = require("ast-types").builders;

module.exports =
{
        // Config
        itemType: 'Text',

        // Method
        init: item =>
        {
                return {
                        addToParent: parent =>
                        {
                                var text = item.nodeValue.trim ();
                                if (text.length == 0)
                                        return null;

                                return b.callExpression (
                                        b.memberExpression (
                                                parent,
                                                b.identifier ('append'),
                                                false),
                                        [b.literal (text)]);
                        }
                };
        }
};
