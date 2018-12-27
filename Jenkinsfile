pipeline {
    agent { dockerfile true }
    stages {
        stage('Build image') {
            steps {              
                app = docker.build('backend-image')
            }
        }
        stage('Deploy') {
          sh 'docker rmi backend-image -f'
          sh 'docker rm backend-container -f'
          sh 'docker run -d -p 3334:3000 --name backend-contaier'          
        }
    }
}