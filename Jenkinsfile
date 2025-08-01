pipeline { 
  agent any 
  triggers { 
    githubPush() 
  } 
  environment { 
    EC2_IP = '192.168.70.134'  // Replace with your EC2 public IP
    SSH_CRED = 'git-ssh-cred'  // Jenkins SSH credential ID
    REPO = 'git@github.com:Gaurav1517/portfolio-react-app.git'  // Your React portfolio Git repo
    APP_DIR = '/home/sysops/portfolio-app'  // Target directory on EC2
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
            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
              if [ ! -d "${APP_DIR}" ]; then
                git clone ${REPO} ${APP_DIR}
              else
                cd ${APP_DIR} && git pull origin main  # Pull latest changes if the repo already exists
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
            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
              cd ${APP_DIR} &&
              if ! command -v pm2 &> /dev/null; then
                npm install -g pm2  # Ensure pm2 is installed globally
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
            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
              cd ${APP_DIR} &&
              pm2 stop portfolio || true &&  # Stop the app if it's running
              pm2 start npm --name "portfolio" -- start
            '
          """ 
        } 
      } 
    } 
  }
}

