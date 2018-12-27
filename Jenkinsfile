node {
    checkout scm
    def customImage = docker.build("my-image:${env.BUILD_ID}")   
    sh "docker run -d -p 3336:3000 --name my-container my-image:${env.BUILD_ID}"
}