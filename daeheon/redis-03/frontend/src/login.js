import React, {Component, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import room from './room'

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
export default class App extends Component {


    subtitle;

    openModal() {
        this.setState({
            isOpen: true,
        })
    }

    afteropenModal() {
        alert('현재 이름 ' + this.state.name);

    }

    closeModal() {
        this.setState({
            isOpen: true,
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isOpen: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        this.openModal();
        //    alert('A name was submitted: ' + this.state.name);
        event.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
                <Modal
                    isOpen={this.state.isOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (this.subtitle = _subtitle)}>Hello</h2>
                    <button onClick={this.closeModal}>모달 종료</button>
                    <button onClick={this.closeModal}>채팅 종료</button>


                    <div style={{
                        display : 'inline',
                        width: '100%',
                        height: '100%',
                    }}>
                        <div style={{
                            display : 'inline',
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
                            }} disabled >
                            채팅 내역
                    </textarea>
                            <div><input/>
                                <button>메세지 보내기</button>
                            </div>
                        </div>
                        <div style={{
                            display : 'inline',
                            width: '50%',
                            height: '100%',
                        }}>
                           <button>방 1번</button>
                        </div>



                    </div>

                </Modal>

            </form>

        );
    }
}
