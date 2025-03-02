pipeline {
    agent any 

    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${env.BRANCH_NAME}", url: 'https://github.com/technosmart1997/jenkins-node.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'  // Ensure it's a command that completes
            }
        }

        stage('Deploy to Staging') {
            when {
                expression { env.BRANCH_NAME == 'staging' }
            }
            steps {
                sh 'echo Deploying to Staging'
                // Add your deployment commands
            }
        }

        stage('Deploy to Production') {
            when {
                expression { env.BRANCH_NAME == 'prod' }
            }
            steps {
                sh 'echo Deploying to Production'
                // Add production deployment commands
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
