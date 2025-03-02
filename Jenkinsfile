pipeline {
    agent any 

    environment {
        NODEJS_HOME = tool 'NodeJS' // Define Node.js tool in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/technosmart1997/jenkins-node.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run dev'
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'staging'
            }
            steps {
                sh 'echo Deploying to Staging'
                // Add your deployment commands here
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'prod'
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
