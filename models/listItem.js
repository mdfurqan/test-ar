const mongoose = require("mongoose");
const Schema = mongoose.Schema;


  const listItem = new Schema({
    title: {
      type: String,
      trim: true,
      required: "Title is Required"
    },
    orderNumber:{
      type: number
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    authorID:[
        {
          type: Schema.Types.ObjectId,
          ref: "user"
        }
      ],
    listID: [
      {
        type: Schema.Types.ObjectId,
        ref: "list"
      }
    ]

  });

  const ListItem = mongoose.model("listItem", listItem);

module.exports = ListItem;