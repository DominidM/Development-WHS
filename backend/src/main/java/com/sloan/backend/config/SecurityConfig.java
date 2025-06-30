package com.sloan.backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Configuración de seguridad para la aplicación Spring Boot.
 * Define las reglas de acceso, manejo de CORS, login, logout y codificación de contraseñas.
 */
@Configuration
public class SecurityConfig {

    /**
     * Configura la cadena de filtros de seguridad (SecurityFilterChain).
     * Define rutas públicas, protegidas y el comportamiento de login/logout.
     * 
     * @param http el objeto HttpSecurity para construir la configuración.
     * @return el SecurityFilterChain configurado.
     * @throws Exception si ocurre algún error en la configuración.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
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
                .requestMatchers("/adminlte/**", "/css/**", "/js/**", "/images/**", 
                                "/favicon.ico", "/bootstrap.min.css", "/bootstrap.bundle.min.js").permitAll()
                .requestMatchers("/admin/login").permitAll()
                .requestMatchers("/api/public/**").permitAll() // <--- esto cubre /api/public/pagar
                .requestMatchers("/api/admin/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMINISTRADOR")
                .requestMatchers("/admin/**").hasRole("ADMINISTRADOR")
                .anyRequest().denyAll()
            );
        return http.build();
    }
    /**
     * Bean de codificador de contraseñas usando BCrypt.
     * Utiliza PasswordEncoder en las inyecciones de servicios.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configuración global de CORS.
     * Permite cualquier origen, cualquier header y varios métodos.
     * IMPORTANTE: Cambia la política de origen para producción.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); // Permite cualquier origen (solo desarrollo)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}