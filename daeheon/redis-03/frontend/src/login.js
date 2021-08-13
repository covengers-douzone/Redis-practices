import React, {Component, useEffect, useState, Fragment} from 'react';
import Modal from 'react-modal';
import io from "socket.io-client";
const conf = require('../../redis-conf');
const customStyles = {
    content: {
        width: '70%',
        height: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const socket =  io.connect("http://localhost:8888", {transports: ['websocket']});
export default class App extends Component {
    subtitle;






    async openModal() {
        this.setState({
            isOpen: true,
        })

        const info = {
            name: this.state.name,
            room: this.state.room,
            message: this.state.message,
        }
        await socket.emit("join", {
            name: this.state.name,
            room: this.state.room,
            message: `${this.state.name} 님이 ${this.state.room} 방에 입장 하셨습니다.}`,
        });

        // await this.state.socket.on("messageUpdate" , (message) => {
        //     this.setState({
        //         openchat :  `${message.name}:${message.room} `,
        //     })
        // })
    }

    afteropenModal() {
        //    alert('현재 이름 ' + this.state.name);
    }

    closeModal() {
        this.setState({
            isOpen: false,
        })
        socket.close();
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isOpen: false,
            message: "",
            room: -1,

            openChat: ""

        };
        //  console.log(this.state.socket)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {

        //    alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }

    textAreaAdd(name, room, message) {

        let backMessage = `${this.state.openChat}${name}:${room}:${message}
`
        console.log("textaArea: !!!!!!" + backMessage)



        this.setState({
            openChat: backMessage
        })

        console.log("this.state.openChat: !!!!!!!" + this.state.openChat)
    }

    componentDidMount() {
        // 메세지를 받는다
        socket.on("comment", (info) => {

            this.textAreaAdd(info.name, info.room, info.message)

        }) // 메세지를 보내준다!!
    }

    async send(user, room, message) {
        try {

            const url = `/api/message/${user}/${room}/${message}`;
            const task = {
                message: message,
                name: user,
            }
            const response = await fetch(url, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            if (json.result !== 'success') {
                throw new Error(`${json.result} ${json.message}`);
            }

            // await this.state.socket.emit("getMessage", {
            //     name: this.state.name,
            //     message: this.state.message,
            //     room: this.state.room
            // });





            console.log(json);

        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <Fragment>

                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" onClick={
                    (e) => {
                        this.openModal();

                    }
                }/>
                <Modal
                    shouldCloseOnOverlayClick={false}
                    isOpen={this.state.isOpen}
                    onAfterOpen={this.afteropenModal.bind(this)}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (this.subtitle = _subtitle)}>Hello</h2>
                    <button onClick={this.closeModal.bind(this)}>모달 종료</button>
                    <button onClick={this.closeModal.bind(this)}>채팅 종료</button>
                    <div style={{
                        display: 'inline',
                        width: '100%',
                        height: '100%',
                    }}>
                        <div style={{
                            display: 'inline',
                            width: '50%',
                            height: '100%',
                        }}>
                            <div>I am a modal</div>
                            <div><label>현재 접속자 : {`${this.state.name}`} </label></div>

                            <br/><br/>
                            <div>
                                <button>방 생성</button>
                            </div>
                            <textarea style={{
                                width: '50%',
                                height: '100%',
                            }} disabled value={this.state.openChat}>
                            채팅 내역
                    </textarea>
                            <div><input name="message" value={this.state.message} onChange={(e) => {
                                this.setState({
                                    message: e.target.value,
                                })
                            }}/>
                                <button
                                    onClick={() => this.send(this.state.name, this.state.room, this.state.message)}>메세지
                                    보내기
                                </button>
                            </div>
                        </div>
                        <div style={{
                            display: 'inline',
                            width: '50%',
                            height: '100%',
                        }}>
                            <button>방 1번</button>
                        </div>


                    </div>

                </Modal>


            </Fragment>
        );
    }
}
