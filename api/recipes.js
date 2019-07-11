import fs from 'fs';
import uuid from 'uuid/v1';

export const saveRecipe = async (args) => {
    let file = [];
    try {
        file = JSON.parse(fs.readFileSync('./data/recipes.json'));
    } catch(e) {
        console.log('File was empty or corrupt', e);
    }

    file.push({
        ...args,
        id: uuid(),
    });

    await fs.writeFile('./data/recipes.json', JSON.stringify(file, null, 2), async (err) => {
        if (err) throw err;
        console.log('Recipe was saved.');
    });
    return args;
}

export const loadRecipes = () => {
    try {
        return JSON.parse(fs.readFileSync('./data/recipes.json'));
    } catch(e) {
        console.log('File was empty or corrupt', e);
        return [];
    }
}