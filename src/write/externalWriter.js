function* getExternal (node)
{
        if (node.childs && node.childs.length > 0)
                for (let childNode of node.childs)
                        for (let external of getExternal (childNode))
                                yield external;

        if (node.transformer.createExternal)
                for (let expression of node.transformer.createExternal ())
                        yield expression;
};

module.exports = dom =>
{
        return {
                write: () => Array.from (getExternal (dom))
        };
};
