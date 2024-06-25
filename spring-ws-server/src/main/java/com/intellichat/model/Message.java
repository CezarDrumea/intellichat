package com.intellichat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.TemporalType.TIMESTAMP;

@Data
@Builder
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String senderName;
    private String receiverName;
    private String message;


    @CreationTimestamp
    @Temporal(TIMESTAMP)
    private Date createdAt;

    @Enumerated(STRING)
    private Status status;

    public static Message from(MessageDto message) {
        return Message.builder()
                .message(message.getMessage())
                .senderName(message.getSenderName())
                .receiverName(message.getReceiverName())
                .status(message.getStatus())
                .build();
    }
}