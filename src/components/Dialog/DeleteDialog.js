import React from 'react'
import PropTypes from 'prop-types'
import ConfirmDialog from './ConfirmDialog'
import Typography from '@material-ui/core/Typography'

class DeleteDialog extends React.Component {
  handleSubmit = () => {
    const { token, url, deleteItem, primaryKey, primaryVal, onClose, onSubmit } = this.props
    const pathVars = {
      [primaryKey]: primaryVal
    }

    deleteItem(`${url}/{${primaryKey}}`, token, pathVars)
      .then(() => {
        onSubmit()
        onClose()
      })
  }

  render() {
    const { t, id, open, onClose } = this.props
    return (
      <ConfirmDialog
        open={open}
        title={t(`${id}.delete.title`)}
        onSubmit={this.handleSubmit}
        onClose={onClose}
      >
        <Typography>{t(`${id}.delete.message`)}</Typography>
      </ConfirmDialog>
    )
  }
}

DeleteDialog.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.object,
  deleteItem: PropTypes.func.isRequired,
  open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  primaryKey: PropTypes.string,
  primaryVal: PropTypes.string,
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

DeleteDialog.defaultProps = {
  open: false,
  primaryKey: 'id',
}

export default DeleteDialog
