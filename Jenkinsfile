pipeline {
  
  agent any
  
  stages {
    
    stage("install") {
      
      steps {
        echo 'installing the application ...'
      } 
    }
    
    stage("test") {
      
      agent {
     
        //docker { 
          //image 'node:latest' 
        //}
      }
      
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

