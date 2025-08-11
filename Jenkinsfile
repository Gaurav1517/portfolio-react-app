pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        EC2_IP = '3.87.248.24'
        SSH_CRED = 'git-ssh-key'
        REPO = 'git@github.com:Gaurav1517/portfolio-react-app.git'
        APP_DIR = '/home/ubuntu/portfolio'
        DEPLOY_DIR = '/var/www/html/portfolio'
        APP_NAME="portfolio"
    }

    stages {
        stage('Pull Frontend Repo on EC2') { 
            steps { 
                sshagent (credentials: ["${SSH_CRED}"]) { 
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                            if [ ! -d "${APP_DIR}" ]; then
                                git clone ${REPO} ${APP_DIR}
                            else
                                rm -rf ${APP_DIR}
                                git clone ${REPO} ${APP_DIR}
                            fi
                        '
                    """
                } 
            } 
        }
        
        stage('Build React App') {
            steps {
                script {
                    sshagent (credentials: ["${SSH_CRED}"]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                        cd ${APP_DIR} &&
                        npm install >> /dev/null &&
                        npm run build
                        '
                        """
                    }
                }
            }
        }

        stage('Deploy with PM2 and NGINX') {
            steps {
                script {
                    sshagent (credentials: ["${SSH_CRED}"]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                            # Ensure deploy directory exists
                            sudo mkdir -p "$DEPLOY_DIR"
        
                            # Clear old build files
                            if [ -d "$DEPLOY_DIR" ]; then
                                echo "Removing old files in $DEPLOY_DIR..."
                                sudo rm -rf "${DEPLOY_DIR}/"*
                            else
                                echo "Error: $DEPLOY_DIR is empty! Exiting."
                                exit 1  
                            fi

        
                            # Copy new build files
                            sudo  cp -r ${APP_DIR}/build/* "$DEPLOY_DIR"
        
                            # Set proper permissions
                            sudo chown -R www-data:www-data "$DEPLOY_DIR"
                            sudo chmod -R 755 "$DEPLOY_DIR"
        
                            # Restart app with PM2 on localhost:3000
                            pm2 delete "$APP_NAME" || true
                            pm2 start serve --name "$APP_NAME" -- -s "$DEPLOY_DIR" -l 3000
        
                            # Save PM2 process list
                            pm2 save
        
                            # Reload NGINX to ensure reverse proxy stays in sync
                            sudo systemctl reload nginx
                                 '
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Pipeline completed successfully!"
            }
        }
        failure {
            script {
                echo "Pipeline failed!"
            }
        }
    }
}

// pipeline {
//     agent any

//     triggers {
//         githubPush()
//     }

//     environment {
//         EC2_IP = '192.168.70.136'
//         SSH_CRED = 'git-ssh-cred'
//         REPO = 'git@github.com:Gaurav1517/portfolio-react-app.git'
//         APP_DIR = '/home/sysops/portfolio-app'
//     }

//     stages {
//         stage('Pull React App on EC2') {
//             steps {
//                 script {
//                     executeSSH("""
//                         if [ ! -d "${APP_DIR}" ]; then
//                             git clone ${REPO} ${APP_DIR}
//                         else
//                             cd ${APP_DIR} && git pull origin main
//                         fi
//                     """)
//                 }
//             }
//         }

//         stage('Install Node.js and PM2') {
//             steps {
//                 script {
//                     executeSSH("""
//                         # Install Node.js if not already installed
//                         if ! command -v npm > /dev/null 2>&1; then
//                             cd /tmp &&
//                             wget -q https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-x64.tar.xz &&
//                             tar -xf node-v23.11.1-linux-x64.tar.xz &&
//                             sudo mv node-v23.11.1-linux-x64 /usr/local/node &&
//                             sudo ln -sf /usr/local/node/bin/node /usr/local/bin/node &&
//                             sudo ln -sf /usr/local/node/bin/npm /usr/local/bin/npm
//                         fi

//                         # Install PM2 globally if not available
//                         if ! command -v pm2 > /dev/null 2>&1; then
//                             npm install -g pm2 >> /dev/null 2>&1
//                             sudo ln -sf /usr/local/node/bin/pm2 /usr/local/bin/pm2
//                         fi
                        
//                         # Install serve globally if not available
//                         if ! command -v serve > /dev/null 2>&1; then
//                             npm install -g serve >> /dev/null 2>&1
//                             sudo ln -sf /usr/local/node/bin/serve /usr/local/bin/serve
//                         fi
//                     """)
//                 }
//             }
//         }

//         stage('Build React App') {
//             steps {
//                 script {
//                     executeSSH("""
//                         cd ${APP_DIR} &&
//                         npm install >> /dev/null &&
//                         npm run build
//                     """)
//                 }
//             }
//         }

//         stage('Start App with PM2') {
//             steps {
//                 script {
//                     executeSSH("""
//                         cd ${APP_DIR} &&
//                         pm2 delete portfolio || true &&
//                         pm2 start serve --name "portfolio" -- -s build -l tcp://0.0.0.0:3000
//                     """)
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             script {
//                 echo "Pipeline completed successfully!"
//             }
//         }
//         failure {
//             script {
//                 echo "Pipeline failed!"
//             }
//         }
//     }
// }

// def executeSSH(String command) {
//     sshagent(credentials: [SSH_CRED]) {
//         sh """
//             ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
//                 ${command}
//             '
//         """
//     }
// }



// pipeline {
//   agent any
//   triggers {
//     githubPush()  // Triggered by GitHub push events
//   }
//   environment {
//     EC2_IP = '192.168.70.134'  // IP of your VM or EC2 instance
//     SSH_CRED = 'git-ssh-cred'   // The Jenkins credential ID for SSH key
//     REPO = 'git@github.com:Gaurav1517/portfolio-react-app.git'  // React repo
//     APP_DIR = '/home/sysops/portfolio-app'  // Target directory on your EC2/VM
//   }
//   stages {
//     stage('Trigger Received') {
//       steps {
//         echo 'GitHub Push Triggered. Starting React Portfolio Deployment Pipeline...'
//       }
//     }

//     stage('Pull React App on EC2') {
//       steps {
//         sshagent(credentials: [SSH_CRED]) {
//           sh """
//             ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
//               if [ ! -d "${APP_DIR}" ]; then
//                 git clone ${REPO} ${APP_DIR}
//               else
//                 cd ${APP_DIR} && git pull origin main  # Pull latest changes if repo exists
//               fi
//             '
//           """
//         }
//       }
//     }

//     stage('Install Dependencies and Build React App') {
//       steps {
//         sshagent(credentials: [SSH_CRED]) {
//           sh """
//             ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
//               cd ${APP_DIR} &&
//               if ! command -v pm2 &> /dev/null; then
//                 npm install -g pm2  # Install pm2 globally if not already installed
//               fi
//               npm install &&
//               npm run build
//             '
//           """
//         }
//       }
//     }

//     stage('Start App with PM2') {
//       steps {
//         sshagent(credentials: [SSH_CRED]) {
//           sh """
//             ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
//               cd ${APP_DIR} &&
//               pm2 stop portfolio || true &&  # Stop the app if running
//               pm2 start npm --name "portfolio" -- start
//             '
//           """
//         }
//       }
//     }
//   }
// }