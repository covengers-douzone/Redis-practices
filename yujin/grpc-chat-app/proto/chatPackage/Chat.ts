// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { InitiateRequest as _chatPackage_InitiateRequest, InitiateRequest__Output as _chatPackage_InitiateRequest__Output } from '../chatPackage/InitiateRequest';
import type { InitiateResponse as _chatPackage_InitiateResponse, InitiateResponse__Output as _chatPackage_InitiateResponse__Output } from '../chatPackage/InitiateResponse';
import type { MessageRequest as _chatPackage_MessageRequest, MessageRequest__Output as _chatPackage_MessageRequest__Output } from '../chatPackage/MessageRequest';
import type { StreamMessage as _chatPackage_StreamMessage, StreamMessage__Output as _chatPackage_StreamMessage__Output } from '../chatPackage/StreamMessage';
import type { StreamRequest as _chatPackage_StreamRequest, StreamRequest__Output as _chatPackage_StreamRequest__Output } from '../chatPackage/StreamRequest';
import type { UserStreamResponse as _chatPackage_UserStreamResponse, UserStreamResponse__Output as _chatPackage_UserStreamResponse__Output } from '../chatPackage/UserStreamResponse';

export interface ChatClient extends grpc.Client {
  ChatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  ChatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  ChatInitiate(argument: _chatPackage_InitiateRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  ChatInitiate(argument: _chatPackage_InitiateRequest, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, callback: (error?: grpc.ServiceError, result?: _chatPackage_InitiateResponse__Output) => void): grpc.ClientUnaryCall;
  
  ChatStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  ChatStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  chatStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  chatStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  
  SendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  
  UserStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  UserStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  userStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  userStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  
}

export interface ChatHandlers extends grpc.UntypedServiceImplementation {
  ChatInitiate: grpc.handleUnaryCall<_chatPackage_InitiateRequest__Output, _chatPackage_InitiateResponse>;
  
  ChatStream: grpc.handleServerStreamingCall<_chatPackage_StreamRequest__Output, _chatPackage_StreamMessage>;
  
  SendMessage: grpc.handleUnaryCall<_chatPackage_MessageRequest__Output, _google_protobuf_Empty>;
  
  UserStream: grpc.handleServerStreamingCall<_chatPackage_StreamRequest__Output, _chatPackage_UserStreamResponse>;
  
}

export interface ChatDefinition extends grpc.ServiceDefinition {
  ChatInitiate: MethodDefinition<_chatPackage_InitiateRequest, _chatPackage_InitiateResponse, _chatPackage_InitiateRequest__Output, _chatPackage_InitiateResponse__Output>
  ChatStream: MethodDefinition<_chatPackage_StreamRequest, _chatPackage_StreamMessage, _chatPackage_StreamRequest__Output, _chatPackage_StreamMessage__Output>
  SendMessage: MethodDefinition<_chatPackage_MessageRequest, _google_protobuf_Empty, _chatPackage_MessageRequest__Output, _google_protobuf_Empty__Output>
  UserStream: MethodDefinition<_chatPackage_StreamRequest, _chatPackage_UserStreamResponse, _chatPackage_StreamRequest__Output, _chatPackage_UserStreamResponse__Output>
}
