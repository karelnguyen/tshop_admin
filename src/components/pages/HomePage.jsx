import React from 'react'
import AddProductPage from './AddProductPage'
import ProductCatalogPage from './ProductCatalogPage'
// Material-ui
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import amber from '@material-ui/core/colors/amber'

// Custom UI theme
const theme = createMuiTheme({
  // palette: {
  //   secondary: amber
  // }
})

const styles = theme => ({
  AddProductPage: {
    marginTop: '30px',
  },
  ProductCatalogPage: {
  },
  // expanel: {
  //   borderRadius: '20px'
  // }
})

function Home (props) {
  const { classes } = props
  return (
    <div>
      
      <MuiThemeProvider theme={theme}>
        <Typography variant="display2" gutterBottom color="secondary">
          Dashboard
        </Typography>
      </MuiThemeProvider>

      <ExpansionPanel className={classes.expanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" >Produktový katalog</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ProductCatalogPage className={classes.ProductCatalogPage}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className={classes.expanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" >Přidat produkt</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AddProductPage className={classes.AddProductPage}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  )
}

export default withStyles(styles)(Home)
