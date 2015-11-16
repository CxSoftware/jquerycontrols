var DomReader = require ('./domReader');
var fs = require ('fs-promise');
var esprima = require ('esprima');
var path = require ('path');

module.exports = transformers =>
{
        var domReader = new DomReader (transformers);

        var read = async (jcFilePath, jsFilePath) =>
        {
                return {
                        name: path.basename (jcFilePath, '.jc'),
                        script: jsFilePath ?
                                esprima.parse (await fs.readFile (jsFilePath, 'utf-8')) : null,
                        dom: domReader.read (await fs.readFile (jcFilePath, 'utf-8'))
                };
        };

        return {
                read: read,
                readDirectory: async directoryPath =>
                {
                        var list = await fs.readdir (directoryPath);
                        var result = [];
                        for (let item of list)
                        {
                                if (!/\.jc$/.test (item))
                                        continue;
                                var jcFilePath = path.join (directoryPath, item);
                                var jsFileName = item.substring (0, item.length - 3) + '.js';
                                var jsFilePath = list.indexOf (jsFileName) >= 0 ?
                                        path.join (directoryPath, jsFileName) : null;

                                result.push (await read (jcFilePath, jsFilePath));
                        }

                        return result;
                }
        };
};
