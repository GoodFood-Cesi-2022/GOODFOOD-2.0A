pipeline {

    agent any

    tools {
      nodejs 'npm'
      }

    stages {
        stage('install') {
          steps {
            sh 'npm install'
          }
        }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Quality') {
      steps {
        withSonarQubeEnv(installationName: 'CodeQuality') {
        }
      }
    }
  }
}
