package com.involveininnovation.chat.model;

import lombok.*;

import java.util.Date;

@Data
@Builder
@ToString
public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private Status status;
}
