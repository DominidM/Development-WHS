package com.sloan.backend.auth;

import com.sloan.backend.config.SecurityConfig;
import com.sloan.backend.controller.AuthController;
import com.sloan.backend.model.RolUsuario;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.RolUsuarioRepository;
import com.sloan.backend.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@Import({SecurityConfig.class, AuthControllerTest.MockConfig.class})
class AuthControllerTest {

  @TestConfiguration
  static class MockConfig {
    @Bean AuthService authService() { return Mockito.mock(AuthService.class); }
    @Bean RolUsuarioRepository rolUsuarioRepository() { return Mockito.mock(RolUsuarioRepository.class); }
  }

  @Autowired MockMvc mvc;
  @Autowired AuthService authService;
  @Autowired RolUsuarioRepository rolUsuarioRepository;

  @Test
  void login_ok_returnsUserJson() throws Exception {
    Usuario u = new Usuario();
    u.setCorreoPersona("user@mail.com");
    when(authService.login(eq("user@mail.com"), eq("secret"))).thenReturn(u);

    String body = """
      {"correo":"user@mail.com","password":"secret"}
      """;
    mvc.perform(post("/api/admin/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$.correoPersona").value("user@mail.com"));
  }

  @Test
  void register_assignsClienteRole() throws Exception {
    RolUsuario rol = new RolUsuario();
    rol.setIdRolUsuario(2L);
    rol.setNombreRol("Cliente");
    when(rolUsuarioRepository.findByNombreRol("Cliente")).thenReturn(Optional.of(rol));

    Usuario nuevo = new Usuario();
    nuevo.setCorreoPersona("nuevo@mail.com");
    when(authService.register(any(Usuario.class))).thenReturn(nuevo);

    String body = """
      {"nombre":"Nuevo","correo":"nuevo@mail.com","password":"123456"}
      """;

    mvc.perform(post("/api/admin/auth/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$.correoPersona").value("nuevo@mail.com"));
  }

  @Test
  void forgotPassword_found_returns200() throws Exception {
    when(authService.sendPasswordResetEmail("existe@mail.com")).thenReturn(true);
    String body = """
      {"correo":"existe@mail.com"}
      """;
    mvc.perform(post("/api/admin/auth/forgot-password")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
       .andExpect(status().isOk());
  }

  @Test
  void forgotPassword_notFound_returns404() throws Exception {
    when(authService.sendPasswordResetEmail("no@mail.com")).thenReturn(false);
    String body = """
      {"correo":"no@mail.com"}
      """;
    mvc.perform(post("/api/admin/auth/forgot-password")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
       .andExpect(status().isNotFound());
  }
}