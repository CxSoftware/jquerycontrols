var fs = require ('fs-promise');
require ('traceur');

var Reader = require ('./read/reader');
var Writer = require ('./write/writer');

var config = {
        transformers: [
                require ('./transformers/element/propertyTransformer'),
                require ('./transformers/element/eventTransformer'),
                require ('./transformers/element/defaultTransformer'),
                require ('./transformers/text/transformer'),
                require ('./transformers/attribute/classTransformer'),
                require ('./transformers/attribute/localIDTransformer'),
                require ('./transformers/attribute/defaultTransformer')
        ]
};

module.exports = () =>
{
        return {
                config: config,
                run: async (source, destination) =>
                {
                        try
                        {
                                var reader = new Reader (config.transformers);
                                var writer = new Writer ();
                                var controls = await reader.readDirectory (source);
                                var destinationStat = await fs.stat (destination);
                                if (!destinationStat.isDirectory())
                                        throw Error ("Destination is not a directory: " + Destination);
                                await writer.writeBundle (controls, destination);
                        }
                        catch (e)
                        {
                                console.log ('Error', e, e.stack);
                        }
                }
        };
};
