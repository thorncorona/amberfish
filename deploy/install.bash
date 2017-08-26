#!/bin/sh

# update repositories
sudo apt-get update -y
sudo apt-get upgrade -y

#install nvm and node and npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

#load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install node 
nvm install 4.8.4

nvm use 4.8.4
sudo apt-get install g++ gcc make build-essential gyp -y

#install mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install mongodb-org -y
sudo systemctl start mongod
sudo systemctl enable mongod

#install apache2
sudo apt-get install apache2 -y
sudo systemctl enable apache2
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo service apache2 restart
sudo chmod -R 755 /var/www
sudo a2dissite 000-default.conf   

#install certbot
sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt-get update
sudo apt-get install python-certbot-apache -y

#configure html directories
sudo mv ~/amberfish.storied.me.conf /etc/apache2/sites-available/amberfish.storied.me.conf
sudo a2ensite amberfish.storied.me.conf
sudo service apache2 restart
#mkdir -p /var/www/amberfish.storied.me

#install amberfish
tar -xzf amberfish*
cd bundle/programs/server
export METEOR_SKIP_NPM_REBUILD=1
sudo apt-get install gcc make python g++ build-essential
npm install meteor-promise fibers promise underscore node-gyp node-pre-gyp bcrypt -y
npm install -y
cd ~
sudo mkdir -p /var/www/amberfish.storied.me/public_html 
sudo chown -R $USER:$USER /var/www/amberfish.storied.me/public_html

#install clovertale
npm install -g bower grunt-cli 
sudo apt-get install ruby ruby-dev -y
sudo gem install sass
