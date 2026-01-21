/**
 * A set of functions called "actions" for `contact`
 */

import { Resend } from "resend";

export default {
  submit: async (ctx: any) => {
    try {
      // Get request data
      const { name, email, phoneNumber, message } = ctx.request.body;

      if (!name || !email || !message)
        return ctx.badRequest('Name, e-mail and message not found.');

      const arrivalTime = new Date();
      const senderIP = ctx.request.ip;

      // Save to Strapi database
      await strapi.documents('api::contact.contact').create({
        data: { name, email, message, arrivalTime, senderIP, phoneNumber: phoneNumber || null}
      });

      // Initialize Resend client
      const {RESEND_API_KEY, NOREPLY_EMAIL, CONTACT_EMAIL} = process.env;
      if (!RESEND_API_KEY) {
        throw new Error("Resend API key not found.");
      }
      const resend = new Resend(RESEND_API_KEY);

      // Send submitted message to receiver
      await resend.emails.send({
        from: `${name} <${NOREPLY_EMAIL}>`,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Submissão de contato - Formulário Web`,
        html: `
          <h3>Mensagem recebida de formulário web</h3>
          <p><strong>Remetente:</strong> ${name} <${email}></p>
          <p><strong>Phone:</strong> ${phoneNumber || 'NÃO FORNECIDO'}</p>
          <p><strong>Mensagem:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        `
      });

      // Send confirmation message to sender
      await resend.emails.send({
        from: `Ana Paula Miranda <${NOREPLY_EMAIL}>`,
        to: email,
        subject: 'Confirmação de envio - Ana Paula Miranda | Advogada Criminal',
        html: `
          <p>Dear ${name},</p>
          <p>Thank you for contacting us. This confirms we have received your message.</p>
          <p><strong>Your message:</strong><br>${message}</p>
          <p>Best regards,<br>The Law Office</p>
        `
      })

      // Return success response
      ctx.send({
        message: "Mensagem enviada com sucesso!",
      })
      
    } catch (err) {
      strapi.log.error('Error during contact submission processing:', err);
      return ctx.internalServerError('Um erro ocorreu durante o envio da mensagem.', err);
    }
  }
};
