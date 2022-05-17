import mongoose from 'mongoose'

// interface used to set the user's property types
interface UserAttributes {
    email: string,
    password: string
}

// interface that describes the properties that
// a User Model has
interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes) : UserDocument;
}

// an interface that describes the properties  a
// User Document has
interface UserDocument extends mongoose.Document {
    email: string,
    password: string;
}

// the types are for Mongoose not Typescript
const userSchema = new mongoose.Schema({
    email: {
        type: String,   // using the String interface not the string type.
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

const user = User.build({
    email: 'sad',
    password:'fsdf'
})
export { User };