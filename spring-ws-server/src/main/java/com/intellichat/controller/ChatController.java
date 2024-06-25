package com.intellichat.controller;

import com.intellichat.model.Message;
import com.intellichat.model.MessageDto;
import com.intellichat.model.Status;
import com.intellichat.service.MessageService;
import dev.langchain4j.model.chat.ChatLanguageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ChatLanguageModel chatLanguageModel;

    private final MessageService messageService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageDto receiveMessage(@Payload MessageDto message){
        messageService.saveMessage(message);
        if(message.getMessage().startsWith("@GPT")) {
            MessageDto newMessage = MessageDto.builder()
                    .senderName("GPT")
                    .message(message.getSenderName() + ":" + message.getMessage() + "\n" + chatLanguageModel.generate(message.getMessage()))
                    .status(Status.MESSAGE)
                    .build();
            messageService.saveMessage(newMessage);
            return newMessage;
        }
        return message;
    }

    @MessageMapping("/private-message")
    public MessageDto recMessage(@Payload MessageDto message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private", message);
        if(message.getReceiverName().equals("GPT")) {
            MessageDto llmResposne = MessageDto.builder()
                    .senderName("GPT")
                    .message(chatLanguageModel.generate(message.getMessage()))
                    .status(Status.MESSAGE)
                    .build();
            return llmResposne;
        }
        return message;
    }

    @MessageMapping("/history")
    public List<MessageDto> history(){
        return messageService.getAllMessages();
    }
}
