pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout') { 
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Dev Server') {
            steps {
                script {
                    def devProcess = sh(script: 'npm run dev & echo $!', returnStdout: true).trim()
                    sleep(10)  // Wait for a few seconds to ensure the server starts
                    def isRunning = sh(script: "ps -p ${devProcess} > /dev/null && echo 'running' || echo 'not running'", returnStdout: true).trim()
                    
                    if (isRunning == 'running') {
                        echo "Dev server is running successfully."
                        sh "kill ${devProcess}" // Stop the process after verification
                    } else {
                        error "Dev server failed to start."
                    }
                }
            }
        }
    }
}
