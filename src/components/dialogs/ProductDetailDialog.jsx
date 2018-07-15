import React from 'react'
import UpdateProductDialog from './UpdateProductDialog'
import DeleteProductDialog from './DeleteProductDialog'
import ProductsService from '../../services/api/products'
import NoImgPlaceholder from '../../assets/placeholder-noimg.png'
// Material-ui
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  dialogRoot: {
    padding: '80px'
  },
  boxes: {
    height: '60vh',
    backgroundColor: '#d6d1d1',
    objectFit: 'cover',
  },
  paper: {
    padding: '40px',
  },
  topBar: {
    marginTop: '30px',
    marginBottom: '40px'
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
    this.getProductDetails()
    this.setState({ productDetailBool: true })
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
      <div className={classes.root}>
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
            <Grid container>
              <Grid item xs={12} sm={12} className={classes.topBar}>
                <Grid container direction="row" justify="space-between">
                  <Button variant="contained"  onClick={() => {this.hideProductDetail()}}>
                    Back</Button>
                  <Grid item>
                    <Grid container spacing={8}>
                      <Grid item><UpdateProductDialog tableData={this.state.productDetails} /></Grid>
                      <Grid item><DeleteProductDialog tableData={this.state.productDetails} /></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={8} justify="space-between">
                  <Grid item xs={12} sm={6} className={classes.boxes}>
                    <Typography variant="subheading" gutterBottom color="primary">id: {productDetails.id}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">_id: {productDetails._id}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">name: {productDetails.heading}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">color: {productDetails.color}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">price: {productDetails.price}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">size: {productDetails.size}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">shortText: {productDetails.shortText}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">longText: {productDetails.longText}</Typography>
                    <Typography variant="subheading" gutterBottom color="primary">updatedAt: {productDetails.updatedAt}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.boxes} >
                    <img alt="placeholder" src={NoImgPlaceholder} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ProductDetailDialog)
