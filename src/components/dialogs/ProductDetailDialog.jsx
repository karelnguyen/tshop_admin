import React from 'react'
import UpdateProductDialog from './UpdateProductDialog'
import DeleteProductDialog from './DeleteProductDialog'
import ProductsService from '../../services/api/products'
import NoImgPlaceholder from '../../assets/placeholder-noimg.png'
import httpCommon from '../../services/http-common'
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
  root: {
  },
  dialogRoot: {
    padding: '80px',
    backgroundColor: '#e2e0e0',
    height: '100vh'
  },
  boxes: {
    height: '50vh',
  },
  paper: {
    padding: '40px',
  },
  topBar: {
    marginTop: '30px',
    marginBottom: '40px'
  },
  imgWrapper: {
    objectFit: 'fit',
    height: '100%'
  },
  placeholderImg: {
    height: '100%',
    width: '100%'
  },
  backBtn: {
    height: '20px'
  },
  textDetailPaper: {
    padding: '5px',
    paddingTop: '15px',
    marginBottom: '10px'
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ProductDetailDialog extends React.Component {
  constructor () {
    super ()
    this.getProductDetails = this.getProductDetails.bind(this)
    this.state = {
      productDetailBool: false,
      productDetails: {},
      imageArray: []
    }
  }

  async showProductDetail () {
    await this.getProductDetails()
    this.state.productDetails.img.map(img => {
      let imgArr = this.state.imageArray
      imgArr.push(img)
      return this.setState({ imageArray: imgArr })
    })
    this.setState({ productDetailBool: true })
  }

  hideProductDetail () {
    this.setState({
      productDetailBool: false,
      imageArray: []
    })
  }

  getProductDetails () {
    ProductsService
      // .getOne(this.props.id)
      // .then(response => {
      //   this.setState({ productDetails: response.data})
      // })
  }

  render () {
    const { classes } = this.props
    const { productDetailBool, productDetails, imageArray } = this.state
    return (
      <div className={classes.root}>
        <Tooltip id="tooltip-fab" title="Zobrazit produkt" >
          <Button
            variant="fab"
            color="primary"
            aria-label="Product detail"
            onClick={this.showProductDetail.bind(this)}
            >
            <AssignmentIcon />
          </Button>
        </Tooltip>
        <Dialog
          TransitionComponent={Transition}
          open={productDetailBool}
          fullScreen
          >
          <Grid container className={classes.dialogRoot} justify="center">
            <Grid item  lg={8}>
              <Grid container justify="center">
                <Grid item xs={12} sm={12} className={classes.topBar}>
                  <Grid container direction="row" justify="space-between" alignItems="center">
                    <Button variant="raised" color="primary" onClick={this.hideProductDetail.bind(this)}
                      className={classes.backBtn}>
                      Back
                    </Button>
                    <Grid item>
                      <Grid container spacing={8}>
                        <Grid item><UpdateProductDialog tableData={productDetails} rerenderProducts={this.getProductDetails}/></Grid>
                        <Grid item><DeleteProductDialog tableData={productDetails} rerenderProducts={this.getProductDetails}/></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container direction="row" justify="space-between" spacing={24}>
                    <Grid item xs={7} sm={7}>
                      <div className={`${classes.boxes} ${classes.textContent}`}>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                name:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="headline" gutterBottom>{productDetails.heading}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                id:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="body1" gutterBottom>{productDetails.id}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                short text:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="body1" gutterBottom>{productDetails.shortText}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                long text:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="body1" gutterBottom>{productDetails.longText}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                size:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="body1" gutterBottom>{productDetails.size}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                color:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="body1" gutterBottom>{productDetails.color}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} direction="row" alignItems="center">
                          <Grid item xs={2} sm={2} lg={2}>
                              <Typography variant="button" gutterBottom>
                                price:
                              </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10}>
                            <Paper className={classes.textDetailPaper}>
                              <Typography variant="body1" gutterBottom>{productDetails.price}</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                      {
                        imageArray.length === 0
                        ?
                        <Grid item xs={5} sm={5}>
                          <Paper className={`${classes.boxes} ${classes.imgGridWrapper}`}>
                            <div className={classes.imgWrapper}>
                              <img alt="img" src={NoImgPlaceholder} className={classes.placeholderImg}/>
                            </div>
                          </Paper>
                        </Grid>
                        :
                        imageArray.map(img => {
                          return (
                            <Grid  key={img} item xs={5} sm={5}>
                              <Paper className={`${classes.boxes} ${classes.imgGridWrapper}`}>
                                <div className={classes.imgWrapper}>
                                  <img alt="img" src={`${httpCommon.baseURL}product/image/${img}`} className={classes.placeholderImg}/>
                                </div>
                              </Paper>
                            </Grid>
                          )
                        })
                      }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ProductDetailDialog)
