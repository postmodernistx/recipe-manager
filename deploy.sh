#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build-github

# navigate into the build output directory
cd docs

# remove existing git directory
rm -rf .git

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init

# Ignore all recipes except for sample recipes
touch .gitignore
echo "src/data/recipes/**.json" >> .gitignore
echo ""!src/data/recipes/recipe.example.json"" >> .gitignore

git add -A -f
git commit -m 'deploy'

git fetch

git branch -m live

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# add remote
git remote add recipe-manager git@github.com:postmodernistx/recipe-manager.git

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:postmodernistx/recipe-manager.git live

cd -
