pipeline {
  
  agent any
  
  stages {
    
    stage("install") {
      
      steps {
        sh 'npm install'
        echo 'installing the application ...'
      }
      
    }
    
    stage("test") {
      
      steps {
        echo 'testing the application ...'
      }
      
    }
    
    stage("build") {
      
      steps {
        sh 'npm build'
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

