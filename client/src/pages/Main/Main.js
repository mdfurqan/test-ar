import React, { Component } from "react";
import 'aframe-animation-component';
import 'aframe-material-snickell';
import {Entity, Scene} from 'aframe-react';
import CameraCursor from '../../components/CameraCursor';
import EntityElement from '../../components/Entity';
import AddBlock from '../../components/AddBlock';
import SaveBtn from '../../components/SaveBtn';
import ToDoListContainer from '../../components/ToDoListContainer';
import ToDoListItem from '../../components/ToDoListItems';
import CloseCube from '../../components/CloseCube';
import WebCam from '../../components/WebCam';
// import Webcam from 'react-user-media';
import API from '../../utils/API';

let textValue = '';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      keyboardRotation: '0 0 0',
      listTitleInputField: '',
      listCreateModalIsVisible: false,
      listsOfUser: [],
      listItemTitleInputField: '',
      listItemCreateModalIsVisible: false,
      listItemsOfList: [],
      listInFocus: '',
      listInFocusText: 'none',
      userIdInFocus: 'placeholderForNoId',
      usernameInFocus: 'TestUser',
      loggedIn: false,
      username: null,
      lizItems: [
        {
          itemId: 'one',
          posX: -2,
          posY: 3,
          posZ: 5
        },
        {
          itemId: 'two',
          posX: -2,
          posY: 2,
          posZ: 5
        },
        {
          itemId: 'three',
          posX: -2,
          posY: 1,
          posZ: 5
        },
        {
          itemId: 'four',
          posX: -2,
          posY: 0,
          posZ: 5
        },
        {
          itemId: 'five',
          posX: -1,
          posY: 0,
          posZ: 5
        },
        {
          itemId: 'six',
          posX: 1,
          posY: 1,
          posZ: 5
        },
        {
          itemId: 'seven',
          posX: 1,
          posY: 3,
          posZ: 5
        },
        {
          itemId: 'eight',
          posX: 1,
          posY: 0,
          posZ: 5
        },
        {
          itemId: 'nine',
          posX: 3,
          posY: 3,
          posZ: 5
        },
        {
          itemId: 'ten',
          posX: 4,
          posY: 3,
          posZ: 5
        },
        {
          itemId: 'eleven',
          posX: 5,
          posY: 3,
          posZ: 5
        },
        {
          itemId: 'twelve',
          posX: 5,
          posY: 2,
          posZ: 5
        },
        {
          itemId: 'thirteen',
          posX: 4,
          posY: 1,
          posZ: 5
        },
        {
          itemId: 'fourteen',
          posX: 3,
          posY: 0,
          posZ: 5
        },
        {
          itemId: 'fifteen',
          posX: 4,
          posY: 0,
          posZ: 5
        },
        {
          itemId: 'sixteen',
          posX: 5,
          posY: 0,
          posZ: 5
        },
      ]
    };
  }


  componentDidMount() {
    this.getListsOfUser('pageLoad');
    this.addKeyboardListener();
  };

  keyboardListener = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    let key = event.key || event.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      console.log('escape pressed:', key);
    }

    let valueOfInputField = document.querySelector('#toDoItemInputField').value;
    valueOfInputField += key;
    console.log('valueOfInputField', valueOfInputField);
    console.log('key pressed', key);
    console.log(event);
    this.setState({listItemTitleInputField : valueOfInputField});
  };


  addKeyboardListener = () => {
    console.log('add keyboard listener triggered');
    document.addEventListener('keyup', (event) => this.keyboardListener(event));
  };

  getListsOfUser = (triggeringEvent) => {
    console.log('get lists triggered');
    API.getLists().then(
      res => {
        console.log('lists of user:', res.data);
        if(res.data.length > 0) {
          if(triggeringEvent === 'pageLoad'){
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
        this.getListItemsOfList(this.state.listInFocus);
      }
    )
  };

  saveNewList = (data) => {
    console.log('post of list triggered');
    API.saveLists(data).then(
      res => {
        console.log(res);
        this.getListsOfUser();
        this.setState({
          listInFocus: res.data._id,
          listInFocusText: res.data.listTitle
        });
        console.log('list now in focus', this.state.listInFocus);
        console.log('list now in focus text', this.state.listInFocusText);
      }
    );
    // this.getListItemsOfList(this.state.listInFocus);
  };

  getListItemsOfList = (listID) => {
    console.log('get list items triggered');
    API.getTodos(listID).then(
      res => {
        console.log('list items of list:', res.data);
        this.setState({listItemsOfList: res.data});
      }
    )
  };

  saveNewListItem = (data) => {
    console.log('post of list item triggered');
    API.saveTodos(data).then(
      res => {
        console.log(res);
        this.getListItemsOfList(this.state.listInFocus);
      }
    )
  };

  deleteListItem = (id) => {
    console.log('delete of list item triggered');
    API.deleteTodos(id).then(
      res => {
        console.log(res);
        this.getListItemsOfList(this.state.listInFocus);
      }
    )
  };

  handleClickLizItem = (id) => {
    const lizItemsArray = this.state.lizItems;
    const result = lizItemsArray.find(lizItem => lizItem.itemId === id);
    const arrayIndex = lizItemsArray.indexOf(result);
    if (arrayIndex > -1) {lizItemsArray.splice(arrayIndex, 1)};
    this.setState({lizItems: lizItemsArray});
  };

  handleAddListItemClick = () => {
    this.setState({
      keyboardRotation: '0 0 0',
      listItemCreateModalIsVisible: true,
      listCreateModalIsVisible: false
    });
    document.querySelector('#toDoItemInputField').focus();
  };

  handleAddListClick = () => {
    this.setState({
      keyboardRotation: '0 90 0',
      listCreateModalIsVisible: true,
      listItemCreateModalIsVisible: false
    });
    document.querySelector('#listInputField').focus();
  };

  handleSaveListItemClick = () => {
    let toDoListInput = document.querySelector('#toDoItemInputField');
    console.log('save list item clicked');
    if(this.state.listItemTitleInputField.length > 0) {
      toDoListInput.blur();
      let newListItem = {
        title: textValue.trim(),
        orderNumber: (this.findLargestOrderNumber() + 1),
        listID: this.state.listInFocus,
      };
      this.saveNewListItem(newListItem);
      this.setState({
        listItemTitleInputField: '',
        listItemCreateModalIsVisible: false
      });
    }
  };

  handleSaveListClick = () => {
    let ListInput = document.querySelector('#listInputField');
    console.log('save list clicked');
    if(this.state.listTitleInputField.length > 0) {
      ListInput.blur();
      let newList = {
        listTitle: textValue.trim()
      };
      this.saveNewList(newList);
      this.setState({
        listTitleInputField: '',
        listCreateModalIsVisible: false
      });
    }
  };

  findLargestOrderNumber = () => {
    let listItemsArray = this.state.listItemsOfList;
    console.log(listItemsArray);
    if (listItemsArray.length > 0) {
      let itemsOrderNumberArray = listItemsArray.map(item => item.orderNumber);
      console.log(itemsOrderNumberArray);
      return itemsOrderNumberArray.reduce((a, b) => Math.max(a,b));
    }
    else {
      return 0;
    }
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
    console.log('x clicked');
    document.querySelector('#toDoItemInputField').blur();
    document.querySelector('#listInputField').blur();
    this.setState({
      listTitleInputField: '',
      listCreateModalIsVisible: false,
      listItemTitleInputField: '',
      listItemCreateModalIsVisible: false
    });
  };

  onChangeListItemText = (text) => {
    this.setState({listItemTitleInputField: text});
    textValue = text;
  };

  onChangeListText = (text) => {
    console.log(text);
    this.setState({listTitleInputField: text});
    textValue = text;
  };

  render () {
    return (
      <div className='text-center'>
        <WebCam/>

        {/*<Webcam height="80%" width="95%" audio={false} style={{zIndex:-5, overflow:'hidden'}}/>*/}

        <Scene
          keyboard-shortcuts={{enterVR: false}}
        >
          {/*<a-assets>*/}
            {/*<img id="skyTexture" src="../../images/Prague_Getty.png"/>*/}
          {/*</a-assets>*/}

          {/*<Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>*/}

          <CameraCursor/>


          <Entity
            rotation={this.state.keyboardRotation}
            position='0 0.65 0'
          >
            <Entity
              primitive='a-keyboard'
              id='listOfListsKeyboard'
              className='clickable'
              physical-keyboard='true'
            />
          </Entity>

          {/*=============================================================================================
              List of Lists Scene Container
          ==============================================================================================*/}
          <Entity
            id='ListOfListsSceneComponent'
            rotation='0 90 0'
          >
            {/*=============================================================================================
              Modal Container
             ==============================================================================================*/}
            <Entity
              id='listOfListsModalContainer'
              position='0 0.65 0'
            >
              <Entity
                visible={this.state.listCreateModalIsVisible}
                primitive='a-rounded'
                position='-1.25 0.45 -2.95'
                width='2.5'
                height='1'
                radius='0.05'
              >
                <Entity
                  primitive='a-form'
                >
                  <Entity
                    primitive='a-input'
                    id='listInputField'
                    disabled={!this.state.listCreateModalIsVisible}
                    position='0.25 0.6 0'
                    placeholder='Description'
                    color='black'
                    width='2'
                    value={this.state.listTitleInputField}
                    events={{
                      change: () => this.onChangeListText(document.querySelector('#listInputField').value)
                    }}
                  />

                  <Entity
                    className='clickable'
                    primitive='a-button'
                    position='2.25 0.85 0'
                    scale='0.4 0.4 0.4'
                    width='0.1'
                    value='X'
                    type='raised'
                    button-color='red'
                    events={{click: () => this.handleCloseModal()}}
                  />

                  <SaveBtn
                    disabled={this.state.listTitleInputField === ''}
                    position='1.57 0.25 0.01'
                    events={{click: () => this.handleSaveListClick()}}
                  />
                </Entity>
              </Entity>
            </Entity>

            {/*=============================================================================================
                To Do List Container
            ==============================================================================================*/}
            <ToDoListContainer
              caption='Lists for User:'
            >
              <AddBlock
                events={{
                  click: () => this.handleAddListClick()
                }}
              />

              <Entity
                id="userInFocusCaption"
                position='0 3.25 0'
                text={{
                  color: 'white',
                  align: 'center',
                  value: this.state.usernameInFocus,
                  opacity: 1,
                  width: 4,
                  side: 'double'
                }}
              />

              {(this.state.listsOfUser.length > 0) ? (
                this.state.listsOfUser.map((list, index) => (
                  <ToDoListItem
                    key={list._id}
                    id={list._id}
                    text={list.listTitle}
                    posY={`${3 - (0.5 * (index + 1))}`}
                    type='list'
                    events={{
                      click: () => this.handleSelectListClick
                    }}
                  />
                ))) : (
                  <p>No Lists</p>
                )
              }
            </ToDoListContainer>
          </Entity>

          {/*=============================================================================================
              To Do List Items Scene Container
          ==============================================================================================*/}
          <Entity
            id='toDoListItemsSceneComponent'
            rotation='0 0 0'
          >
            {/*=============================================================================================
              Modal Container
             ==============================================================================================*/}
            <Entity
              id='ModalContainer'
              position='0 0.65 0'
            >
              <Entity
                visible={this.state.listItemCreateModalIsVisible}
                primitive='a-rounded'
                position='-1.25 0.45 -2.95'
                width='2.5'
                height='1'
                radius='0.05'
              >
                <Entity
                  primitive='a-form'
                >
                  <Entity
                    primitive='a-input'
                    id='toDoItemInputField'
                    disabled={!this.state.listItemCreateModalIsVisible}
                    position='0.25 0.6 0'
                    placeholder='Description'
                    color='black'
                    width='2'
                    value={this.state.listItemTitleInputField}
                    events={{
                      change: () => this.onChangeListItemText(document.querySelector('#toDoItemInputField').value)
                    }}
                  />

                  <Entity
                    className='clickable'
                    primitive='a-button'
                    position='2.25 0.85 0'
                    scale='0.4 0.4 0.4'
                    width='0.1'
                    value='X'
                    type='raised'
                    button-color='red'
                    events={{click: () => this.handleCloseModal()}}
                  />

                  <SaveBtn
                    disabled={this.state.listItemTitleInputField === ''}
                    position='1.57 0.25 0.01'
                    events={{click: () => this.handleSaveListItemClick()}}
                  />
                </Entity>
              </Entity>
            </Entity>

            {/*=============================================================================================
                To Do List Items Container
            ==============================================================================================*/}
            <ToDoListContainer
              caption='To Do List:'
            >
              <AddBlock
                events={{
                  click: () => this.handleAddListItemClick()
                }}
              />

              <Entity
                id="listInFocusCaption"
                position='0 3.25 0'
                text={{
                  color: 'white',
                  align: 'center',
                  value: this.state.listInFocusText,
                  opacity: 1,
                  width: 4,
                  side: 'double'
                }}
              />

              {this.state.listItemsOfList.map((listItem, index) => (
                <ToDoListItem
                  className='toDoListItem'
                  key={listItem._id}
                  id={listItem._id}
                  text={listItem.title}
                  posY={`${3 - (0.5 * (index + 1))}`}
                  events={{
                    click: () => this.handleDeleteListItem
                  }}
                >
                  <CloseCube
                    id={listItem._id}
                  />
                </ToDoListItem>
              ))}
            </ToDoListContainer>
          </Entity>

          {/*=============================================================================================
              Scene Lighting
          ==============================================================================================*/}
          <Entity light={{type: 'point'}}/>

          {/*=============================================================================================
              Liz Items Container
          ==============================================================================================*/}
          {this.state.lizItems.map((lizItem) => (
            <EntityElement
              key={lizItem.itemId}
              id={lizItem.itemId}
              position={{
                x: lizItem.posX,
                y: lizItem.posY,
                z: lizItem.posZ
              }}
              events={{
                click: () => this.handleClickLizItem(lizItem.itemId)
              }}
            />
          ))}
        </Scene>
      </div>
    );
  }
}

export default Main;