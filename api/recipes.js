import fs from 'fs';

export const saveFile = async (req, res) => {
    let file = [];
    try {
        file = JSON.parse(await fs.readFileSync('./data/recipes.json'));
    } catch(e) {
        console.log('File was empty or corrupt', e);
    }

    file.push(req.body);

    fs.writeFile('./data/recipes.json', JSON.stringify(file, null, 2), (err) => {
        if (err) return res.status(500).json({ message: err });
        console.log('Recipe was saved.');
        return res.status(200).json({ message: 'OK' });
    });
}