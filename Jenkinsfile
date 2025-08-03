pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        EC2_IP = '192.168.70.136'
        SSH_CRED = 'git-ssh-cred'
        REPO = 'git@github.com:Gaurav1517/portfolio-react-app.git'
        APP_DIR = '/home/sysops/portfolio-app'
    }

    stages {
        stage('Pull React App on EC2') {
            steps {
                script {
                    executeSSH("""
                        if [ ! -d "${APP_DIR}" ]; then
                            git clone ${REPO} ${APP_DIR}
                        else
                            cd ${APP_DIR} && git pull origin main
                        fi
                    """)
                }
            }
        }

        stage('Install Node.js and PM2') {
            steps {
                script {
                    executeSSH("""
                        # Install Node.js if not already installed.
                        if ! command -v npm > /dev/null 2>&1; then
                            cd /tmp &&
                            wget -q https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-x64.tar.xz &&
                            tar -xf node-v23.11.1-linux-x64.tar.xz &&
                            sudo mv node-v23.11.1-linux-x64 /usr/local/node &&
                            sudo ln -sf /usr/local/node/bin/node /usr/local/bin/node &&
                            sudo ln -sf /usr/local/node/bin/npm /usr/local/bin/npm
                        fi

                        # Install PM2 globally if not available
                        if ! command -v pm2 > /dev/null 2>&1; then
                            npm install -g pm2 >> /dev/null 2>&1
                            sudo ln -sf /usr/local/node/bin/pm2 /usr/local/bin/pm2
                        fi
                        
                        # Install serve globally if not available
                        if ! command -v serve > /dev/null 2>&1; then
                            npm install -g serve >> /dev/null 2>&1
                            sudo ln -sf /usr/local/node/bin/serve /usr/local/bin/serve
                        fi
                    """)
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    executeSSH("""
                        cd ${APP_DIR} &&
                        npm install >> /dev/null &&
                        npm run build
                    """)
                }
            }
        }

        stage('Start App with PM2') {
            steps {
                script {
                    executeSSH("""
                        cd ${APP_DIR} &&
                        pm2 delete portfolio || true &&
                        pm2 start serve --name "portfolio" -- -s build -l tcp://0.0.0.0:3000
                    """)
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

def executeSSH(String command) {
    sshagent(credentials: [SSH_CRED]) {
        sh """
            ssh -o StrictHostKeyChecking=no sysops@${EC2_IP} '
                ${command}
            '
        """
    }
}

