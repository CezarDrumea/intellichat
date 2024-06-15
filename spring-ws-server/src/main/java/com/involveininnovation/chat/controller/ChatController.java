package com.involveininnovation.chat.controller;

import com.involveininnovation.chat.model.Message;
import com.involveininnovation.chat.model.Status;
import dev.langchain4j.model.chat.ChatLanguageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ChatLanguageModel chatLanguageModel;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        if(message.getMessage().startsWith("@GPT")) {
            return Message.builder()
                    .senderName("GPT")
                    .message(message.getSenderName() + ":" + message.getMessage() + "\n" + chatLanguageModel.generate(message.getMessage()))
                    .status(Status.MESSAGE)
                    .build();
        }
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private", message);
        if(message.getReceiverName().equals("GPT")) {
            Message llmResposne = Message.builder()
                    .senderName("GPT")
                    .message(chatLanguageModel.generate(message.getMessage()))
                    .status(Status.MESSAGE)
                    .build();
            return llmResposne;
        }
        return message;
    }
}
