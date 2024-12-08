export const UNAUTHENTICATED_ROUTES = [
  "/login",
  "/reset-password",
  "/forgot-password",
  "/signup",
];

export const ForgotPasswordEmail = {
  FROM: "dev@pinegap.us",
  SUBJECT: "Password Reset Request",
  BODY: "Click the following link to reset your password: ",
};

export const SignupEmail = {
  FROM: "info@pinegap.us",
  SUBJECT: (name: string) => `Pinegap Credentials <> ${name}`,
  BODY: (name: string, email: string, password: string) => `
        <p>Hi ${name},</p>
        
        <p>Thank you for letting us demonstrate the capabilities of PineGap AI during our recent demo session. We are thrilled to provide you with exclusive access, allowing you to explore all the features we discussed at your own pace.</p>
        
        <p>Your login details are as follows:<br>
        <b>Username:</b> ${email}<br>
        <b>Password:</b> ${password}<br></p>
        
        <p>You can access the platform here: <a href="https://web.pinegap.ai">web.pinegap.ai</a></p>
        
        <p>We recommend changing your password upon your first login for security purposes. If you encounter any issues or have questions as you navigate through the platform, please do not hesitate to reach out to us.</p>
        
        <p>We are eager to hear your thoughts and feedback as you explore PineGap.ai. Your insights are invaluable in helping us enhance our offerings.</p>
        
        <p>Enjoy your exploration!</p>
        
        Best regards,<br>
        Ankit Varmani<br>
        Co-Founder @ <a href="https://www.pinegap.ai">PineGap.ai</a><br>
        <a href="https://www.linkedin.com/in/ankitvarmani/">LinkedIn</a></p>
    `,
  BCC: "deepak@pinegap.us,ankit@pinegap.us,harshit@pinegap.us",
};
