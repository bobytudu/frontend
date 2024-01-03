import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BorderedBox from "components/box/BorderedBox";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import InlineBox from "components/box/InlineBox";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SpecificationTableProps {
  data: { name: string; details: string }[];
}

export default function SpecificationTable({ data }: SpecificationTableProps) {
  const [showSpecification, setShowSpecification] = React.useState(false);
  return (
    <Box border="1px solid rgba(0,0,0,0.1)" my={3} borderRadius={1}>
      <InlineBox justifyContent="space-between" p={1} px={2}>
        <Typography variant="h6">Specifications</Typography>
        <IconButton onClick={() => setShowSpecification(!showSpecification)}>
          <ExpandMoreIcon
            sx={{
              transform: showSpecification ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </IconButton>
      </InlineBox>
      <Collapse in={showSpecification}>
        <BorderedBox borderTop="1px solid rgba(0,0,0,0.1)">
          <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 1 }}>
            In The Box
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            1 Wind Spinner
          </Typography>
        </BorderedBox>
        <BorderedBox showBorder={false}>
          <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 1 }}>
            General
          </Typography>
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BorderedBox>
      </Collapse>
    </Box>
  );
}
