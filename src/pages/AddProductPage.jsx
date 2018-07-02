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
    padding: '20px'
  },
  input: {
    margin: '5px',
    width: '150px'
  },
  btn: {
    marginLeft: '40px'
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
        this.setState({allProducts: response.data})
      })
  }

// TODO: chybi validace vstupu
  async addProduct () {
    await this.getAllProducts()

    let idArr = []
    let data = this.state.input
    this.state.allProducts.map(x => x.hasOwnProperty('id') ? idArr.push(x.id) : x)
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
        <Typography variant="display3" gutterBottom>
          Přidat produkt
        </Typography>
        <Grid container >
          <Paper className={classes.paper}>
            <Typography variant="body2" gutterBottom>
              Zadejte hodnoty
            </Typography>
            <TextField
              id="heading"
              label="name"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
            />
            <TextField
              id="shortText"
              label="short text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
            />
            <TextField
              id="longText"
              label="long text"
              placeholder="abc"
              margin="normal"
              className={classes.input}
              onChange={this.saveInputData.bind(this)}
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
            <Tooltip id="tooltip-fab" title="Add" className={classes.btn}>
              <Button variant="fab" color="primary" aria-label="Add" onClick={this.addProduct.bind(this)}>
                <AddIcon/>
              </Button>
            </Tooltip>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AddProductPage)
