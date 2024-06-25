package com.intellichat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MessageDto {

    private String senderName;
    private String receiverName;
    private String message;

    private Status status;

    public static MessageDto from(Message message) {
        return new MessageDto(message.getSenderName(),
                message.getReceiverName(),
                message.getMessage(),
                message.getStatus()
        );
    }

}
