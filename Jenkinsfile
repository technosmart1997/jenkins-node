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

       stage('Test Project') {
            steps {
                sh 'npm run test'
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
                    echo "Starting dev server..."
                    
                    // Start the dev server in the background
                    sh 'nohup npm run dev > dev.log 2>&1 & echo $! > dev.pid'

                    sleep(10) // Give some time for the server to start
                    
                    // Check if the process is still running
                    def devProcess = sh(script: "cat dev.pid", returnStdout: true).trim()
                    def isRunning = sh(script: "ps -p ${devProcess} > /dev/null && echo 'running' || echo 'not running'", returnStdout: true).trim()
                    
                    if (isRunning == 'running') {
                        echo "Dev server is running successfully."
                        sh "kill ${devProcess}" // Stop the process
                    } else {
                        error "Dev server failed to start."
                    }
                }
            }
        }
    }
}
