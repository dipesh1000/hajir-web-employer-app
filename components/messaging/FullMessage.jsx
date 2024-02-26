"use client";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import attached1 from "@/public/messaging/attached1.png";
import attached2 from "@/public/messaging/attached2.png";
import attached3 from "@/public/messaging/attached3.png";
import {
  useGetLeaveDetailsQuery,
  useUpdateCandidiateLeaveMutation,
} from "@/services/api";
import { useParams } from "next/navigation";

const FullMessage = ({
  message,
  name,
  img,
  reason,
  start_date,
  end_date,
  leave_id,
  time_ago,
}) => {
  const { companyId } = useParams();
  console.log(companyId);
  const { data: leavedetails, isLoading: isLoading } = useGetLeaveDetailsQuery({
    company_id: companyId,
    leave_id,
  });
  const [updateCandidiateLeave] = useUpdateCandidiateLeaveMutation(leave_id);

  console.log("leave details coming ", leavedetails);
  const leavetype = leavedetails?.data?.leavedetail?.type;
  const remarks = leavedetails?.data?.leavedetail?.remarks;
  const status = leavedetails?.data?.leavedetail?.status;
  const pay_status = leavedetails?.data?.leavedetail?.pay_status;
  const file = leavedetails?.data?.leavedetail?.attachment;

  console.log("FullMessage component is rendering");
  console.log("reason is consoling", reason);
  const isScreenSmall = useMediaQuery("(max-width:1500px)");
  const isExtraSmallScreen = useMediaQuery("(max-width:900px)");

  const buttonWidth = isScreenSmall ? "170px" : "220px";

  const handleApprove = () => {
    updateCandidiateLeave({ leave_id, status: "Approved", payStatus: "Paid" });
  };

  const handleReject = () => {
    updateCandidiateLeave({
      leave_id,
      status: "Rejected",
      payStatus: "Unpaid",
    });
  };

  return (
    <>
      <div style={{ marginTop: "-170px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              src={img || attached1}
              width={70}
              height={60}
              alt="profile image"
            />
            <p style={{ marginLeft: "10px" }}>{name}</p>
          </div>
          <div
            style={{
              alignItems: "center",
              marginLeft: isScreenSmall ? "120px" : "320px",
            }}
          >
            <p style={{ marginTop: "-7px" }}>{time_ago}</p>
          </div>
        </div>
        <div>{remarks}</div>
        <hr
          style={{
            width: "100%",
            margin: "0",
            marginBottom: "30px",
            marginTop: "20px",
            borderTop: "1px dotted #ddd",
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "-10px" }}
        >
          <div style={{ flex: 1 }}>
            <div>
              <p>
                Leave <br /> <strong> {reason} </strong>
              </p>
            </div>
            <div>
              <p>
                Duration from <br /> <strong>{start_date}</strong>
              </p>
            </div>
            <div>
              <p>
                No. of days <br />
                <strong> need from backend </strong>
              </p>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: isExtraSmallScreen
                ? "20px"
                : isScreenSmall
                ? "70px"
                : "220px",
            }}
          >
            {" "}
            {/* Adjust margin based on screen size */}
            <div>
              <p>
                Type <br /> <strong>{leavetype} day</strong>
              </p>
            </div>
            <div>
              <p>
                Duration till <br /> <strong>{end_date}</strong>{" "}
              </p>
            </div>
          </div>
        </div>
        <Typography style={{ marginTop: "9px" }}>Attached</Typography>
        {status !== "Approved" && status !== "Rejected" && (
          <FormControl
            style={{ width: "100%", height: "100px", marginTop: "20px" }}
          >
            <Select
              variant="outlined"
              value={pay_status === "Paid" ? "Paid" : "Unpaid"}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)",
                },
              }}
            >
              <MenuItem value="Paid">Mark as paid leave</MenuItem>
              <MenuItem value="Unpaid">Mark as unpaid leave</MenuItem>
            </Select>
          </FormControl>
        )}
        {status === "Approved" && (
          <Typography style={{ marginTop: "9px" }}>Already Approved</Typography>
        )}
        {status === "Rejected" && (
          <Typography style={{ marginTop: "9px" }}>Already Rejected</Typography>
        )}
        {status !== "Approved" && status !== "Rejected" && (
          <div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={handleReject}
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  height: "40px",
                  width: buttonWidth,
                }}
              >
                Rejected
              </Button>
              <Button
                onClick={handleApprove}
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  height: "40px",
                  width: buttonWidth,
                }}
              >
                Approved
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FullMessage;
