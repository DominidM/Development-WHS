package com.sloan.backend.comon;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Testcontainers
public abstract class AbstractIntegrationTest {

  @Container
  static final PostgreSQLContainer<?> POSTGRES =
      new PostgreSQLContainer<>("postgres:16-alpine")
          .withDatabaseName("app_test")
          .withUsername("test")
          .withPassword("test");

  @BeforeAll
  static void start() { /* Testcontainers + JUnit Jupiter lo gestionan */ }

  @DynamicPropertySource
  static void overrideProps(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
    registry.add("spring.datasource.username", POSTGRES::getUsername);
    registry.add("spring.datasource.password", POSTGRES::getPassword);
    // Si no tienes migraciones en test, usa "update" y desactiva Flyway:
    registry.add("spring.jpa.hibernate.ddl-auto", () -> "update"); // o "validate" si ya tienes migraciones
    registry.add("spring.flyway.enabled", () -> "false"); // pon "true" si tienes Flyway en test
  }
}