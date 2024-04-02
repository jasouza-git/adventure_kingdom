rm -r out/*
tsc src/game.ts --target es5 --module es6 --moduleResolution node --strict --removeComments  > /dev/null 2>&1
cat src/entities.js | head -n -1 > out/script_tmp.js
cat src/engine.js | tail -n +13 | head -n -1 >> out/script_tmp.js
cat src/game.js | tail -n +2 >> out/script_tmp.js
cat out/script_tmp.js | sed -r 's/__assign\(__assign\(\{\}, ([^)]*)\), ([^)]*)\);/{...\1, ...\2}/' > out/script.js
rm out/script_tmp.js
rm src/*.js
cp -rp asset out/asset
cp -p src/index.html src/style.css out