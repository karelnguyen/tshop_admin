import React from 'react'
import Typography from '@material-ui/core/Typography'
import UpdateProductDialog from '../components/dialogs/UpdateProductDialog'

function Home () {
  return (
    <Typography variant="display3" gutterBottom color="primary">
      <UpdateProductDialog />
    </Typography>
  )
}

export default Home
