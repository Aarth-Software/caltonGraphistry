import { v4 as uuidv4 } from "uuid";
export const InviteMailBody = (email, name) => {
  const baseURL = process.env.REACT_APP_CLIENT_URL;
  const uniqueId = uuidv4();
  const now = new Date();
  const doc = {
    email: email,
    name: name,
    activeLink: true,
    uuid: uniqueId,
    created: now.toISOString(),
  };
  const body = `<h4>Hello ${name},</h4></br>
    <p>This is your invitation email to sign up for LitDig. Please <a href="${baseURL}/auth/sign-up?email=${encodeURIComponent(
    email
  )}&token=${encodeURIComponent(
    uniqueId
  )}">Sign up</a> to start using LitDig.</p></br><p>LitDig helps researchers and practitioners conduct their research work faster and better.</p></br>
  <p>Please <a href="${baseURL}/contact-us">Contact us</a> for help or feedback.</p></br></br>
  <div>Happy Digging</div>
  <div>LitDig Team</div>
    `;
  let output = {
    body: {
      body: body,
      email_to: email,
      subject: "litDig signup invitation",
    },
    doc: doc,
  };
  return output;
};
