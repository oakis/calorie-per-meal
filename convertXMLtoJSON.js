const fs = require('fs');
const convert = require('xml-js');

const xmlPath = `${__dirname}/data/foods.xml`;
const jsonPath = `${__dirname}/data/foods.json`;

const convertXMLtoJSON = async () => {
    console.log('Start reading XML file..');
    const xmlString = await fs.readFileSync(xmlPath);
    console.log('Finished reading XML file!');
    console.log('Start converting XML to JSON..');
    const jsonString = convert.xml2json(xmlString, { compact: true, ignoreDeclaration: true, spaces: 2, ignoreAttributes: true });
    console.log('Finished converting XML to JSON!');
    const jsonParsed = JSON.parse(jsonString).LivsmedelDataset.LivsmedelsLista.Livsmedel;
    const jsonFormatted = jsonParsed.map(obj => {
        const nutrition = obj.Naringsvarden.Naringsvarde;
        return {
            number: obj.Nummer._text,
            name: obj.Namn._text,
            weight: obj.ViktGram._text,
            group: obj.Huvudgrupp._text,
            nutrition: nutrition.map(obj => ({
                name: obj.Namn._text,
                value: obj.Varde._text,
                unit: obj.Enhet._text,
            }))
        }
    });
    console.log('Start writing json to file..');
    fs.writeFileSync(jsonPath, JSON.stringify(jsonFormatted));
    console.log('Finished writing json to file!');
};

convertXMLtoJSON();
