import React from 'react'
import ProductsService from '../services/api/products'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

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
  }
})

class AddProductPage extends React.Component {
  state = {
    allProducts: [],
    input: {}
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({ allProducts: response.data })
      })
  }

// TODO: chybi validace vstupu
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
      .then(response => {
        console.log('podarilo se POST:', data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  saveInputData (event) {
    let data = this.state.input
    data[event.target.id] = event.target.value
    this.setState({ input: data })
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
              error={false}
            />
            <TextField
              id="shortText"
              label="short text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              fullWidth={true}
            />
            <TextField
              id="longText"
              label="long text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
              fullWidth={true}
            />
            <TextField
              id="size"
              label="size"
              placeholder="XXL"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
            />
            <TextField
              id="price"
              label="price"
              placeholder="1000"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
            />
            <TextField
              id="img"
              label="img"
              placeholder="zatim string"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
            />
            <Tooltip id="tooltip-fab" title="Add" >
              <span>
                <Button className={classes.btn} variant="fab" color="primary" aria-label="Add" disabled={false} onClick={this.addProduct.bind(this)}>
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
