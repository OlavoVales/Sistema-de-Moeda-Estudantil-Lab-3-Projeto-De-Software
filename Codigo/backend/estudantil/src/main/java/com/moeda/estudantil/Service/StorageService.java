package com.moeda.estudantil.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service.key}")
    private String supabaseServiceKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BUCKET_NAME = "vantagens";

    public String uploadFile(MultipartFile file) throws IOException {
        
        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
        String fileExtension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            fileExtension = originalFilename.substring(i);
        }
        String fileName = UUID.randomUUID().toString() + fileExtension;
        String uploadUrl = supabaseUrl + "/storage/v1/object/" + BUCKET_NAME + "/" + fileName;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + supabaseServiceKey);
        headers.set("apikey", supabaseServiceKey);
        headers.setContentType(file.getContentType() != null ? MediaType.parseMediaType(file.getContentType()) : MediaType.IMAGE_PNG);
        headers.set("Cache-Control", "max-age=3600");

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);

        try {
            restTemplate.exchange(
                uploadUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
            );
        } catch (Exception e) {
            System.err.println("Erro ao fazer upload para Supabase: " + e.getMessage());
            e.printStackTrace();
            throw new IOException("Falha ao enviar arquivo para o storage: " + e.getMessage(), e);
        }

        String publicUrl = supabaseUrl + "/storage/v1/object/public/" + BUCKET_NAME + "/" + fileName;
        return publicUrl;
    }
}