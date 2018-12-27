pipeline {
    agent { dockerfile true }
    stages {
        stage('Build image') {
            steps {              
                sh 'docker build -t backend-image .'
            }
        }
        stage('Deploy') {
          steps {
            sh 'docker rmi backend-image -f'
            sh 'docker rm backend-container -f'
            sh 'docker run -d -p 3334:3000 --name backend-contaier'
          }
        }
    }
}