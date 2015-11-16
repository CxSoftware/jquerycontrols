var escodegen = require ('escodegen');
var fs = require ('fs-promise');
var path = require ('path');
var DomWriter = require ('./domWriter');
var ExternalWriter = require ('./externalWriter');

var b = require("ast-types").builders;

var write = async (control, outputDirectory) =>
{
        var controlBlockParts = [];

        // Declare control alias
        controlBlockParts.push (b.variableDeclaration (
                "var", [
                        b.variableDeclarator (
                                b.identifier ("control"),
                                b.thisExpression ())
                ]));

        // Create root element
        var domWriter = new DomWriter (control.dom);
        controlBlockParts.push (b.assignmentStatement (
                '=',
                b.memberExpression (
                        b.thisExpression (),
                        b.identifier("root"),
                        false),
                domWriter.write ()));

        // Create external code
        var externalWriter = new ExternalWriter (control.dom);
        for (let external of externalWriter.write ())
                controlBlockParts.push (external);

        // Add script
        if (control.script)
                for (let bodyPart of control.script.body)
                        controlBlockParts.push (bodyPart);

        // Create main function
        var controlFunction = b.functionDeclaration (
                b.identifier (control.name),
                [],
                b.blockStatement (controlBlockParts));

        // Write
        var fileName = control.name + '.js';
        var filePath = path.join (outputDirectory, fileName);
        await fs.writeFile (
                filePath,
                escodegen.generate (controlFunction));
};

module.exports = () =>
{
        return {
                write: write,
                writeBundle: async (controls, outputDirectory) =>
                {
                        for (let control of controls)
                                await write (control, outputDirectory);
                }
        };
};
