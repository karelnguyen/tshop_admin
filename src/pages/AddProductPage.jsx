import React from 'react'
import ProductsService from '../services/api/products'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    padding: '20px'
  },
  input: {
    margin: '5px',
    width: '100px'
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

// TODO: ulozeni input dat
  async addProduct () {
    await this.getAllProducts()

    let idArr = []
    this.state.allProducts.map(x => x.hasOwnProperty('id') ? idArr.push(x.id) : x)
    idArr = idArr.map(id => Number(id))
    let id = isFinite(Math.max(...idArr) + 1) ? Math.max(...idArr) + 1 : 1
    // vystupne id = algoritmus pro automaticke vytvoreni id do requestu
    console.log(id)
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Typography variant="display3" gutterBottom>
          Přidat produkt
        </Typography>
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
          />
          <TextField
            id="shortText"
            label="short text"
            placeholder="abc"
            margin="normal"
            className={classes.input}
          />
          <TextField
            id="longText"
            label="long text"
            placeholder="abc"
            margin="normal"
            className={classes.input}
          />
          <TextField
            id="size"
            label="size"
            placeholder="XXL"
            margin="normal"
            className={classes.input}
          />
          <TextField
            id="price"
            label="price"
            placeholder="1000"
            margin="normal"
            className={classes.input}
          />
          <TextField
            id="img"
            label="img"
            placeholder="zatim string"
            margin="normal"
            className={classes.input}
          />
          <Tooltip id="tooltip-fab" title="Add" className={classes.btn}>
            <Button variant="fab" color="primary" aria-label="Add" onClick={this.addProduct.bind(this)}>
              <AddIcon/>
            </Button>
          </Tooltip>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AddProductPage)
