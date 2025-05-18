package com.fitness.activityservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    //this declares the queue in rabbitMq with name : "activity.queue"
    // durable : even if the rabbitMq restarts, this queue is going to remain; we won't lose the queue & messages inside it.
    @Bean
    public Queue activityQueue(){
        return new Queue("activity.queue", true);
    }

    // this will convert the raw java object into json before sending it to rabbitMq
    @Bean
    public MessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
