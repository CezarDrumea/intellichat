package com.involveininnovation.chat.config;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GenAIConfiguration {

    @Bean
    public ChatLanguageModel chatLanguageModel() {
        OpenAiChatModel.OpenAiChatModelBuilder builder = OpenAiChatModel.builder()
                .apiKey("sk-proj-BKk7YIJPiDAm5VsIxiO9T3BlbkFJa1nte1j4hiLvn3LRgOW7");
        return builder.build();
    }

}
