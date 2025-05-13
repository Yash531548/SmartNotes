import mongoose from "mongoose";

// Define the NoteSchema
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must Provide Title"],
    },
    note: {
        type: String,
        required: [true, "Must Provide Note"],
    },
    ownerEmail: {
        type: String, // Use String type for email
        required: [true, "Must have an owner"],
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    pinned: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// Export the Note model
export const Note = mongoose.models?.note || mongoose.model("note", NoteSchema);
