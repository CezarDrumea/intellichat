package com.intellichat.service;

import com.intellichat.model.Message;
import com.intellichat.model.MessageDto;
import com.intellichat.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message saveMessage(MessageDto message) {
        return messageRepository.save(Message.from(message));
    }

    public List<MessageDto> getAllMessages() {
        List<Message> messageList = messageRepository.findAll();
        messageList.sort(comparing(Message::getCreatedAt));
        return messageList.stream().map(MessageDto::from).collect(toList());
    }

}