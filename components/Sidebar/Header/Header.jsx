// // Header.jsx
// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Search from "./Search";
// import ProfileMenu from "./ProfileMenu";
// import HeaderMenu from "./HeaderMenu";
// import Image from "next/image";

// const Header = ({ onMenuIconClick }) => (
//   <AppBar position="fixed" elevation={1} color="transparent" >
//     <Toolbar>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <Image src="/hajir-logo.png" width={140} height={50} alt="Hajir Logo" />
//       </div>

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           marginLeft: "56px",
//           gap: "100px",
//           flexGrow: 1,

//           justifyContent: "space-between",
//         }}
//       >
//         <Search />

//         <HeaderMenu />
//       </div>
//     </Toolbar>
//   </AppBar>
// );

// export default Header;

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";

const Header = ({ onMenuIconClick }) => (
  
  <AppBar position="fixed" elevation={1} color="inherit" style={{ zIndex: 999 }}  >
    <Toolbar>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image src="/hajir-logo.png" width={140} height={50} alt="Hajir Logo" />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "56px",
          gap: "100px",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Search />
        <HeaderMenu />
      </div>
    </Toolbar>
  </AppBar>

);

export default Header;
