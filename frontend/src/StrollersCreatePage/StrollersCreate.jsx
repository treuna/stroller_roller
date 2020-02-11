import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
  className: 'h1',
})``

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`

const Label = styled.label`
  margin: 5px;
`

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px;
`

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`

class StrollersCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      manufacturer: '',
      weight: 0,
      price: 0,
      maxNumberOfSeats: 0,
      wheels: '',
      length: 0,
      depth: 0,
      height: 0,
      lengthFolded: 0,
      depthFolded: 0,
      heightFolded: 0,
    }
  }

  handleChangeInputName = async event => {
    const name = event.target.value
    this.setState({ name })
  }
  handleChangeInputManufacturer = async event => {
    const manufacturer = event.target.value
    this.setState({ manufacturer })
  }
  handleChangeInputWeight = async event => {
    const weight = event.target.value
    this.setState({ weight })
  }
  handleChangeInputPrice = async event => {
    const price = event.target.value
    this.setState({ price })
  }
  handleChangeInputMaxNumberOfSeats = async event => {
    const maxNumberOfSeats = event.target.value
    this.setState({ maxNumberOfSeats })
  }
  handleChangeInputWheels = async event => {
    const wheels = event.target.value
    this.setState({ wheels })
  }
  handleChangeInputLength = async event => {
    const length = event.target.value
    this.setState({ length })
  }
  handleChangeInputDepth = async event => {
    const depth = event.target.value
    this.setState({ depth })
  }
  handleChangeInputHeight = async event => {
    const height = event.target.value
    this.setState({ height })
  }
  handleChangeInputLengthFolded = async event => {
    const lengthFolded = event.target.value
    this.setState({ lengthFolded })
  }
  handleChangeInputDepthFolded = async event => {
    const depthFolded = event.target.value
    this.setState({ depthFolded })
  }
  handleChangeInputHeightFolded = async event => {
    const heightFolded = event.target.value
    this.setState({ heightFolded })
  }
  handleIncludeStroller = async () => {
    const payload = { ...this.state }
    await api.createStroller(payload).then(res => {
      window.alert(`Stroller created successfully`)
      this.setState({
        name: '',
        manufacturer: '',
        weight: 0,
        price: 0,
        maxNumberOfSeats: 0,
        wheels: '',
        length: 0,
        depth: 0,
        height: 0,
        lengthFolded: 0,
        depthFolded: 0,
        heightFolded: 0,
      })
    })
  }

  render() {
    const {
      name,
      manufacturer,
      weight,
      price,
      maxNumberOfSeats,
      wheels,
      length,
      depth,
      height,
      lengthFolded,
      depthFolded,
      heightFolded,
    } = this.state

    return (
      <Wrapper>
        <Title>Create Stroller</Title>

        <Label>Name: </Label>
        <InputText
          type="text"
          value={name}
          onChange={this.handleChangeInputName}
        />

        <Label>Manufacturer: </Label>
        <InputText
          type="text"
          value={manufacturer}
          onChange={this.handleChangeInputManufacturer}
        />

        <Label>Weight: </Label>
        <InputText
          type="number"
          min="0"
          value={weight}
          onChange={this.handleChangeInputWeight}
        />

        <Label>Price: </Label>
        <InputText
          type="number"
          min="0"
          value={price}
          onChange={this.handleChangeInputPrice}
        />

        <Label>Max. number of seats: </Label>
        <InputText
          type="number"
          min="0"
          value={maxNumberOfSeats}
          onChange={this.handleChangeInputMaxNumberOfSeats}
        />

        <Label>Wheels: </Label>
        <InputText
          type="text"
          value={wheels}
          onChange={this.handleChangeInputWheels}
        />

        <Label>Length: </Label>
        <InputText
          type="number"
          min="0"
          value={length}
          onChange={this.handleChangeInputLength}
        />

        <Label>Depth: </Label>
        <InputText
          type="number"
          min="0"
          value={depth}
          onChange={this.handleChangeInputDepth}
        />

        <Label>height: </Label>
        <InputText
          type="number"
          min="0"
          value={height}
          onChange={this.handleChangeInputHeight}
        />

        <Label>LengthFolded: </Label>
        <InputText
          type="number"
          min="0"
          value={lengthFolded}
          onChange={this.handleChangeInputLengthFolded}
        />
        <Label>DepthFolded: </Label>
        <InputText
          type="number"
          min="0"
          value={depthFolded}
          onChange={this.handleChangeInputDepthFolded}
        />

        <Label>HeightFolded: </Label>
        <InputText
          type="number"
          min="0"
          value={heightFolded}
          onChange={this.handleChangeInputHeightFolded}
        />

        <Button onClick={this.handleIncludeStroller}>Add Stroller</Button>
        <CancelButton href={'/strollers/list'}>Cancel</CancelButton>
      </Wrapper>
      )
  }
}

export default StrollersCreate
