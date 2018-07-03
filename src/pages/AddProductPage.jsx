import React from 'react'
import ProductsService from '../services/api/products'
import Validation from '../mixins/validation'
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
  paper: {
    padding: '20px',
    paddingBot: '40px'
  },
  input: {
    margin: '5px'
  },
  btn: {
    marginLeft: '60px',
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
  state = {
    allProducts: [],
    input: {},
    validation: {},
    size: '',
    addButton: true
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({ allProducts: response.data })
      })
      .catch(err => {
        console.log('Error', err)
      })
  }

  // TODO: enable addButton
  // toggleDisabledButton () {
  //   this.state.validation.length === 0 ? this.setState({ addButton: false }) : this.setState({ addButton: true })
  // }

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
      .catch(err => {
        console.log('Error', err)
      })
  }

  saveInputData (event) {
    let data = this.state.input
    data[event.target.id] = event.target.value
    this.setState({ input: data })

    if (Validation.testReg(event.target.id, event.target.value) === false) {
      let errorData = this.state.validation
      errorData[event.target.id] = true
      this.setState({ validation: errorData })
    } else {
      this.setState({ validation: {} })
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
      <div>
        <Typography variant="display3" gutterBottom color="primary">
          Přidat produkt
        </Typography>
        <Grid container >
          <Paper className={classes.paper}>
            <Typography variant="body2" gutterBottom color="primary">
              Zadejte hodnoty
            </Typography>
            <TextField
              id="heading"
              label="name"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              required={true}
              multiline={true}
              error={this.state.validation.heading}
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
              onChange={this.saveInputData.bind(this)}
              fullWidth={true}
              multiline={true}
              required={true}
              error={this.state.validation.shortText}
            />
            <TextField
              id="longText"
              label="long text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              fullWidth={true}
              multiline={true}
              required={true}
              error={this.state.validation.longText}
            />
            <TextField
              id="color"
              label="color"
              placeholder="black"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              required={true}
              error={this.state.validation.color}
            />
            <TextField
              id="img"
              label="img"
              placeholder="zatim string"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              required={true}
            />
            <TextField
              id="price"
              label="price"
              placeholder="1000"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              required={true}
              type="number"
              error={this.state.validation.price}
            />
            <Tooltip id="tooltip-fab" title="Add" >
              <span>
                <Button
                  className={classes.btn}
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  disabled={this.state.addButton}
                  onClick={this.addProduct.bind(this)}>
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
