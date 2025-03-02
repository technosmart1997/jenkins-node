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
    }
}