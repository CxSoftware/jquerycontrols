var Enumerable = require ('linq');
var xmldom = require ('xmldom');
var parser = new xmldom.DOMParser ();

module.exports = transformers =>
{
        var findTransformer = (itemType, name) =>
        {
                var found = Enumerable.from (transformers)
                        .where (x => x.itemType == itemType)
                        .where (x => !x.itemName || x.itemName.test (name))
                        .firstOrDefault ();
                if (found == null)
                        throw Error ("Transformer not found for type: "
                                + itemType + " and name " + name);
                return found;
        };

        var readItem = (item, level) =>
        {
                var transformer = findTransformer (
                        item.constructor.name, item.localName);

                if (transformer.firstLevel && level != 1)
                        throw Error (
                                "Transformer requires item to be on the first level: " +
                                item.constructor.name + " " + item.localName);

                if (transformer.init == null)
                        return null;

                var childNodes = item.childNodes ?
                        Enumerable.from (item.childNodes)
                        .select (x => readItem (x, level + 1))
                        .where (x => x != null)
                        : Enumerable.empty ();

                var childAttributes = item.attributes ?
                        Enumerable.from (item.attributes)
                        .select (x => readItem (x, level + 1))
                        .where (x => x != null)
                        : Enumerable.empty ();

                return {
                        transformer: transformer.init (item),
                        childs:
                                childNodes
                                .concat (childAttributes)
                                .toArray ()
                };
        }

        return {
                read: content => readItem (
                        parser.parseFromString (content, 'text/xml')
                                .documentElement,
                        0)
        };
};
