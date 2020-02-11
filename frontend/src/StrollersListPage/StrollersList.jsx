import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
  `

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
  `

class UpdateStroller extends Component {
  updateUser = event => {
    event.preventDefault()
    window.location.href = `/stroller/update/${this.props.id}`
  }

  render() {
    return <Update onClick={this.updateUser}>Update</Update>
  }
}

class DeleteStroller extends Component {
  deleteUser = event => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete the stroller ${this.props.id} permanently?`,)) {
      api.deleteStroller(this.props.id)
      window.location.reload()
    }
  }
  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>
  }
}

class StrollersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strollers: [],
      columns: [],
      isLoading: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    await api.getStrollers().then(strollers => {
      this.setState({
        strollers: strollers.data.data,
        isLoading: false
      })
    })
  }

  render() {
    const { strollers, isLoading } = this.state
    console.log('TCL: StrollersList -> render -> strollers', strollers)

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true
      },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true
      },
      {
        Header: 'Manufacturer',
        accessor: 'manufacturer',
        filterable: true
      },
      {
        Header: 'Weight',
        accessor: 'weight',
        filterable: true
      },
      {
        Header: 'Price',
        accessor: 'price',
        filterable: true
      },
      {
        Header: 'Max. number of seats',
        accessor: 'maxNumberOfSeats',
        filterable: true
      },
      {
        Header: 'Wheels',
        accessor: 'wheels',
        filterable: true
      },
      {
        Header: 'Length',
        accessor: 'length',
        filterable: true
      },
      {
        Header: 'Depth',
        accessor: 'depth',
        filterable: true
      },
      {
        Header: 'Height',
        accessor: 'height',
        filterable: true
      },
      {
        Header: 'Folded length',
        accessor: 'lengthFolded',
        filterable: true
      },
      {
        Header: 'Folded depth',
        accessor: 'depthFolded',
        filterable: true
      },
      {
        Header: 'Folded height',
        accessor: 'heightFolded',
        filterable: true
      },
      {
        Header: '',
        accessor: '',
        Cell: function(props) {
          return (
            <span>
              <DeleteStroller id={props.original._id} />
            </span>
          )
        }
      },
      {
        Header: '',
        accessor: '',
        Cell: function(props) {
          return (
            <span>
              <UpdateStroller id={props.original._id} />
            </span>
          )
        }
    },
  ]

    let showTable = true
    if (!strollers.length) showTable = false

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={strollers}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
            />
        )}
      </Wrapper>
      )
  }
}

export default StrollersList
