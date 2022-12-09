pipeline {
    parameters {
        string(name: 'PRODUCTION_NAMESPACE',       description: 'Production Namespace',     defaultValue: '')
        string(name: 'STAGING_NAMESPACE',          description: 'Staging Namespace',        defaultValue: '')
        string(name: 'DEVELOPMENT_NAMESPACE',      description: 'Development Namespace',    defaultValue: '')

        string(name: 'DOCKER_DEV_REGISTRY_URL',    description: 'docker registry',          defaultValue: 'docker-registry-default.apps.playcourt.id')
        string(name: 'DOCKER_STAGING_REGISTRY_URL',description: 'docker registry',          defaultValue: 'docker-registry-default.apps.playcourt.id')
        string(name: 'DOCKER_PROD_REGISTRY_URL',   description: 'docker registry',          defaultValue: 'docker-registry-default.vsan-apps.playcourt.id')

        string(name: 'DOCKER_IMAGE_NAME',          description: 'Docker Image Name',        defaultValue: '')
    }
    agent none
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout SCM') {
            agent { label "jenkins-agent-nodejs-1" }
            steps {
                checkout scm
                script {
                    echo "get COMMIT_ID"
                    sh 'echo -n $(git rev-parse --short HEAD) > ./commit-id'
                    commitId = readFile('./commit-id')
                }
                stash(name: 'ws', includes:'**,./commit-id')
            }
        }

        stage('Initialize') {
            parallel {
                stage("Agent: nodejs") {
                    agent { label "jenkins-agent-nodejs-1" }
                    steps {
                        cleanWs()
                    }
                }
                stage("Agent: Docker") {
                    agent { label "jenkins-agent-docker-1" }
                    steps {
                        cleanWs()
                    }
                }
            }
        }

        stage('Unit Test') {
            agent { label "jenkins-agent-nodejs-1" }
            steps {
                unstash 'ws'
                echo "Do Unit Test Here"
            }    
        }

        stage('SonarQube Scan') {
            when {
                anyOf {
                    branch 'master'
                    branch 'release'
                    branch 'develop'
                }
            }
            agent { label "jenkins-agent-nodejs-1" }
            steps {
                unstash 'ws'
                echo "Run SonarQube"
                script {
                    echo "defining sonar-scanner"
                    def scannerHome = tool 'SonarQube Scanner' ;
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Build') {
            parallel {
                stage('Build DEV') {
                    when {
                        branch 'develop'
                    }
                    agent { label "jenkins-agent-docker-1" }
                    steps {
                        unstash 'ws'
                        script {
                            echo "get COMMIT_ID"
                            commitId = readFile('./commit-id')
                        }
                        sh 'rm -rf ./commit-id'
                        sh "docker build --rm -t '${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:dev-${BUILD_NUMBER}-${commitId}' ."       
                    }
                }
                stage('Build STAGING') {
                    when {
                        branch 'release'
                    }
                    agent { label "jenkins-agent-docker-1" }
                    steps {
                        unstash 'ws'
                        script {
                            echo "get COMMIT_ID"
                            commitId = readFile('./commit-id')
                        }
                        sh 'rm -rf ./commit-id'
                        sh "docker build --rm -t '${params.STAGING_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:staging-${BUILD_NUMBER}-${commitId}' ."
                    }
                }
                stage('Build PROD') {
                    when {
                        branch 'master'
                    }
                    agent { label "jenkins-agent-docker-1" }
                    steps {
                        unstash 'ws'
                        script {
                            echo "get COMMIT_ID"
                            commitId = readFile('./commit-id')
                        }
                        sh 'rm -rf ./commit-id'
                        sh "docker build --rm -t '${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}' ."
                    }
                }
                stage('Build Default') {
                    when {
                        not {
                            anyOf {
                                branch 'master'
                                branch 'release'
                                branch 'develop'
                            }
                        }
                    }
                    agent { label "jenkins-agent-docker-1" }
                    steps {
                        unstash 'ws'
                        script {
                            echo "get COMMIT_ID"
                            commitId = readFile('./commit-id')
                        }
                        sh 'rm -rf ./commit-id'
                        sh "docker build --rm -t '${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId}' ."
                        sh "docker rmi -f ${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId}"
                    }
                }
            }
        }

        stage('Deploy to DEV') {
            environment {
                KUBE_DEV_TOKEN = credentials('OC_REGISTRY_TOKEN')
            }
            when {
                branch 'develop'
            }
            agent { label "jenkins-agent-docker-1" }
            steps {
                echo "Deploy to DEV"
                unstash 'ws'
                script {
                    echo "get COMMIT_ID"
                    commitId = readFile('./commit-id')
                }
                sh 'rm -rf ./commit-id'
                sh "docker tag '${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:dev-${BUILD_NUMBER}-${commitId}' '${params.DOCKER_DEV_REGISTRY_URL}/${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:latest' "

                sh "docker login ${params.DOCKER_DEV_REGISTRY_URL} -u jenkins -p ${env.KUBE_DEV_TOKEN}"

                sh "docker push ${params.DOCKER_DEV_REGISTRY_URL}/${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:latest"

                sh "docker rmi -f ${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:dev-${BUILD_NUMBER}-${commitId}"
                sh "docker rmi -f ${params.DOCKER_DEV_REGISTRY_URL}/${params.DEVELOPMENT_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:latest"
            }
        }

        stage('Performance Test') {
            environment {
                KUBE_DEV_TOKEN = credentials('OC_REGISTRY_TOKEN')
            }
            when {
                anyOf {
                    branch 'release'
                }
            }
            agent { label "jenkins-agent-docker-1" }
            steps {
                echo "Do Performance Test"
            }
        }

        stage('Deploy to STAGING') {
            environment {
                KUBE_DEV_TOKEN = credentials('OC_REGISTRY_TOKEN')
            }
            when {
                branch 'release'
            }
            agent { label "jenkins-agent-docker-1" }
            steps {
                echo "Deploy to STAGING"
                unstash 'ws'
                script {
                    echo "get COMMIT_ID"
                    commitId = readFile('./commit-id')
                }
                sh 'rm -rf ./commit-id'
                sh "docker tag '${params.STAGING_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:staging-${BUILD_NUMBER}-${commitId}' '${params.DOCKER_STAGING_REGISTRY_URL}/${params.STAGING_NAMESPACE}/${params.DOCKER_IMAGE_NAME}-staging:latest' "

                sh "docker login ${params.DOCKER_STAGING_REGISTRY_URL} -u jenkins -p ${env.KUBE_DEV_TOKEN}"

                sh "docker push ${params.DOCKER_STAGING_REGISTRY_URL}/${params.STAGING_NAMESPACE}/${params.DOCKER_IMAGE_NAME}-staging:latest"

                sh "docker rmi -f ${params.STAGING_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:staging-${BUILD_NUMBER}-${commitId}"
                sh "docker rmi -f ${params.DOCKER_STAGING_REGISTRY_URL}/${params.STAGING_NAMESPACE}/${params.DOCKER_IMAGE_NAME}-staging:latest"
            }
        }

        stage('Deploy to PRODUCTION') {
            environment {
                KUBE_PROD_TOKEN = credentials('VSAN_OC_REGISTRY_TOKEN')
            }
            agent { label "jenkins-agent-docker-1" }
            when {
                branch 'master'
            }
            steps {
                timeout(10) {
                    input message: 'Deploy to PRODUCTION?', ok: 'Deploy'
                }
                echo "Deploy to PRODUCTION"
                unstash 'ws'
                script {
                    echo "get COMMIT_ID"
                    commitId = readFile('./commit-id')
                }
                sh 'rm -rf ./commit-id'
                sh "docker tag '${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}' '${params.DOCKER_PROD_REGISTRY_URL}/${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:latest' "
                sh "docker tag '${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}' '${params.DOCKER_PROD_REGISTRY_URL}/${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}' "

                sh "docker login ${params.DOCKER_PROD_REGISTRY_URL} -u jenkins -p ${env.KUBE_PROD_TOKEN}"

                sh "docker push ${params.DOCKER_PROD_REGISTRY_URL}/${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:latest"
                sh "docker push ${params.DOCKER_PROD_REGISTRY_URL}/${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}"

                sh "docker rmi -f ${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}"
                sh "docker rmi -f ${params.DOCKER_PROD_REGISTRY_URL}/${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:latest"
                sh "docker rmi -f ${params.DOCKER_PROD_REGISTRY_URL}/${params.PRODUCTION_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:prod-${BUILD_NUMBER}-${commitId}"
            }
        }
        
    }
    post {
        always {
            node("jenkins-agent-docker-1") {
                unstash 'ws'
                script {
                    echo "get COMMIT_ID"
                    commitId = readFile('./commit-id')
                }

            }
            echo "Notify Build"
            //Call slack
        }
        aborted {
            script {
                currentBuild.result = 'SUCCESS'
            }
        }
    }

}
