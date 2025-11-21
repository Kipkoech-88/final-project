const database=require('mongoose');

const todosSchema = new database.Schema({

    title: { type: String, required: true },
     completed: { type: Boolean, default: false }        


}, { timestamps: true }
);

module.exports = database.model('Todo', todosSchema);