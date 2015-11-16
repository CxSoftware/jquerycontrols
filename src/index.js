var fs = require ('fs-promise');
require ('traceur');

var Reader = require ('./read/reader');
var Writer = require ('./write/writer');

var config = {
        transformers: [
                require ('./transformers/element/property'),
                require ('./transformers/element/event'),
                require ('./transformers/element/default'),
                require ('./transformers/text/default'),
                require ('./transformers/attribute/alias'),
                require ('./transformers/attribute/class'),
                require ('./transformers/attribute/localAlias'),
                require ('./transformers/attribute/visible'),
                require ('./transformers/attribute/default')
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
