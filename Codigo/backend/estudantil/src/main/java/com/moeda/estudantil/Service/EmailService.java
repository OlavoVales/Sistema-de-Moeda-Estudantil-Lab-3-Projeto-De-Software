package com.moeda.estudantil.Service;

import com.moeda.estudantil.Cupom.Cupom;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import com.moeda.estudantil.Usuario.Usuario;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Async
    public void notificarAlunoDistribuicao(Usuario professor, Usuario aluno, Integer quantidade, String motivo) {
        try {
            Context context = new Context();
            context.setVariable("nomeAluno", aluno.getNome());
            context.setVariable("nomeProfessor", professor.getNome());
            context.setVariable("quantidade", quantidade);
            context.setVariable("motivo", motivo);

            String htmlContent = templateEngine.process("distribuicao-aluno-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setFrom("nao-responda@sgme.com");
            helper.setTo(aluno.getEmail());
            helper.setSubject("Parabéns! Você recebeu moedas! - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.err.println("Erro ao criar ou enviar email de notificação para o aluno: " + e.getMessage());
        }
    }

    @Async
    public void notificarProfessorDistribuicao(Usuario professor, Usuario aluno, Integer quantidade, String motivo) {
         try {
            Context context = new Context();
            context.setVariable("nomeProfessor", professor.getNome());
            context.setVariable("nomeAluno", aluno.getNome());
            context.setVariable("quantidade", quantidade);
            context.setVariable("motivo", motivo);

            String htmlContent = templateEngine.process("distribuicao-professor-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            
            helper.setFrom("nao-responda@sgme.com");
            helper.setTo(professor.getEmail());
            helper.setSubject("Envio de moedas confirmado - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.err.println("Erro ao criar ou enviar email de confirmação para o professor: " + e.getMessage());
        }
    }

    @Async
    public void enviarEmailResgateAluno(Usuario aluno, Cupom cupom) {
        try {
            Context context = new Context();
            context.setVariable("nomeAluno", aluno.getNome());
            context.setVariable("nomeVantagem", cupom.getVantagem().getNome());
            context.setVariable("codigoResgate", cupom.getCodigoResgate());
            context.setVariable("custoMoedas", cupom.getVantagem().getCustoMoedas());
            context.setVariable("nomeEmpresa", cupom.getVantagem().getEmpresaParceira().getNomeFantasia());

            String htmlContent = templateEngine.process("resgate-aluno-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setFrom("nao-responda@sgme.com");
            helper.setTo(aluno.getEmail());
            helper.setSubject("Você resgatou uma vantagem! - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.err.println("Erro ao criar ou enviar email HTML para o aluno: " + e.getMessage());
        }
    }

    @Async
    public void notificarEmpresaSobreResgate(EmpresaParceira empresa, Cupom cupom) {
         try {
            Context context = new Context();
            context.setVariable("nomeEmpresa", empresa.getNomeFantasia());
            context.setVariable("nomeVantagem", cupom.getVantagem().getNome());
            context.setVariable("nomeAluno", cupom.getAluno().getUsuario().getNome());
            context.setVariable("emailAluno", cupom.getAluno().getUsuario().getEmail());
            context.setVariable("codigoResgate", cupom.getCodigoResgate());

            String htmlContent = templateEngine.process("notificacao-empresa-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            
            helper.setFrom("nao-responda@sgme.com");
            helper.setTo(empresa.getUsuario().getEmail());
            helper.setSubject("Nova Vantagem Resgatada - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.err.println("Erro ao criar ou enviar email HTML para a empresa: " + e.getMessage());
        }
    }
}