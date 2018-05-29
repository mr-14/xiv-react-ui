import React from 'react'
import PropTypes from 'prop-types'
import SimpleDialog from './SimpleDialog'
import { SimpleForm } from '../Form'

class DetailDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errors: {} }
    props.onLoad()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.primaryVal && (nextProps.primaryVal !== this.props.primaryVal)) {
      nextProps.onLoad()
    }
  }

  onLoad = primaryVal => {
    const { token, getItem, url, primaryKey } = this.props
    const pathVars = {
      [primaryKey]: primaryVal
    }
    
    getItem(`${url}/{${primaryKey}}`, token, pathVars)
      .then(data => { this.setState({ values: data }) })
      .catch(errors => this.setState({ errors }))
  }

  handleSubmit = data => {
    const { token, addItem, editItem, onSubmit, onClose, url, isNew, primaryKey, primaryVal } = this.props

    if (isNew) {
      addItem(url, token, data)
        .then(result => {
          if (onSubmit) {
            onSubmit(result)
          }
          onClose()
        })
        .catch(errors => this.setState({ errors }))
    } else {
      const pathVars = {
        [primaryKey]: primaryVal
      }
      editItem(`${url}/{${primaryKey}}`, token, pathVars, data)
        .then(result => {
          if (onSubmit) {
            onSubmit(result)
          }
          onClose()
        })
        .catch(errors => this.setState({ errors }))
    }
  }

  render() {
    const { t, id, fields, open, size, isNew, onClose } = this.props
    const actions = [
      { label: t('btn.cancel'), onClick: onClose },
      { label: t('btn.save'), color: 'secondary', onSubmit: this.handleSubmit }
    ]

    return (
      <SimpleDialog
        open={open}
        title={t(`${id}.${isNew ? 'add' : 'edit'}.title`)}
        onClose={onClose}
        size={size}
      >
        <SimpleForm
          fields={fields(t)}
          values={this.state.values}
          actions={actions}
          errors={this.state.errors}
        />
      </SimpleDialog>
    )
  }
}

DetailDialog.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  addItem: PropTypes.func,
  getItem: PropTypes.func,
  editItem: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'full']),
  open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  primaryKey: PropTypes.string,
  primaryVal: PropTypes.string,
  url: PropTypes.string.isRequired,
  fields: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  isNew: PropTypes.bool,
}

DetailDialog.defaultProps = {
  open: false,
  size: 'xs',
  isNew: true,
  primaryKey: 'id',
}

export default DetailDialog
