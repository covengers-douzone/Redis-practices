
const Redis = require('./redis')


const Pub01 = new Redis();

const Lee = new Redis("박대헌");



Lee.subscribe("room1" ); // room 1 번에 들어 왔다
Lee.on("subscribe", (channel, count) => { //   구독이 성공 ,
    Pub01.publish("room1", Lee.userName + "님이 입장 하셨습니다.")  // 메시지 때릴떄
    console.log("채널명:" + channel +": 현재 접속 인원수" + count );
});
Pub01.publish("room1", "안녕하세요!")  // 메시지 때릴떄
Pub01.publish("room1", "안녕하세요!")
Pub01.publish("room1", "안녕하세요!")



Lee.on("message" , (channel, messages) => {
    // 요기서 get ,set ,del 처리
    console.log(channel+":"+messages);
})

Lee.unsubscribe("room01") // 방 나갔을떄,
Lee.quit();



const subscribers = [ new Redis("박대헌"), new Redis("배유진"), new Redis("강우성") , new Redis("손재현") ];
subscribers.forEach( subscriber => {
    subscriber.subscribe("openChat" ); // 이미 방에 들어왔다고 가정 ,
    subscriber.on("subscribe" , (channel , count) => {

        const info = {
            id : "wow1186",
            message: "hello!"
        } // 이 데이터를 db저장후  react client 에 api로  보낸다?

        console.log("channel" + channel + ":" + "count: " + count)

        Pub01.publish("openChat", info.message)  // 누군가 대화 했을 때

    })
});

/*
Sub01.subscribe("hello")
Sub02.subscribe("hello")
Sub03.subscribe("hello")

 */
