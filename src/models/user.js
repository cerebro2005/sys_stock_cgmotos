const bcrypt = require("bcryptjs");

const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        name: { type: String, required: true, trim: true }, // trim solo deja un espacion entre palabras
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
