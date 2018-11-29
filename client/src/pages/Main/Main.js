import React, { Component } from 'react';
import 'aframe-animation-component';
import 'aframe-material-snickell';
import { Redirect } from "react-router-dom";
import { Entity, Scene } from 'aframe-react';
import CameraCursor from '../../components/CameraCursor';
import { EntityElement }  from '../../components/Entity';
import { AddBlock } from '../../components/AddBlock';
import { SaveBtn } from '../../components/SaveBtn';
import { ToDoListContainer } from '../../components/ToDoListContainer';
import { VTBBoard } from '../../components/VTBBoard';
import cards from '../../components/VTBBoard/data';
import { VTBLane } from '../../components/VTBLane';
import { VTBCard } from '../../components/VTBCard';
import { ToDoListItem } from '../../components/ToDoListItems';
import { CloseCube } from '../../components/CloseCube';
import { CheckboxCube } from '../../components/CheckboxCube';
import WebCam from '../../components/WebCam';
import API from '../../utils/API';
import blocks from '../../blocks';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      pageLoadListsCalled: false,
      inVrMode: false,
      keyboardRotation: '0 0 0',
      listTitleInputField: '',
      listCreateModalIsVisible: false,
      listsOfUser: [],
      listItemTitleInputField: '',
      listItemCreateModalIsVisible: false,
      listItemsOfList: [],
      listInFocus: '',
      listInFocusText: 'none',
      username: null,
      lizItems: blocks,
      cardEditDesc:""
    };
  }

  componentDidMount() {
    document.addEventListener('enter-vr', this.toggleVr, false);
    document.addEventListener('exit-vr', this.toggleVr, false);
    document.addEventListener('keyup', this.keyboardListener, false);
    this.recursiveWaitForLogin();
  };

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyboardListener, false);
    document.removeEventListener('enter-vr', this.toggleVr, false);
    document.removeEventListener('exit-vr', this.toggleVr, false);
  }

  recursiveWaitForLogin = () => {
    if (this.props.loggedIn && this.props.userRecordId) {
      this.getListsOfUser('pageLoad');
      console.log('this.props.loggedIn', this.props.loggedIn);
      console.log('this.props.userRecordId', this.props.userRecordId);
      this.setState({pageLoadListsCalled: true});
    }
    else {
      console.log('waiting');
      setTimeout(() => this.recursiveWaitForLogin(), 500);
    }
  };

  componentDidUpdate() {
    if (this.props.redirectTo) {
      this.setState({ redirectTo: this.props.redirectTo })
    }
  }

  keyboardListener = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    let {listItemCreateModalIsVisible, listCreateModalIsVisible} = this.state;
    if(listItemCreateModalIsVisible || listCreateModalIsVisible) {
      let valueOfInputField = (listItemCreateModalIsVisible) ?
        document.querySelector('#toDoItemInputField').value :
        document.querySelector('#listInputField').value;
      let key = event.key || event.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.handleCloseModal();
      }
      if (key === 'Backspace') {
        if (valueOfInputField.length > 0) {
          listItemCreateModalIsVisible ?
            this.setState({listItemTitleInputField: valueOfInputField.slice(0, -1)}) :
            this.setState({listTitleInputField: valueOfInputField.slice(0, -1)});
        }
      }
      if(key.length === 1 && /^[-_!@#$%^&*()+={[}\]|\\:;"'<,>.?/\w\s]*$/.test(key)) {
        valueOfInputField += key;
        listItemCreateModalIsVisible ?
          this.setState({listItemTitleInputField: valueOfInputField}) :
          this.setState({listTitleInputField: valueOfInputField});
      }
    }
  };

  toggleVr = (event) => {
    (event.type === 'enter-vr') ? this.setState({inVrMode: true}) : this.setState({inVrMode: false});
  };

  getListsOfUser = (triggeringEvent) => {
    API.getLists(this.props.userRecordId)
      .then(
        res => {
          console.log('lists of user:', res.data);
          if (res.data.length > 0) {
            if (triggeringEvent === 'pageLoad') {
              this.setState({
                listsOfUser: res.data,
                listInFocus: res.data[0]._id,
                listInFocusText: res.data[0].listTitle
              })
            }
            else {
              this.setState({
                listsOfUser: res.data
              })
            }
          }
          if (this.state.listsOfUser.length > 0) {
            this.getListItemsOfList(this.state.listInFocus);
          }
        }
      )
  };

  saveNewList = (data) => {
    API.saveLists(data).then(
      res => {
        console.log(res);
        this.getListsOfUser();
        this.setState({
          listInFocus: res.data._id,
          listInFocusText: res.data.listTitle
        });
      }
    );
  };

  getListItemsOfList = (listID) => {
    API.getTodos(listID).then(
      res => {
        console.log('list items of list:', res.data);
        this.setState({listItemsOfList: res.data});
      }
    )
  };

  saveNewListItem = (data) => {
    API.saveTodos(data).then(
      res => {
        console.log(res);
        this.getListItemsOfList(this.state.listInFocus);
      }
    )
  };

  deleteListItem = (id) => {
    API.deleteTodos(id).then(
      res => {
        console.log(res);
        this.getListItemsOfList(this.state.listInFocus);
      }
    )
  };

  handleClickLizItem = (id) => {
    const lizItemsArray = this.state.lizItems.filter((item) => item.itemId !== id);
    this.setState({lizItems: lizItemsArray});
  };

  handleAddListItemClick = () => {
    console.log('handleAddListItemClick triggered');
    this.setState({
      keyboardRotation: '0 0 0',
      listItemCreateModalIsVisible: true,
      listCreateModalIsVisible: false
    });
    document.querySelector('#toDoItemInputField').focus();
    // TODO: Need to fix QuerySelector
  };

  handleAddListClick = (data,event) => {
    debugger;
    this.setState({
      keyboardRotation: '0 60 0',
      listCreateModalIsVisible: true,
      listItemCreateModalIsVisible: false,
      cardEditDesc:data.label
    });
    document.querySelector('#listInputField').focus();
    // TODO: Need to fix QuerySelector
  };

  handleSaveListItemClick = (data) => {
    this.setState({listItemCreateModalIsVisible:false})
    // if (this.state.listItemTitleInputField.length > 0) {
    //   document.querySelector('#toDoItemInputField').blur();
    //   let largestOrderNumber = this.state.listItemsOfList.length > 0 ?
    //     (this.state.listItemsOfList.map(item => item.orderNumber)).reduce((a, b) => Math.max(a, b)) : 0;
    //   let newListItem = {
    //     title: this.state.listItemTitleInputField.trim(),
    //     orderNumber: largestOrderNumber + 1,
    //     listID: this.state.listInFocus,
    //     authorId: this.props.userRecordId
    //   };
    //   this.saveNewListItem(newListItem);
    //   this.setState({
    //     listItemTitleInputField: '',
    //     listItemCreateModalIsVisible: false
    //   });
    // }
  };

  handleSaveListClick = () => {
    let ListInput = document.querySelector('#listInputField');
    console.log('save list clicked');
      this.setState({
        listTitleInputField: '',
        listCreateModalIsVisible: false
      });
  };

  handleSelectListClick = (event) => {
    const {id} = event.target;
    console.log(id, 'selected as list in focus');
    let result = this.state.listsOfUser.filter(list => {
      return list._id === id
    });
    this.setState({
      listInFocus: id,
      listInFocusText: result[0].listTitle
    });
    this.getListItemsOfList(id);
  };

  handleDeleteListItem = (event) => {
    const {id} = event.target.parentEl;
    console.log(id, 'clicked for deletion');
    this.deleteListItem(id);
    this.getListItemsOfList(id);
  };

  handleCloseModal = () => {
    this.setState({
      listTitleInputField: '',
      listCreateModalIsVisible: false,
      listItemTitleInputField: '',
      listItemCreateModalIsVisible: false
    });
  };

  handleToggleDone = (event) => {
    console.log("Done checkbox toggled");
    console.log(event);
    const {id} = event.target.parentEl.parentEl.parentEl;
    console.log(id, 'clicked for toggle of done status');
    // this.toggleDoneListItem(itemId);
    // this.getListItemsOfList(id);
  };

  // toggleDoneListItem = (itemId) => {
  //   API.updateTodos(itemId).then(
  //     res => {
  //       console.log(res);
  //       this.getListItemsOfList(this.state.listInFocus);
  //     }
  //   )
  // };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{pathname: this.state.redirectTo}} />
    } else {
      return (
        <div className='text-center' >
          <WebCam inVrMode={this.state.inVrMode} />
          <Scene keyboard-shortcuts={{enterVR: false}} >
            <CameraCursor/>

            <Entity rotation={this.state.keyboardRotation}
                    position='0 0.65 0' >
              <Entity primitive='a-keyboard'
                      id='listOfListsKeyboard'
                      className='clickable' />
            </Entity>

            {/*=============================================================================================
              List of Lists Scene Container
            ==============================================================================================*/}
            <Entity id='ListOfListsSceneComponent'
                    rotation='0 60 0' >

            {/*=============================================================================================
              Modal Container
            ==============================================================================================*/}
              { this.state.listCreateModalIsVisible ?
                (<Entity id='listOfListsModalContainer'
                        position='0 0.65 0' >
                  <Entity primitive='a-rounded'
                          position='-1.25 0.45 -2.95'
                          width='2.5'
                          height='1'
                          radius='0.05' >
                    <Entity primitive='a-form' >
                      <Entity primitive='a-input'
                              className='clickable'
                              id='listInputField'
                              disabled={!this.state.listCreateModalIsVisible}
                              position='0.25 0.6 0'
                              placeholder='Description'
                              color='black'
                              width='2'
                              value={this.state.cardEditDesc}
                              events={{change: (e) => this.setState({'cardEditDesc': e.detail})}} />
                      <Entity className='clickable'
                              primitive='a-button'
                              position='2.25 0.85 0'
                              scale='0.4 0.4 0.4'
                              width='0.1'
                              value='X'
                              type='raised'
                              button-color='red'
                              events={{click: () => this.handleCloseModal()}} />
                      <SaveBtn 
                               position='1.57 0.25 0.01'
                               events={{click: () => this.handleSaveListClick()}} />
                    </Entity>
                  </Entity>
                </Entity>) 
                : null
              }

              {/*=============================================================================================
                To Do List Container - List of lists (left side)
              ==============================================================================================*/}
              
            </Entity>

            {/*=============================================================================================
              To Do List Items Scene Container
            ==============================================================================================*/}
            <Entity id='toDoListItemsSceneComponent'
                    rotation='0 0 0' >

            {/*=============================================================================================
              Modal Container
             ==============================================================================================*/}
              {this.state.listItemCreateModalIsVisible ?
                <Entity id='ModalContainer'
                        position='0 0.65 0'>
                  <Entity primitive='a-rounded'
                          position='-1.25 0.45 -2.95'
                          width='2.5'
                          height='1'
                          radius='0.05'>
                    <Entity primitive='a-form'>
                      <Entity primitive='a-input'
                              id='toDoItemInputField'
                              disabled={!this.state.listItemCreateModalIsVisible}
                              position='0.25 0.6 0'
                              placeholder='Description'
                              color='black'
                              width='2'
                              value={this.state.listItemTitleInputField}
                              events={{change: (e) => this.setState({'listItemTitleInputField': e.detail})}}/>
                      <Entity className='clickable'
                              primitive='a-button'
                              position='2.25 0.85 0'
                              scale='0.4 0.4 0.4'
                              width='0.1'
                              value='X'
                              type='raised'
                              button-color='red'
                              events={{click: () => this.handleCloseModal()}}/>
                      <SaveBtn disabled={this.state.listItemTitleInputField === ''}
                               position='1.57 0.25 0.01'
                               events={{click: () => this.handleSaveListItemClick()}}/>
                    </Entity>
                  </Entity>
                </Entity> : null
              }




              {/*=============================================================================================
                To Do List Items Container (right side)
            ==============================================================================================*/}
            
              <VTBBoard caption={this.state.listItemsOfList}>
                {Array.apply(null, Array(5)).map((listItem, index) => (
                  <VTBLane pos={{
                    x: -4 + (index * 1.7),
                    y: -0.0,
                    z: 0.1
                  }}>
                    {
                      getSomeCards(index, 5).slice(0, 5).map((card, cardIndex) => (
                          <VTBCard pos={{
                            x: 0,
                            y: -2.2 + (cardIndex * 1.1),
                            z: 0.1
                          }}
                          data={card}
                          laneIndex={index}
                          events={{click: () => this.handleAddListClick(card)}}></VTBCard>
                      ))
                    }
                  </VTBLane>
                ))}
              </VTBBoard>


            </Entity>

            {/*=============================================================================================
              Scene Lighting
            ==============================================================================================*/}
            <Entity light={{type: 'point'}}/>

            {/*=============================================================================================
              Liz Items Container
            ==============================================================================================*/}
            {this.state.lizItems.map((lizItem) => (
              <EntityElement key={lizItem.itemId}
                             id={lizItem.itemId}
                             position={{
                               x: lizItem.posX,
                               y: lizItem.posY,
                               z: lizItem.posZ
                             }}
                             events={{click: () => this.handleClickLizItem(lizItem.itemId)}} />
            ))}

          </Scene>
        </div>
      );
    }
  }
}

function getSomeCards(index, perLane) {
  const start = index * perLane;
  return cards.slice(start, start + perLane);
}

export default Main;