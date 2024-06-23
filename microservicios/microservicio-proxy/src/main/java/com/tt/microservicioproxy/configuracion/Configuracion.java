package com.tt.microservicioproxy.configuracion;

import java.security.Provider;
import java.security.Security;
import java.util.Arrays;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class Configuracion {
    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;
    @Value("${sesiones.llavehmac}")
    private String LLAVE_SESIONES_ENV;

    @Bean
    public Provider bouncyCastleProvider()
    {
        Security.addProvider(new BouncyCastleProvider());
        return Security.getProvider("BC");
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return   http
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/login")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/registroRestablecer")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/validaRestablecer")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/registroEstudiante")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/registroEstudianteToken")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/estudiante/getVerificarConstancia")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/estudiante/**")
                    .hasRole("ESTUDIANTE")
                .requestMatchers(HttpMethod.POST, "/admin/**")
                    .hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/personalGestionEscolar/**")
                    .hasAnyRole("ADMIN", "PAAE")
                .anyRequest().authenticated()
                    .and()
                .addFilter(new AutenticacionPlataforma(authenticationConfiguration.getAuthenticationManager(), LLAVE_SESIONES_ENV))
                .addFilter(new ValidarToken(authenticationConfiguration.getAuthenticationManager(), LLAVE_SESIONES_ENV))
                .csrf(config -> config.disable())
                .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
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
