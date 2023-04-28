import styled from "@emotion/styled";
import { Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import successLogo from "../../asserts/successSvg.svg";
import errorLogo from "../../asserts/errorSvg.svg";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInvitedMail } from "../../redux/slices/contactSlice";
import StandardButton from "../../libs/Buttons/StandardButton";
const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};
  width: 50rem;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
  transform: scale(0.9);
`;
const MailButton = styled(Button)`
  width: 9em;
  height: 2.8em;
  font-weight: 600;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.palette.secondary.main};
`;
const EmailSentStatus = () => {
  const { inviteMailStatus, invitedMail } = useSelector(
    (state) => state.contact
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!invitedMail) {
      navigate(-1);
    }
  }, [invitedMail, navigate]);
  const goBack = () => {
    dispatch(setInvitedMail(""));
    navigate("/auth/invite-user");
  };
  return (
    <Wrapper>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        {/* <img
          src={inviteMailStatus ? successLogo : errorLogo}
          style={{ width: "8rem" }}
          alt="sentImage"
        /> */}
        <Typography
          sx={{ mb: 2 }}
          // component="h1"
          variant="body1"
          align="left"
          gutterBottom
          textAlign={"center"}
          dangerouslySetInnerHTML={{
            __html: inviteMailStatus
              ? `Your invitation has been successfully sent to ${invitedMail}`
              : `Your invitation has not been successfully sent to ${invitedMail}` +
                " <br />",
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          <StandardButton
            sx={{ fontSize: 14.2 }}
            text="Back"
            onClick={goBack}
            variant="contained"
          />
          {/* <MailButton onClick={} variant="contained">
            Invite
          </MailButton> */}
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default EmailSentStatus;
