import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Item from '../interface/Item';

interface MyProp {
  itemsIn: Item[];
}

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate} ${formattedTime}`;
};

export default function TableWeather(props: MyProp) {
  const [rows, setRows] = useState<Item[]>([]);
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Filas por página

  useEffect(() => {
    setRows(props.itemsIn);
  }, [props.itemsIn]);

  // Función para manejar el cambio de página
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Función para manejar el cambio de filas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Regresar a la primera página
  };

  // Calculamos los datos que se mostrarán en la página actual
  const currentRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hora de inicio</TableCell>
            <TableCell align="right">Hora de fin</TableCell>
            <TableCell align="right">Precipitación</TableCell>
            <TableCell align="right">Humedad</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Iteramos sobre los datos actuales para mostrar solo los de la página */}
          {currentRows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">{formatDate(row.dateStart)}</TableCell>
              <TableCell align="right">{formatDate(row.dateEnd)}</TableCell>
              <TableCell align="right">{row.precipitation}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Opciones de filas por página
        component="div"
        count={rows.length} // Total de filas
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
