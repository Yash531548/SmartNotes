import { connect } from "@/lib/dbConnect";
import { Note } from "@/models/noteModel";
import { NextResponse } from "next/server";

connect()
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { user, id } = reqBody
    // console.log("pinned note: ",{user,id})  
    const PreviouslyPinnedNote = await Note.findOne({ email: user.email, pinned: true });
    // console.log("Previously pinned : " , {PreviouslyPinnedNote})
    const noteToPinned = await Note.findById(id);
    // console.log("Note To Pinned ", { id, noteToPinned, user });
    // console.log("Note To Pinned " , " previous pinned id" ,PreviouslyPinnedNote._id.toString() , " note to pinned id" ,noteToPinned._id.toString());
    //  Unpin the previously pinned note if it exists and is not the same as the current note
    if (PreviouslyPinnedNote && PreviouslyPinnedNote._id.toString() !== noteToPinned._id.toString()) {
      PreviouslyPinnedNote.pinned = false;
      await PreviouslyPinnedNote.save();
      console.log("Changed successfuly");
    } else {
      noteToPinned.pinned = !noteToPinned.pinned;
      await noteToPinned.save();
      console.log("else condition");
      return NextResponse.json({
        message: "Note Add Successfully",
        success: true,
      }, { status: 201 })
    }
    noteToPinned.pinned = !noteToPinned.pinned;
    await noteToPinned.save();
    console.log("pinned successfully api route");
    return NextResponse.json({
      message: "Note Add Successfully",
      success: true,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
/**id: '66c5860cc66b7f676f184599',
  noteToPinned: {
    _id: new ObjectId('66c5860cc66b7f676f184599'),
    title: 'Fourteenth again update',
    note: 'This is Fourteenth Note updated again',
    ownerEmail: 'two@gmail.com',
    pinned: false,
    createdAt: 2024-08-21T06:15:40.836Z,
    updatedAt: 2024-08-21T07:33:26.442Z,
    __v: 0
  },
  user: {
    user: { email: 'two@gmail.com' },
    expires: '2024-09-22T05:02:17.911Z'
  }
} 
Previously pinned :  {
  PreviouslyPinnedNote: {
    _id: new ObjectId('66c6d19551025a96b7fd886c'),
    title: 'fifteen ',
    note: 'this fifteen note',
    ownerEmail: 'two@gmail.com',
    pinned: true,
    createdAt: 2024-08-22T05:50:13.852Z,
    updatedAt: 2024-08-23T05:39:52.258Z,
    __v: 0
  }
}  
*/