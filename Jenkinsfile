pipeline{
    agent any
    environment{
        GIT_REPO="https://github.com/Rishavkapil/JenkinsPipelineSetup.git"
        BRANCH="main"
        AWS_ACCOUNT_ID="124355654427"
        AWS_DEFAULT_REGION="ap-south-1"
        IMAGE_REPO_NAME="rishav-demo-jenkinspipeline"
        IMAGE_TAG="latest"
        REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }
    stages{
        stage("Clone Github Repo"){
        steps{
            git branch: "${BRANCH}",url: "${GIT_REPO}"
        }
    }
    stage("Build Docker image"){
        steps{
            script{
                sh "docker build -t ${IMAGE_REPO_NAME} ."
                
            }
        }
    }
    stage("Logging into AWS ECR"){
        steps{
            script{
                sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
            }
        }
    }
    stage("Pushing to ecr"){
        steps{
            script{
                sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:${IMAGE_TAG}"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
            }
        }
    }
    }
    
}
