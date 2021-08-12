>  종합 (연결, 컬렉션 Pub,Sub 통신  )

``` bash
npm i mocha  < 테스트 도구 >
npm i redis
 ```


> #### auth 설정
 ```bash
redis-cli redis 127.0.0.1:6379> AUTH "비밀번호" 
(error) ERR Client sent AUTH, but no password is set redis 
127.0.0.1:6379> CONFIG SET requirepass "root" 
OK 
redis 127.0.0.1:6379> AUTH "root"
 OK

```


> #### Redis Client 사용법

- ready : redis server와 연결이 확정되고 client가 준비 상태가 되었을 때 이벤트가 발생한다. redis의 명령어들은 ready event가 발생하기 전에 실행되어야 함            


- connect : redis server와 connection을 맺었을 때 이벤트가 발생한다


- reconnecting : redis server와 연결이 끊긴 후에 다시 connection을 맺었을 때 이벤트가 발생한다


- error : redis server와의 연결에서 오류가 발생했을 때 이벤트가 발생한다.


- end : redis server와의 connection이 close 되었을 때 이벤트가 발생한다


- warning : deprecate 된 option 이나 function을 사용했을 때 이벤트가 발생한다


> #### Redis Pub/Sub 사용법

- subscribe (channel, count) : channel을 구독 완료 했을 때 발생하는 이벤트로 구독한 채널이름과 현재 구독한 채널들의 개수가 parameter로 전달


- message (channel, message) : 구독한 channel로 부터 메시지를 받았을 때 발생하는 이벤트로 구독한 채널이름과 메시지가 parameter로 전달


- unsubscribe (channel, count) : channel을 구독 취소 했을 때 발생하는 이벤트로 구독 취소한 채널이름과 현재 구독한 채널들의 개수가 parameter로 전달


- psubscribe (pattern, count) : channel 명을 정규식 pattern으로 구독하는 psubscribe 명령을 실행했을 때 발생하는 이벤트로, 사용한 pattern과 현재 구독한 채널들의 개수가 parameter로 전달 ,  그리고 pattern으로 등록한 channel들에게 메세지를 받을 때는 pmessage 이벤트가 발생


- pmessage (pattern, channel, message) : psubscribe로 구독한 채널로부터 메시지를 받을 때 이벤트가 발생하는 이벤트로, 사용한 pattern과 채널이름과 메시지가 parameter로 전달


- punsubscribe (pattern, count) : channel 명을 정규식 pattern으로 구독 취소하는 punsubscribe 명령을 실행했을 때 발생하는 이벤트로, 사용한 pattern과 현재 구독한 채널들의 개수가 parameter로 전달


```bash
npm test mocha test.js 로 실행
```
