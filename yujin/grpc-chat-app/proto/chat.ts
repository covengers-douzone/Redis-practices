import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatClient as _chatPackage_ChatClient, ChatDefinition as _chatPackage_ChatDefinition } from './chatPackage/Chat';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chatPackage: {
    Chat: SubtypeConstructor<typeof grpc.Client, _chatPackage_ChatClient> & { service: _chatPackage_ChatDefinition }
    InitiateRequest: MessageTypeDefinition
    InitiateResponse: MessageTypeDefinition
    MessageRequest: MessageTypeDefinition
    Status: EnumTypeDefinition
    StreamMessage: MessageTypeDefinition
    StreamRequest: MessageTypeDefinition
    User: MessageTypeDefinition
    UserStreamResponse: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}

