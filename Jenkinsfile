pipeline {
  
  agent any
  
  tools {
    // add here php version
    nodejs "NodeJs 16.13.0"
  }

  stages {
    
    stage("install") {
      
      steps {
        echo 'installing the application ...'
      } 
    }
    
    stage("test") {
      
      steps {
        echo 'testing the application ...'
      }
    }
    node {
      stage('SCM') {
        git 'https://github.com/foo/bar.git'
      }
      stage('SonarQube analysis') {
        def scannerHome = tool 'SonarScanner 4.0';
        withSonarQubeEnv('My SonarQube Server') { // If you have configured more than one global server connection, you can specify its name
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Scan') {
      steps {
        withSonarQubeEnv(installationName: 'SonarQube') {
          // sh''
        }
      }
    }
    stage("build") {
      
      steps {
        //sh 'npm build'
        echo 'building the application ...'
      }
    }
    
    stage("deploy") {
      
      steps {
        echo 'deploying the application ...'
      }
    }
    
  }
  
}

