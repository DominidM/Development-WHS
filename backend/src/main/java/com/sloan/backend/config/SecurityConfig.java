package com.sloan.backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    // Cadena para la API
    @Bean
    @Order(1)
    public SecurityFilterChain apiSecurity(HttpSecurity http) throws Exception {
        AuthenticationEntryPoint restAuthenticationEntryPoint = new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);

        http
            .securityMatcher("/api/**")
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/public/**",
                    "/api/admin/auth/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(eh -> eh
                .authenticationEntryPoint(restAuthenticationEntryPoint)
            );
        return http.build();
    }

    // Cadena para el panel admin (sólo /admin/**, no /api/admin/**)
    @Bean
    @Order(2)
    public SecurityFilterChain adminSecurity(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/admin/**")
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form
                .loginPage("/admin/login")
                .defaultSuccessUrl("/admin/dashboard", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/admin/logout")
                .logoutSuccessUrl("/admin/login?logout")
                .permitAll()
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/admin/login",
                    "/admin/logout",
                    "/adminlte/**",
                    "/css/**", "/js/**", "/images/**",
                    "/webjars/**",
                    "/favicon.ico",
                    "/bootstrap.min.css",
                    "/bootstrap.bundle.min.js",
                    "/avatar4.png"     
                ).permitAll()
                .anyRequest().hasRole("ADMINISTRADOR")
            );
        return http.build();
    }


    // Cadena para recursos estáticos públicos (CSS, JS, imágenes, favicon)
    @Bean
    @Order(3)
    public SecurityFilterChain staticResourcesSecurity(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/adminlte/**", "/css/**", "/js/**", "/images/**", "/favicon.ico", "/bootstrap.min.css", "/bootstrap.bundle.min.js", "/avatar4.png")
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );
        return http.build();
    }

    // Cadena por defecto (bloquea todo lo demás)
    @Bean
    @Order(4)
    public SecurityFilterChain defaultSecurity(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().denyAll()
            );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(
            "http://localhost:5173",
            "https://delightful-desert-0cee57a03.1.azurestaticapps.net"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}