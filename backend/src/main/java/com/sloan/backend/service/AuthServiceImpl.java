package com.sloan.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.UsuarioRepository;

@Service
public class AuthServiceImpl implements AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Autowired
    public AuthServiceImpl(
        UsuarioRepository usuarioRepository,
        PasswordEncoder passwordEncoder,
        JavaMailSender mailSender // Inyección de mail sender
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    @Override
    public Usuario login(String correo, String password) {
        Usuario usuario = usuarioRepository.findByCorreoPersona(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return usuario;
    }

    @Override
    public Usuario findByUsername(String username) {
        return usuarioRepository.findByCorreoPersona(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public Usuario register(Usuario usuario) {
        if (usuarioRepository.findByCorreoPersona(usuario.getCorreoPersona()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public void eliminarPorId(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public boolean sendPasswordResetEmail(String correo) {
        Usuario usuario = usuarioRepository.findByCorreoPersona(correo)
            .orElse(null);
        if (usuario == null) return false;

        String token = java.util.UUID.randomUUID().toString();
        // Guarda el token y expiración en el usuario
        usuario.setResetToken(token);
        usuario.setResetTokenExpiry(System.currentTimeMillis() + 3600_000); // 1 hora
        usuarioRepository.save(usuario);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(correo);
        message.setSubject("Restablece tu contraseña");
        message.setText("""
            Hola,

            Haz clic en el siguiente enlace para restablecer tu contraseña:
            """ + resetLink + """

            Si no solicitaste este cambio, ignora este mensaje.
            """
        );
        mailSender.send(message);
        return true;
    }

    // Agrega este método para cambiar la contraseña usando el token
    @Override
    public boolean resetPasswordWithToken(String token, String newPassword) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByResetToken(token);
        if (usuarioOpt.isEmpty()) return false;

        Usuario usuario = usuarioOpt.get();
        if (usuario.getResetTokenExpiry() != null && usuario.getResetTokenExpiry() < System.currentTimeMillis()) {
            return false; // Token expirado
        }

        usuario.setPassword(passwordEncoder.encode(newPassword));
        usuario.setResetToken(null);
        usuario.setResetTokenExpiry(null);
        usuarioRepository.save(usuario);
        return true;
    }
}