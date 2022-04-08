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
        sh 'npm build'
      }
    }

    stage('Quality') {
      environment {
        scannerHome = tool 'SonarQubeScanner'
      }
      steps {
        withSonarQubeEnv(installationName: 'CodeQuality') {
        }
      }
    }
  }
}
