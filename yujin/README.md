# Redis

## Redis?
* cache-server X, database O
* In-Memory Database
  * fast(Disk보다 10배 빠름)
* 다양한 datatype 지원
* NoSQL(JSON) : key-value model
* Data Expire 가능
  * 지정된 시간 이후 or 만료 시간 지정

## 설치 & 시작/중지 & 연동

### Linux
* 설치
  ```bash
  sudo apt install redis-tools
  sudo apt install redis-server
  ```
* server 시작/중지
  ```bash
  service redis-server start
  service redis-server stop
  ```
* 연동 - 들어갈 수 있게 함
  ```bash
  redis-clli
  ```

## Basic(Usage)

* set/get/ttl
  ```shell
  # key: test, value: "I am gordon"
  set test "I am gordon"
  
  # expire time 설정 : ex) 10초 후 사라짐
  set test:mykey1 "mykey1" ex 10
  
  # key에 해당하는 값 가지고 오기; 결과: "I am gordon"
  get test
  
  # 만기되기까지 남은 시간 확인
  ttl test:mykey1         # 10초 미만 시간
  ttl test                # -1 : 영원히 지속
  
  # 모든 key 확인
  keys *
  
  # key 삭제
  del test
  ```

## Data Type
* hash data
  * 하나의 key에 대해 여러 field가지게 할 수 있음 
  * usage
    * set : ```hset [key] [field] [value]```
    * get : ```hget [key] [field]```
    * del : ```hdel [key] [field]```
  * 참고
    * [공식문서](https://redis.io/commands/hset) 
    * [blog 설명](https://realmojo.tistory.com/172)
* list data
  * 하나의 key에 대해서 요소가 linked list로 존재
    * [key] -> [element1] -> [element2] ->...
  * usage
    * push
      * rpush : 오른쪽으로 push(```rpush```) 
      * lpush : 왼쪽으로 push
    * set
      * lset : list set(```lset```)
    * range
      * lrange : list range; 데이터 범위 지정해서 요소들 볼 수 있음
    * ex
      ```shell
      RPUSH mylist "one"          # mylist : one
      RPUSH mylist "two"          # mylist : one two
      LPUSH mylist "three"        # mylist : three one two
      LSET mylist 0 "four"        # mylist : four one two
      LSET mylist -2 "five"       # mylist : four five two
      LRANGE mylist 0 -1          # 처음부터 마지막까지 출력 : four five two
      ```
    * 참고
      * [공식문서](https://redis.io/commands/LSET)

* set data
  * 정렬 가능
  * usage
    * ex
      ```shell
      sadd myset 4 3 2 1 2 3
      smembers myset              # myset 출력 : "1","2","3","4"
      ``` 
    
## Pub/Sub

* 특정한 Topic에 대해 topic을 구독한 모두에게 message 발행하는 통신 방법
* 사용처
  * server -> client 메세지 내려줄때 사용
  * group chatting service
    * 특히, 다수의 chatting server 중계 위한 경우 (:star:)

* usage
  ```bash
  publish test1 hello       # test1을 구독하는 곳에 "hello" message 보내기
  subscribe test1 test2     # test1, test2 구독
  ```