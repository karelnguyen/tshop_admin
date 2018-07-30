import React from 'react'
import AddProductPage from './AddProductPage'
import ProductCatalogPage from './ProductCatalogPage'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  AddProductPage: {
    marginTop: '30px',
  },
  ProductCatalogPage: {
  }
})

function Home (props) {
  const { classes } = props
  return (
    <div>
      <Typography variant="display3" gutterBottom color="primary">
        Dashboard
      </Typography>
      <Grid container direction="column">
        <ProductCatalogPage className={classes.ProductCatalogPage}/>
        <AddProductPage className={classes.AddProductPage}/>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Home)
