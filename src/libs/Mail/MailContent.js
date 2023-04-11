import { v4 as uuidv4 } from "uuid";
export const InviteMailBody = (email) => {
  const baseURL = process.env.REACT_APP_CLIENT_URL;
  const uniqueId = uuidv4();
  const now = new Date();
  const doc = {
    email: email,
    activeLink: true,
    uuid: uniqueId,
    created: now.toISOString(),
  };
  const body = `<h3>Hello ${email},</h3></br>
    <p>This is your invitation email to sign up for LitDig. Please click <a href="${baseURL}/auth/sign-up?email=${encodeURIComponent(
    email
  )}&token=${encodeURIComponent(uniqueId)}">Click here to sign up</a></br> 
    to complete your sign up and start using LitDig.</p></br>
    LitDig helps researchers and practitioners conduct their research work more effectively literature enables you to access the information faster .`;
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
