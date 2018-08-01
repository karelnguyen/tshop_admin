import React from 'react'
import ProductsService from '../../services/api/products'
import Validator from '../../mixins/validation'
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
    width: '70%',
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
    marginTop: '20px'
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

    this.state = {
      allProducts: [],
      input: {},
      validation: {
        heading: false,
        shortText: false,
        longText: false,
        color: false,
        price: false,
      },
      size: '',
      showAddButtonBool: true,
      inputErrors: {},
    }
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({ allProducts: response.data })
      })
  }

  async addProduct () {
    await this.getAllProducts()

    let idArr = []
    let data = this.state.input

    this.state.allProducts.map( x => x.hasOwnProperty('id') ? idArr.push(x.id) : x )
    idArr = idArr.map(id => Number(id))
    let id = isFinite(Math.max(...idArr) + 1) ? Math.max(...idArr) + 1 : 1
    data['id'] = id

    return ProductsService
      .add(data)
      .then(() => {
        window.location.reload()
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
      this.setState({ showAddButtonBool: false })
    } else {
      this.setState({ showAddButtonBool: true })
    }
  }

  handleSize = prop => event => {
    this.setState({ [prop]: event.target.value })
    let data = this.state.input
    data['size'] = event.target.value
  }

  render () {
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
              value={this.state.input.heading}
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
            />
            <TextField
              id="img"
              label="img"
              placeholder="zatim string"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData}
              required={true}
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
            />
            <Tooltip id="tooltip-fab" title="Add">
              <span>
                <Button
                  className={classes.btn}
                  type="button"
                  variant="fab"
                  color="primary"
                  aria-label="Přidat"
                  disabled={this.state.showAddButtonBool}
                  onClick={this.addProduct}>
                  <AddIcon/>
                </Button>
              </span>
            </Tooltip>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AddProductPage)
