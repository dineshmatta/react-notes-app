import React, {Component} from 'react';
import Note from './Note';
import Faplus from 'react-icons/lib/fa/plus'

class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
    this.eachNote = this.eachNote.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.nextId = this.nextId.bind(this);
  }

  add(newText){
    console.log('adding new note');
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          id: this.nextId(),
          note: newText
        }
      ]
    }))
  }

  nextId(){
    this.uniqeId = this.uniqeId || 0;
    return this.uniqeId++;
  }

  remove(id){
    console.log('removing item at', id);
    this.setState(prevState => ({
      notes: prevState.notes.filter(
        note => note.id !== id
      )
    }))
  }

  update(newText, i) {
    console.log('updating item at index', i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
    }))
  }

  eachNote(note, i){
    return (
      <Note key={i}
            index={i}
            onChange={this.update}
            onDelete={this.remove}>
        {note.note}      
      </Note>
    )
  }

  render() {
    return(
      <div className='board'>
        {this.state.notes.map(this.eachNote)}
        <button id="add" onClick={this.add.bind(null, 'New Note')}>
          <Faplus />
        </button>
      </div>
    )
  }
}

export default Board