import React, { Component } from 'react';
import './bs.css';
import './App.css';
import ReactModal from 'react-modal';
// import Button from '@material-ui/core/Button';
// import Radio from '@material-ui/core/Radio';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Taskitem from './blocks/taskitem/taskitem';

class App extends Component {

  constructor( props ){
    super( props );
    this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
    this._addTaskDB = this._addTaskDB.bind(this);
  }

  state = {
    tasks : [],
    tags : [],
    modals : {
      deleteModal : false,
      editmodal   : false,
      addmodal    : false  
    },
    globals : {

    }
  } 
  
  componentDidMount() {
    
    fetch( '/gettags' , {
      method: "POST"
    }) 
    .then( ( resp ) => {
        return resp.json();
    })
    .then( ( data ) => {

        console.log(data);

        this.setState({
            tags : [...data]
        });

    })
    .catch( ( err ) => {
        console.log( err );                
    });


    fetch( '/gettaskstodisplay' , {
      method: "POST"
    }) 
    .then( ( resp ) => {
        return resp.json();
    })
    .then( ( data ) => {

        let arr = [...data];  
        this.setState({
          tasks : arr
        });

    })
    .catch( ( err ) => {
        console.log( err );                
    });

  }

  handleDelete = ( idx , id  ) => {
    let modals = this.state.modals;

    this.setState({
      modals : {
        ...modals,
        deleteModal : true
      },
      globals : {
         deleteid : idx,
         deleteIdx : id
      }
    });

  }

  handleDeleteModalOpen () {
  }

  handleDeleteConfirmation = () => {
    let statetask = this.state.tasks;
    statetask.splice( this.state.globals.deleteid , 1 );

    this.setState({
      tasks : [ ...statetask ]
    });

    fetch('/deletetaks' , {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'deleterecordid' : this.state.globals.deleteIdx }) 
    })
    .then( ( resp ) => {
        console.log( resp.body );    
    })
    .catch( ( err ) => {
        console.log( err );                
    });

  }

  handleDeleteModalClose () {

    let deleteModalBol = this.state.modals.deleteModal; 

    this.setState({
      modals : {
        deleteModal : !deleteModalBol
      }
    })
  }

  _addTaskModal = () => {
    let modals = this.state.modals;

    this.setState({
      modals : {
        ...modals,
        addmodal : true
      }
    });

  }

  _addTaskDB = () => {
    /* fetch('/addnewtask' , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            'task' : 'I am kangarooooooo !',
            'tags' : 'office' 
        })
    })
    .then( ( resp ) => {
        console.log( resp.body );
    })
    .catch( ( err ) => {
        console.log( err );                
    });
    */
  }

  render() {
    return (
      <div className="chiostaskblock__main App">
          <header>
              <h1>Your tasks</h1>
          </header>


          <div className="chios__sorttasks">
                <RadioGroup 
                    aria-label="chios_tags"
                    name="chios_tags"
                >
                { 
                  this.state.tags.map( ( _e , i ) => {
                    console.log( _e.tag )  
                    return <FormControlLabel
                          value={ _e.tag }
                          control={<Radio color="primary" />}
                          label={ _e.tag }
                          labelPlacement="end"
                      />
                  }) 
                }
                </RadioGroup>
          </div> 
          <ul className="chiostaskblock__maintasklist">
            { 
              this.state.tasks.map( ( _e , i ) => {
                return <Taskitem  
                      key={ _e.id  }
                      id={ _e.id }
                      task={ _e.task }
                      tags={ _e.tags } 
                      clickDelete = { () => this.handleDelete( i , _e.id ) }  
                      />
              }) 
            }
          </ul>  
          <button className="btn btn-primary" 
                data-micromodal-trigger="chios__addtaskmicromodal"
                onClick={  this._addTaskModal  }
                >Add task</button>  



    <ReactModal
        isOpen={ this.state.modals.deleteModal }
        ariaHideApp={ true }
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={ true }
        shouldCloseOnEsc={ true }
        
        onAfterOpen={ this.handleDeleteModalOpen }    
        onRequestClose={ this.handleDeleteModalClose }    
    > 
      <header>
        <h3>Delete Task</h3>
      </header>
      <p>
        Are you sure you want to delete this task ?
      </p>
      <button className="btn btn-primary" onClick={ this.handleDeleteConfirmation } >Delete</button>
    </ReactModal>


    <ReactModal
        isOpen={ this.state.modals.editmodal }
        ariaHideApp={ true }
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={ true }
        shouldCloseOnEsc={ true }
        
        onAfterOpen={ this.handleDeleteModalOpen }    
        onRequestClose={ this.handleDeleteModalClose }    
    > 
      <header>
        <h3>Delete Task</h3>
      </header>
      <main>
          <input type="text" />  
      </main>
      <button className="btn btn-primary" >Save</button>
    </ReactModal> 


    <ReactModal
        isOpen={ this.state.modals.addmodal }
        ariaHideApp={ true }
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={ true }
        shouldCloseOnEsc={ true }
        
        onAfterOpen={ this.handleDeleteModalOpen }    
        onRequestClose={ this.handleDeleteModalClose }    
    > 
      <header>
        <h3>Add Task</h3>
      </header>
      <div className="checkbox__wrapper">
                <RadioGroup 
                    aria-label="chios_tags"
                    name="chios_tags"
                >
                { 
                  this.state.tags.map( ( _e , i ) => {
                    console.log( _e.tag )  
                    return <FormControlLabel
                          value={ _e.tag }
                          control={<Radio color="primary" />}
                          label={ _e.tag }
                          labelPlacement="end"
                      />
                  }) 
                }
                </RadioGroup>
      </div>
      <main>
          <input type="text" placeholder="Add a awesome task !"/>  
      </main>
      <button className="btn btn-primary" 
        onClick={ () => alert() }>Add</button>
    </ReactModal> 
      </div>
      
    );
  }
}

export default App;
