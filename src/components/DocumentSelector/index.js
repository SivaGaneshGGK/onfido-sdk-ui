import { h, Component } from 'preact'
import style from './style.css'

// The value of these options must match the API document types.
// See https://documentation.onfido.com/#document-types
const defaultOptions = [{
  value: 'passport',
  label: 'Passport',
  icon: 'icon-passport'
}, {
  value: 'driving_licence',
  label: 'Driver\'s License',
  icon: 'icon-license'
}, {
  value: 'national_identity_card',
  label: 'Identity Card',
  icon: 'icon-identity'
}]

class DocumentSelector extends Component {

  getOptions = () => {
    const { options } = this.props
    const validOptions = defaultOptions.filter((option) => options.indexOf(option.value) >= 0)

    // If no valid options passed, default to all options
    if (validOptions.length === 0) {
      return defaultOptions
    }

    return validOptions
  }

  handleSelect = (e, value) => {
    e.stopPropagation()

    const { setDocumentType, nextStep } = this.props
    setDocumentType(value)
    nextStep()
  }

  renderOption = (option) => {
    return (
      <div
        class={style.option}
        onClick={(e) => this.handleSelect(e, option.value)}
      >
        <div class={`${style.icon} ${style[option.icon]}`}></div>
        <span>{option.label}</span>
      </div>
    )
  }

  render() {
    const options = this.getOptions();

    return (
      <div class={style.selector}>
        {options.map((op) => this.renderOption(op))}
      </div>
    )
  }
}

export default DocumentSelector;
