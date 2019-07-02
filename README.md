## GraphQL learning project

A meal calorie calculator for learning purposes.

### Prerequisites
* webpack-cli `yarn global add webpack-cli`

### Install the project

```
git clone https://github.com/oakis/calorie-per-meal.git
cd calorie-per-meal
```

To install dependencies run:
```
yarn
```

Fetch the foods and nutrition XML from Livsmedelsverket and convert to JSON:
```
yarn fetch-data
```

Run the backend:
```
yarn start
```

Run the frontend:
```
webpack-cli -w -d
```
