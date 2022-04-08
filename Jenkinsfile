pipeline {

    agent any

    tools {
      nodejs 'npm'
      }

    stages {
        stage('version') {
          steps {
            echo 'node version'
            sh 'node --version'
            echo 'angular version'
            sh 'ng --version'
          }
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
