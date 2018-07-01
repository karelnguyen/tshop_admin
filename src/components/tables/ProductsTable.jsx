import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

function ProductsTable (props) {
  console.log('id pdts', props.products)
  let products = props.products.map(item => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.heading}</TableCell>
        <TableCell>{item.price}</TableCell>
      </TableRow>
    )
  })
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>název</TableCell>
            <TableCell>cena</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{products}</TableBody>
      </Table>
    </Paper>
  )
}

export default ProductsTable
