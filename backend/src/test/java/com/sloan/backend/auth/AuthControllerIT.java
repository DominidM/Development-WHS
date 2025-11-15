package com.sloan.backend.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIT {

  @Autowired MockMvc mvc;

  @Test
  void login_ok_returnsToken() throws Exception {
    String body = """
      {"username":"admin","password":"admin123"}
      """;
    mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$.token").exists());
  }

  @Test
  void login_badCredentials_401() throws Exception {
    String body = """
      {"username":"admin","password":"wrong"}
      """;
    mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
       .andExpect(status().isUnauthorized());
  }
}