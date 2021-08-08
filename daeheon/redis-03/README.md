> Redis 실전 Pub  , Sub  통신 


> ### auth 설정
 ```bash
redis-cli redis 127.0.0.1:6379> AUTH "비밀번호" 
(error) ERR Client sent AUTH, but no password is set redis 
127.0.0.1:6379> CONFIG SET requirepass "root" 
OK 
redis 127.0.0.1:6379> AUTH "root"
 OK

```
``` bash
npm i mocha  < 테스트 도구 >
npm i redis
 ```

- ready : redis server와 연결이 확정되고 client가 준비 상태가 되었을 때 이벤트가 발생한다. redis의 명령어들은 ready event가 발생하기 전에 실행되어야 함            


- connect : redis server와 connection을 맺었을 때 이벤트가 발생한다


- reconnecting : redis server와 연결이 끊긴 후에 다시 connection을 맺었을 때 이벤트가 발생한다


- error : redis server와의 연결에서 오류가 발생했을 때 이벤트가 발생한다.


- end : redis server와의 connection이 close 되었을 때 이벤트가 발생한다


- warning : deprecate 된 option 이나 function을 사용했을 때 이벤트가 발생한다




