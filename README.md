Project transfered to https://codeberg.org/yomli/vanille

# Vanille
Just another VanillaJS framework for personal purpose. I use `_loader.js` to list all the files I need. Then, when everything works, I simply execute `build.sh` or `cat file1.js file2.js >> vanille.js` to get a production version. Will write more about all of this later.

## Usage of ES6 `for … of`

We could use `forEach` or even `map` instead of the `for … of` loops. But performance-wise, those loops are 2 to 3 times faster: <https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/>
