# gRPC practice

* Server & Client
  * typescript
  * node
* practices for gRPC 4 method
  * unary
  * client streaming
  * server streaming
  * bi-directional streaming - chat!!
* gRPC
  * 기존에 http server + socket.io했던 것을 한번에 하는 것 정도로 생각하면 될 듯
  * 굳이 쓸 필요는 없고, 걍 socket.io써서 하면 될 듯 함

## Project
* 생성 & 설치
  ```shell
  npm install --global yarn
  yarn init -y
  yarn add --dev @grpc/grpc-js @grpc/proto-loader typescript ts-node
  ```
* dependency
  * grpc
    * @grpc/grpc-js
    * @grpc/proto-loader : for using .proto files
  * typescript
    * typescript
    * ts-node : to run typescript codes
* scripts (package.json)
  ```json
  "scripts": {
      "proto-gen": "./proto-gen.sh",
      "start": "ts-node server.ts",
      "client": "ts-node client.ts"
  },
  ```
  * ```yarn proto-gen``` : proto loader 사용 : .proto -> .ts
  * ```yarn start``` : start server.ts
  * ```yarn client```: start client.ts
  
## 개념

### 1. gRPC
|REST|gRPC|
|:---:|:---:|
|JSON|Protobuf|
* gRPC ?
  * = Google Remote Procedure Call
  * client & server communication mechanism 정의
  * HTTP2에서만 가능
  * .proto 사용
    * JSON과 거의 유사
* use Protobuf
    * to have a client server communication
    * protobuf : communication form으로 사용
* gRPC call message methods
  * Unary : (우리가 쓰는 REST생각) one request, one response
  * Client Stream : message 수신하지 않고도 시작
  * Server Stream : client makes one call, server sends in a stream of data
  * Bi-directional Streaming : (like web-socket)

<img src='https://grpc.io/img/landing-2.svg' width='50%' />

#### 1-1. Protobuf
= protobox protocol buffers
* JSON 비슷한 data serialization method
* client와 server사이 통하는 '언어'정도로 생각
  * binary format으로 변환 O
    * formatted string으로 변환 X
      * formatted string: 우리가 흔히 아는 JSON, XML의 변환형식
      * JSON, XML : human readable language
    * :star: super efficient on 'large datasets'
    
## Practice Description

* 작성
  * [proto/random.proto](proto/random.proto)
    * ts로 변환 : ```yarn proto-gen```; proto-gen.sh 실행
  * [server.ts](server.ts)
  * [client.ts](client.ts)

* 연습
  * unary : PingPong
  * server streaming : RandomNumbers
  * client streaming : TodoList
  * bi-directional streaming : Chat
