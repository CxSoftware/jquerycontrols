var writeNode = (node, parent) =>
{
        if (!node.transformer.addToParent)
                return parent;

        var htmlElement = node.transformer.createHtmlElement ?
                node.transformer.createHtmlElement () :
                null;

        if (node.childs && node.childs.length > 0)
                for (let childNode of node.childs)
                        htmlElement = writeNode (childNode, htmlElement);

        if (!parent) return htmlElement;
        return node.transformer.addToParent (parent, htmlElement) || parent;
};

module.exports = dom =>
{
        return {
                write: () => writeNode (dom)
        };
};
