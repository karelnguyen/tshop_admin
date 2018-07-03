const priceInput = new RegExp(/^[0-9]{1,10}$/)
const longTextInput = new RegExp(/^.{1,500}$/)
const nameInput = new RegExp(/^.{1,30}$/)
const shortTextInput = new RegExp(/^.{1,150}$/)
const colorInput = new RegExp(/^[a-zA-Z]{1,30}$/)

function testReg (id, data) {
  switch (id) {
    case 'price': return priceInput.test(data)
    case 'shortText': return shortTextInput.test(data)
    case 'color': return colorInput.test(data)
    case 'heading': return nameInput.test(data)
    default: return longTextInput.test(data)
  }
}

const Validation = {
  testReg
}

export default Validation
