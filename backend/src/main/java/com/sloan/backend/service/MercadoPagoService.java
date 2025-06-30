package com.sloan.backend.service;

import java.math.BigDecimal;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;

@Service
public class MercadoPagoService {

    @Value("${mercadopago.access.token}")
    private String accessToken;

    // Puedes agregar parámetros según tus necesidades
    public Preference crearPreferencia(String descripcion, BigDecimal monto, Integer cantidad, String externalReference) throws Exception {
        MercadoPagoConfig.setAccessToken(accessToken);

        PreferenceItemRequest item = PreferenceItemRequest.builder()
                .title(descripcion)
                .quantity(cantidad)
                .unitPrice(monto)
                .currencyId("PEN") // Cambia según tu país
                .build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(Collections.singletonList(item))
                .externalReference(externalReference) // Relaciona con tu pedido
                .build();

        PreferenceClient client = new PreferenceClient();
        return client.create(preferenceRequest);
    }
}