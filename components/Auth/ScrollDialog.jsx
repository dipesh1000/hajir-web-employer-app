// ScrollDialog.js
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function ScrollDialog({ open, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      sx={{
        padding: "16px",
        fontWeight:"100",
       
      }}   >
      <DialogTitle id="scroll-dialog-title">
        HajirApp Terms of Service
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1} sx={{ fontSize: "7px", gap: "1px", fontWeight:"200" }}>
          <h1 style={{      fontWeight:"400"}}>
            <b> 1.Acceptance of Terms </b>
           <br />
            Welcome to HajirApp! By using our mobile
            application the app you <br /> acknowledge and agree to comply with and be bound by the
            following Terms of Service ("terms"). <br /> If you do not agree to these Terms,
            please do not use the App.
          </h1>
          <h1 style={{      fontWeight:"100"}}>
            <b>    2. Use of the App</b>
   <br /> 
          
            2.1 License: We grant you
            a limited, non-exclusive, revocable <br /> license to use the App for your
            personal or business use.
          </h1> 
          <h1 style={{      fontWeight:"100"}}>
            2.2 User Account: To access certain features
            of the App, you may be required to create an account.<br /> You are
            responsible for maintaining the confidentiality of your account
            information.
          </h1>
          <h1 style={{      fontWeight:"100"}}>
            2.3 Prohibited Activities: You agree not to engage in any
            prohibited activities, including but not limited to unauthorized
            access, use, or distribution of the App.
          </h1>
          <h1 style={{      fontWeight:"100"}}>
            <b>  3. Privacy Policy Our Privacy <br/></b>
          
            Policy outlines how we collect, use, and protect your personal
            information. By using the App, you agree to the terms of our Privacy
            Policy.
          </h1>
          <h1 style={{      fontWeight:"100"}}>
            <b> 4. Intellectual Property </b>
           <br />All content and materials available
            on the App are the property of HajirApp and<br /> are protected by
            intellectual property laws. You may not use, modify, reproduce, or
            distribute any content without our written permission.<br />
          </h1>
          <h1 style={{      fontWeight:"100"}}>
            <b>   5. Limitation
            of Liability</b>
         <br/>
             To the extent permitted by law, HajirApp <br /> and its
            affiliates shall not be liable for any direct, indirect, incidental,
            or consequential damages arising out of the use or inability to use
            the App.<br />
          </h1>
          <h1 style={{      fontWeight:"100"}}>
            <b>  6. Termination </b>
          <br /> We reserve the right to terminate or suspend
            your account and access to the App at our sole discretion, without
            notice, for any reason, including violation of these Terms.
            </h1>
            <h1 style={{      fontWeight:"100"}}>
              <b>  7. Changes to Terms</b>
       <br/> HajirApp reserves the right to update or modify these Terms
            at any time.<br />
             Your continued use of the App after such changes
            constitutes your acceptance of the new Terms.
            </h1>
            <h1 style={{      fontWeight:"100"}}>
              <b>       8. Governing Law </b>
     <br/>
         These Terms are governed by and construed in accordance with the laws of
            2062.
          </h1>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
}
