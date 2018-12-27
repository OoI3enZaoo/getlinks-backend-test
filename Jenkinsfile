pipeline {
    agent { dockerfile true }
    stages {        
        stage('Deploy') {
          steps {
            sh 'docker rmi backend-image -f'
            sh 'docker rm backend-container -f'
            sh 'docker run -d -p 3334:3000 --name backend-contaier'
          }
        }
    }
}