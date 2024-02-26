"use client";
import React, { useState } from "react";
import MessageBox from "./MessageBox";
import Image from "next/image";
import Mailsent from "@/public/messaging/Mailsent.png";
import { useMediaQuery } from "@mui/material";
import FullMessage from "./FullMessage";
import { useParams } from "next/navigation";
import { useGetCompanyCandidateLeavesQuery } from "@/services/api";
import { formatTimestamp } from "@/utils/FormatTimestamp";
import attached1 from "@/public/messaging/attached1.png";

const Messaging = () => {
  const { companyId } = useParams();
  const { data: companyCandidateLeaves, isLoading: isLoading } =
    useGetCompanyCandidateLeavesQuery(companyId);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageBoxScrollPosition, setMessageBoxScrollPosition] = useState(0);
  const isScreenSm = useMediaQuery("(max-width:1255px)");
  const isScreenExtraSmall = useMediaQuery("(max-width:950px)");

  const handleMessageBoxClick = (message) => {
    setSelectedMessage(message);
  };

  const handleMessageBoxScroll = (e) => {
    setMessageBoxScrollPosition(e.target.scrollTop);
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          maxHeight: "80vh",
          overflowY: "auto",
          marginRight: "20px",
        }}
        onScroll={handleMessageBoxScroll}
      >
        {companyCandidateLeaves?.data?.candidates.map((msg, index) => (
          <MessageBox
            key={index}
            img={msg.profile_image || "attached1"}
            name={msg.name}
            time_ago={msg.created_at}
            timeAgo={formatTimestamp(msg.created_at)}
            reason={msg.leave_type.title}
            message={msg.leave_type.desc || "No description"}
            status={msg.status}
            onClick={() => handleMessageBoxClick(msg)}
          />
        ))}
      </div>

      <div style={{ flex: "1", width: isScreenSm ? "50%" : "650px" }}>
        {selectedMessage ? (
          <FullMessage
            message={selectedMessage.message}
            name={selectedMessage.name}
            img={selectedMessage.profile_image}
            status={selectedMessage.status}
            reason={selectedMessage.leave_type.title}
            start_date={selectedMessage.start_date}
            end_date={selectedMessage.end_date}
            leave_id={selectedMessage.leave_id}
          />
        ) : isScreenExtraSmall ? null : (
          <Image
            src={Mailsent}
            alt="Default"
            height={700}
            layout="responsive"
            style={{ marginTop: "-80px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Messaging;
