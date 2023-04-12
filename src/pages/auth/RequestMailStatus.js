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
const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};
  width: 50rem;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
  transform: scale(0.8);
`;
const MailButton = styled(Button)`
  width: 9em;
  height: 2.8em;
  font-weight: 600;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.palette.secondary.main};
`;
const RequestMailStatus = () => {
  const { requestMailStatus } = useSelector((state) => state.contact);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (requestMailStatus === null) {
      navigate("/contact-us");
    }
  }, [requestMailStatus, navigate]);
  const goBack = () => {
    dispatch(setInvitedMail(""));
    navigate("/contact-us");
  };
  return (
    <Wrapper>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <img
          src={requestMailStatus ? successLogo : errorLogo}
          style={{ width: "8rem" }}
          alt="sentImage"
        />
        <Typography
          sx={{ mb: 2 }}
          component="h1"
          variant="h2"
          align="left"
          gutterBottom
          textAlign={"center"}
        >
          {requestMailStatus ? "Thank you!!" : "Opps!!"}
        </Typography>
        <Typography
          sx={{ mb: 2 }}
          component="h1"
          variant="h2"
          align="left"
          gutterBottom
          textAlign={"center"}
          dangerouslySetInnerHTML={{
            __html: requestMailStatus
              ? `Your request has been sent successfully to` +
                "<br />" +
                `Litdig team`
              : `Your sending request failed`,
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          <MailButton onClick={goBack} variant="contained">
            Back
          </MailButton>
          {/* <MailButton onClick={} variant="contained">
            Invite
          </MailButton> */}
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default RequestMailStatus;
