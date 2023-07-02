import * as React from "react";
import List from "@mui/material/List";
import NavLinks from "./NavLinks";
import NavMenuItem from "./NavMenuItem";
import { Box } from "@mui/material";

export default function SidebarContent() {
  return (
    <Box sx={{ pt: 5 }}>
      {NavLinks.map((navItem) => {
        const [key, value] = Object.entries(navItem)[0];
        return (
          <List key={key}>
            {value.items.map((item, index) => {
              return <NavMenuItem key={index} menu={item} />;
            })}
          </List>
        );
      })}
    </Box>
  );
}
