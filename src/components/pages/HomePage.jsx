import React from 'react'
import AddProductPage from './AddProductPage'
import ProductCatalogPage from './ProductCatalogPage'
// Material-ui
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
      <Typography variant="display2" gutterBottom color="primary">
        Dashboard
      </Typography>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" color="primary">Produktový katalog</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ProductCatalogPage className={classes.ProductCatalogPage}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" color="primary">Přidat produkt</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <AddProductPage className={classes.AddProductPage}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  )
}

export default withStyles(styles)(Home)
