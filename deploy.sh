echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build 

echo "Deploying files to server..."
scp -r build/* server@188.25.10.129:/var/www/188.25.10.129

echo "Done!"