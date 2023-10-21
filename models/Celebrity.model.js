//  Add your code here
const { Schema, model } = require("mongoose");

const celebritiesSchema = new Schema(
    {
        name: {
            type: String
        },
        occupation: {
            type: String
        },
        catchPhrase: {
            type: String
        }

    }
)

const Celebritiy = model("Celebrity", celebritiesSchema);

module.exports = Celebritiy;
