import React from 'react'
import ProductsService from '../../services/api/products'
import Validator from '../../mixins/validation'
import AddProductBar from '../snackbars/AddProductBar'
// Material-ui
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  root: {
    width: '100%',
    margin: 'auto',
  },
  paper: {
    padding: '20px',
    paddingBot: '40px',
    backgroundColor: '#e5e6e8',
  },
  input: {
    margin: '5px'
  },
  btn: {
    width: '70px',
    height: '70px',
  },
  sizeLabel: {
    width: '50px',
    flexBasis: 200,
    height: '50px'
  }
})

const sizes = [
  {
    value: 'S',
    label: 'S',
  },
  {
    value: 'M',
    label: 'M',
  },
  {
    value: 'L',
    label: 'L',
  },
]

class AddProductPage extends React.Component {
  constructor() {
    super()
    this.saveInputData = this.saveInputData.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.saveFile = this.saveFile.bind(this)
    this.closeBars = this.closeBars.bind(this)
    this.state = {
      allProducts: [],
      input: {
        color: '',
        heading: '',
        longText: '',
        price: '',
        shortText: '',
      },
      image: null,
      validation: {
        heading: false,
        shortText: false,
        longText: false,
        color: false,
        price: false,
      },
      size: '',
      disabledAddBtn: true,
      inputErrors: {},
      showBar: false,
    }
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({ allProducts: response.data })
      })
  }

  fileUpload (file) {
    const data = new FormData()
    data.append('files', file)
    ProductsService
      .uploadFile(data)
  }

  async addProduct () {
    await this.getAllProducts()
    let allProducts = this.state.allProducts
    let idArr = []
    let data = this.state.input
    const image = this.state.image
    if (image !== null) {
      this.fileUpload(image)
      data['img'] = image.name
    }
    // creating unique id
    allProducts.map( x => x.hasOwnProperty('id') ? idArr.push(x.id) : x )
    if (idArr.length === 0) {
      data['id'] = 1
    } else {
      let id = Math.max(...idArr) + 1
      data['id'] = id
    }
    ProductsService
      .add(data)
      .then(() => {
        this.setState({
          input: {
            color: '',
            heading: '',
            longText: '',
            price: '',
            shortText: '',
          },
          size: '',
          inputErrors: {},
          validation: {},
          disabledAddBtn: true,
          image: null,
          showBar: true,
        })
        this.refs.file.value = null
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
  }

  saveInputData (event) {
    // Validator is set to exact patterns for each input. Adding inputs also require adding additional patterns
    const validator = Validator.testReg(event.target.id, event.target.value)
    const payload = this.state.input
    const validationObj = this.state.validation
    const inputErrors = this.state.inputErrors

    payload[event.target.id] = event.target.value
    this.setState({ input: payload })

    validationObj[event.target.id] = validator
    this.setState({ validation: validationObj })

    inputErrors[event.target.id] = !validator
    this.setState({ inputErrors: inputErrors })

    return this.toggleAddButton()
  }

  toggleAddButton () {
    let anomalyObj = []
    let anomaly = true
    const validationObj = this.state.validation

    for (let i in validationObj) {
      anomalyObj.push(validationObj[i])
    }

    anomalyObj.map(x => x === false ? anomaly = false : null)
    if (anomaly === true) {
      this.setState({ disabledAddBtn: false })
    } else {
      this.setState({ disabledAddBtn: true })
    }
  }

  handleSize = prop => event => {
    this.setState({ [prop]: event.target.value })
    let data = this.state.input
    data['size'] = event.target.value
  }

  saveFile (event) {
    this.setState({ image: event.target.files[0] })
  }

  closeBars (event, reason) {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      showBar: false,
     })
  }

  render () {
    const { input } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container >
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="body2" gutterBottom color="primary">
              Zadejte hodnoty
            </Typography>
            <TextField
              id="heading"
              label="name"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData}
              required={true}
              multiline={true}
              error={this.state.inputErrors.heading}
              value={input.heading}
            />
            <TextField
              id="size"
              select
              label="size"
              value={this.state.size}
              onChange={this.handleSize('size')}
              placeholder="XXL"
              className={classes.sizeLabel}
            >
              {sizes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="shortText"
              label="short text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData}
              fullWidth={true}
              multiline={true}
              required={true}
              error={this.state.inputErrors.shortText}
              value={input.shortText}
            />
            <TextField
              id="longText"
              label="long text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData}
              fullWidth={true}
              multiline={true}
              required={true}
              error={this.state.inputErrors.longText}
              value={input.longText}
            />
            <TextField
              id="color"
              label="color"
              placeholder="black"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData}
              required={true}
              error={this.state.inputErrors.color}
              value={input.color}
            />
            <TextField
              id="price"
              label="price"
              placeholder="1000"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData}
              required={true}
              error={this.state.inputErrors.price}
              value={input.price}
            />
            <Grid container justify="space-between" alignItems="center">
              <form>
                <Typography color="primary" variant="body2">Vyberte obrázek</Typography>
                <input
                  id="image"
                  type="file"
                  onChange={this.saveFile}
                  ref="file"
                  ></input>
              </form>
              <Tooltip id="tooltip-fab" title="Add">
                <span>
                  <Button
                    className={classes.btn}
                    type="button"
                    variant="fab"
                    color="primary"
                    aria-label="Přidat"
                    disabled={this.state.disabledAddBtn}
                    onClick={this.addProduct}>
                    <AddIcon/>
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Paper>
        </Grid>
        <AddProductBar open={this.state.showBar} closeFn={this.closeBars}/>
      </div>
    )
  }
}

export default withStyles(styles)(AddProductPage)
