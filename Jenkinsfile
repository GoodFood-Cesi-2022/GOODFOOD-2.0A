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

