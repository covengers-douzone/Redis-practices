# gRPC Chat APP

## Project

* 설치
    * server
        ```shell
        npm install --global yarn
        yarn init -y
        yarn add --dev @grpc/grpc-js @grpc/proto-loader typescript ts-node
        ```
    * client
        ```shell
        npx create-react-app client --template typescript        
        yarn add grpc-web google-protobuf   
        ```