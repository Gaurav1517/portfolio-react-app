pipeline {
  agent any
  triggers {
    githubPush()  // Triggered by GitHub push events
  }
  tools {
    nodejs 'nodejs22'  // Use Jenkins tool configuration for NodeJS22
  }
  environment {
    EC2_IP = '192.168.70.134'  // IP of your VM or EC2 instance
    SSH_CRED = 'git-ssh-cred'   // The Jenkins credential ID for SSH key
    REPO = 'git@github.com:Gaurav1517/portfolio-react-app.git'  // React repo
    APP_DIR = '/home/sysops/portfolio-app'  // Target directory on your EC2/VM
  }
  stages {
    stage('Trigger Received') {
      steps {
        echo 'GitHub Push Triggered. Starting React Portfolio Deployment Pipeline...'
      }
    }

    stage('Pull React App on EC2') {
      steps {
        sshagent(credentials: [SSH_CRED]) {
          sh """
            ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
              if [ ! -d "${APP_DIR}" ]; then
                git clone ${REPO} ${APP_DIR}
              else
                cd ${APP_DIR} && git pull origin main  # Pull latest changes if repo exists
              fi
            '
          """
        }
      }
    }

    stage('Install Node.js and Build React App') {
      steps {
        sshagent(credentials: [SSH_CRED]) {
          sh """
            ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
              # Install Node.js v23.11.1
              cd /tmp &&
              wget https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-x64.tar.xz &&
              tar -xvf node-v23.11.1-linux-x64.tar.xz &&
              sudo mv node-v23.11.1-linux-x64 /usr/local/node &&
              sudo ln -s /usr/local/node/bin/node /usr/local/bin/node &&
              sudo ln -s /usr/local/node/bin/npm /usr/local/bin/npm &&
              node -v && npm -v

              # Install pm2 globally
              npm install -g pm2 &&
              
              # Print NPM global bin path and check if PM2 exists
              echo "NPM global bin path: $(npm bin -g)" &&
              which pm2 &&
              pm2 -v

              # Install app dependencies and build the app
              cd ${APP_DIR} &&
              npm install &&
              npm run build
            '
          """
        }
      }
    }

    stage('Start App with PM2') {
      steps {
        sshagent(credentials: [SSH_CRED]) {
          sh """
            ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
              cd ${APP_DIR} &&
              # Print PM2 status before starting
              pm2 status &&
              # Stop the app if already running and start with PM2
              pm2 stop portfolio || true &&  # Stop the app if running
              pm2 start npm --name "portfolio" -- start
            '
          """
        }
      }
    }
  }
}
