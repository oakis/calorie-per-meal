import fs from 'fs';

export const saveFile = async (args) => {
    let file = [];
    try {
        file = JSON.parse(fs.readFileSync('./data/recipes.json'));
    } catch(e) {
        console.log('File was empty or corrupt', e);
    }

    file.push(args);

    await fs.writeFile('./data/recipes.json', JSON.stringify(file, null, 2), async (err) => {
        if (err) throw err;
        console.log('Recipe was saved.');
    });
    return args;
}