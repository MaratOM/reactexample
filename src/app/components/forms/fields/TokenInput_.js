import React, {Component} from 'react';
import {connect} from 'react-redux'
import {WithContext as ReactTags} from 'react-tag-input';
import {change} from 'redux-form';
import R from 'ramda'

class TokenInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: this.props.suggestions
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleChange(tags) {
    if(typeof this.props.handleChange === 'function') {
      this.props.handleChange(tags.map((tag) => tag.text))
    }
    this.props.changeTokenFieldValue(this.props.formName, this.props.tokenType, tags)
  }

  handleDelete(i) {
    let tags = this.state.tags.slice()
    let suggestions = this.state.suggestions.slice()
    suggestions.push(tags[i].text)
    tags.splice(i, 1);
    this.setState({
      tags,
      suggestions,
    });
    this.handleChange(tags)
  }

  handleAddition(tag) {
    if(R.contains(tag, R.pluck('text', this.state.tags))) return
    if(typeof this.props.allowAddNew !== 'undefined' || this.props.allowAddNew === false) {
      if (!R.contains(tag, this.state.suggestions)) return
    }

    let tags = this.state.tags.slice()
    let suggestions = this.state.suggestions.slice()
    const tagLastId = tags.length > 0
      ? R.pluck('id', R.sort(R.descend(R.prop('id')))(tags))[0]
      : 0
    suggestions = R.without(tag, suggestions)
    tags.push({
      id: tagLastId + 1,
      text: tag
    });
    this.setState({
      tags,
      suggestions,
    });
    this.handleChange(tags)
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <ReactTags tags={tags}
                 suggestions={suggestions}
                 handleDelete={this.handleDelete}
                 handleAddition={this.handleAddition}
                 handleDrag={this.handleDrag}
      />
    )
  }
}

const mapDispatchToProps = {
   changeTokenFieldValue: (formName, tokenType, value) => dispatch => {
     dispatch(change(formName, tokenType, value))
   }
}

export default connect(null, mapDispatchToProps)(TokenInput)
