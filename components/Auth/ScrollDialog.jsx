// ScrollDialog.js
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
    >
      <DialogTitle id="scroll-dialog-title">
        HajirApp Terms of Service
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          Acceptance of Terms Welcome to HajirApp! By using our mobile
          application the app you agree to comply with and be bound by the
          following Terms of Service terms . If you do not agree to these Terms,
          please do not use the App. 2. Use of the App 2.1 License: We grant you
          a limited, non-exclusive, revocable license to use the App for your
          personal or business use. 2.2 User Account: To access certain features
          of the App, you may be required to create an account. You are
          responsible for maintaining the confidentiality of your account
          information. 2.3 Prohibited Activities: You agree not to engage in any
          prohibited activities, including but not limited to unauthorized
          access, use, or distribution of the App. 3. Privacy Policy Our Privacy
          Policy outlines how we collect, use, and protect your personal
          information. By using the App, you agree to the terms of our Privacy
          Policy. 4. Intellectual Property All content and materials available
          on the App are the property of HajirApp and are protected by
          intellectual property laws. You may not use, modify, reproduce, or
          distribute any content without our written permission. 5. Limitation
          of Liability To the extent permitted by law, HajirApp and its
          affiliates shall not be liable for any direct, indirect, incidental,
          or consequential damages arising out of the use or inability to use
          the App. 6. Termination We reserve the right to terminate or suspend
          your account and access to the App at our sole discretion, without
          notice, for any reason, including violation of these Terms. 7. Changes
          to Terms HajirApp reserves the right to update or modify these Terms
          at any time. Your continued use of the App after such changes
          constitutes your acceptance of the new Terms. 8. Governing Law These
          Terms are governed by and construed in accordance with the laws of
          2062.and okay
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
}
