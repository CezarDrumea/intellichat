package com.intellichat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ConditionalOnProperty(name = "database.type", havingValue = "h2")
public class H2DataSourceConfig {

    @Value("${spring.datasource.h2.url}")
    private String h2Url;

    @Value("${spring.datasource.h2.username}")
    private String h2Username;

    @Value("${spring.datasource.h2.driver-class-name}")
    private String h2DriverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(h2DriverClassName);
        dataSource.setUrl(h2Url);
        dataSource.setUsername(h2Username);
        return dataSource;
    }
}