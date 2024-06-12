package com.tt.microservicio_admin.configuracion;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Service
public class Configuracion {
       @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return   http
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll()
                .and()
                .csrf(config -> config.disable())
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .cors(cors -> cors.configurationSource(configuracionCors()))
                .build();
    }

    @Bean
    CorsConfigurationSource configuracionCors()
    {
        CorsConfiguration config = new CorsConfiguration();
        //config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("POST"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    FilterRegistrationBean<CorsFilter> filtroCors()
    {
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(
                    new CorsFilter(configuracionCors()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
