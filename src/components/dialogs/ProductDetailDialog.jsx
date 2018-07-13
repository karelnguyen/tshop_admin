import React from 'react'
import ProductsService from '../../services/api/products'
import UpdateProductDialog from './UpdateProductDialog'
import DeleteProductDialog from './DeleteProductDialog'
// Material-ui
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  dialogRoot: {
    padding: '50px'
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ProductDetailDialog extends React.Component {
  state = {
    productDetailBool: false,
    productDetails: {}
  }

  showProductDetail () {
    this.setState({ productDetailBool: true })
    this.getProductDetails()
  }

  hideProductDetail () {
    this.setState({ productDetailBool: false })
  }

  getProductDetails () {
    return ProductsService
      .getOne(this.props.id)
      .then(response => {
        this.setState({ productDetails: response.data})
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  render () {
    const { classes } = this.props
    const { productDetailBool, productDetails } = this.state
    return (
      <div>
        <Tooltip id="tooltip-fab" title="Zobrazit produkt" >
          <Button
            variant="fab"
            color="primary"
            aria-label="Update"
            onClick={() => {
              this.showProductDetail()
            }}
            >
            <AssignmentIcon />
          </Button>
        </Tooltip>
        <Dialog
          TransitionComponent={Transition}
          open={productDetailBool}
          fullScreen
          >
          <div  className={classes.dialogRoot}>
            <Grid item>
              <Button
                onClick={() => {
                  this.hideProductDetail()
                }}
                >Close</Button>
              <Typography variant="display1" gutterBottom color="default">
                {productDetails.heading}
              </Typography>
              <UpdateProductDialog tableData={this.state.productDetails} />
              <DeleteProductDialog tableData={this.state.productDetails} />
            </Grid>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ProductDetailDialog)
