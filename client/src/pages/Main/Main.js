import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import EntityElement from "../../components/Entity";
import AddBlock from "../../components/AddBlock"
import ToDoListContainer from "../../components/ToDoListContainer"
import Webcam from "react-user-media";


class Main extends Component {
  state= {
    listItems: [
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
    ],
  };

  handleClick = (id) => {
    // if (id === "addBlock") {
    //   console.log('add click clicked')
    // }
    const listItemsArray = this.state.listItems;
    let idToRemove = document.querySelector(`#${id}`);
    idToRemove.parentNode.removeChild(idToRemove);
    console.log('id to remove', idToRemove);
    const result = listItemsArray.find( listItem => listItem.itemId === id );
    const arrayIndex = listItemsArray.indexOf(result);
    // console.log('index of item:', arrayIndex);
    if (arrayIndex > -1) {
      // console.log(result);
      this.state.listItems.splice(arrayIndex, 1);
      console.log(this.state.listItems);
    }
    this.render();
  };

  handleAddClick = (id) => {
    console.log(id, 'add click clicked');
  };

  render () {
    return (
      <div className="text-center">
        <form>
          <input id="newItemText" style={{zIndex:3, position: 'absolute', left: '50%', transform: 'translate(-50%, 0)'}}/>
        </form>
        <Webcam height="80%" width="95%" audio={false} style={{zIndex:-5}}/>
        <Scene>
          {/*<Entity primitive="a-sky">*/}
          {/*</Entity>*/}

          <Entity primitive="a-camera">
            <Entity cursor="fuse: true; maxDistance: 30; timeout: 200"
                    position="0 0 -1"
                    geometry="primitive: ring"
                    material="color: orange"
                    scale=".01 .01 .01"
            />
          </Entity>

          <AddBlock
            events={{
              click: () => this.handleAddClick('#addBlock')
            }}
          />

          <ToDoListContainer>

            <EntityElement/>
          </ToDoListContainer>

          <Entity id="toDoListHeader"
                  position="0 4.25 -5"
                  text={{
                    color: 'white',
                    align: 'center',
                    value: 'To Do List:',
                    opacity: 1,
                    width: 6
                  }}
          >
          </Entity>

          {this.state.listItems.map((listItem) => (
            <EntityElement key={listItem.itemId}
                           id={listItem.itemId}
                           position={{
                             x: listItem.posX,
                             y: listItem.posY,
                             z: listItem.posZ
                           }}
                           events={{
                             click: () => this.handleClick(listItem.itemId)
                           }}
            />
          ))}
        </Scene>
      </div>
    );
  }
}

export default Main;
