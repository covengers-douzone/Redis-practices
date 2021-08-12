import React, {Component, useEffect, useState} from 'react';

export default class room extends Component {

    render() {
        return (
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
                            <div><label>현재 접속자 : {`${this.props.name}`} </label></div>

                            <br/><br/>
                            <div>
                                <button>방 생성</button>
                            </div>
                            <textarea style={{
                                width: '100%',
                                height: '100%',
                            }} disabled >
                            채팅 내역
                      </textarea>
                            <div><input/>
                                <button>메세지 보내기</button>
                            </div>
                        </div>
                    </div>

        );
    }
}
