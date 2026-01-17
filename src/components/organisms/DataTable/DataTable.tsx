import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  format?: (value: any) => string;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
}: DataTableProps<T>): JSX.Element => {
  const rows = useMemo(() => data, [data]);

  if (loading) {
    return (
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      </TableContainer>
    );
  }

  if (rows.length === 0) {
    return (
      <TableContainer component={Paper}>
        <Box p={4}>
          <Typography variant="body2" color="text.secondary" align="center">
            {emptyMessage}
          </Typography>
        </Box>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align || 'left'}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              hover
              onClick={() => onRowClick?.(row)}
              sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((column) => {
                const value = row[column.id as keyof T];
                return (
                  <TableCell key={String(column.id)} align={column.align || 'left'}>
                    {column.format ? column.format(value) : String(value ?? '')}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DataTable.displayName = 'DataTable';

