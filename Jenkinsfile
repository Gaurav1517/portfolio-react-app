pipeline {
  agent any
  triggers {
    githubPush()  // Triggered by GitHub push events
  }
  tools {
    nodejs 'nodejs23'  // Use Jenkins tool configuration for NodeJS
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

    stage('Install Dependencies and Build React App') {
      steps {
        sshagent(credentials: [SSH_CRED]) {
          sh """
            ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
              cd ${APP_DIR} &&
              if ! command -v pm2 &> /dev/null; then
                npm install -g pm2  # Install pm2 globally if not already installed
              fi
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
