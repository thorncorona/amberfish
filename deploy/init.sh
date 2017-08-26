#/bin/sh

#load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export MONGO_URL="mongodb://localhost:27017/amberfish"
export ROOT_URL="https://amberfish.storied.me"
export MAIL_URL="smtp://dev@storied.me:storiedme@mail.storied.me:587" 
#prod
export MAIL_URL="smtp://SMTP_Injection:1b23afae4b1e188ae9d0357f3732a293e88adb3a@smtp.sparkpostmail.com:2525"
export PORT="3005"
cd ~/bundle
nvm use 4.8.4 
node main.js

#1b23afae4b1e188ae9d0357f3732a293e88adb3a
