import { auth } from "@/auth";
import { connect } from "@/lib/dbConnect";
import { Note } from "@/models/noteModel";
import { NextResponse } from "next/server";

connect();
export async function GET(req) {
    console.log("Request received API UserNotes HIT");
    try {
        // Step 1 : Connect with database 
        // console.log("1")
        // Step 2 : User Details from auth 
        const { user } = await auth();
        // const user = { email: "Test@gmail.com" };
        // console.log("2")
        if (!user) return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });

        // Step 3 : SearchParams from URL and Get Query and pagenumber from it 
        const { searchParams } = new URL(req.url);
        // console.log("3")
        const query = searchParams.get("query") || "";
        const pageNumber = parseInt(searchParams.get("pageNumber") || 1);

        // Step 4 : Logic 

        // 4A : Number of Notes display on a single page
        const pageSize = 6;

        // 4B : Fetching Notes

        // 4C : Filter Query 
        const filter = {
            ownerEmail: user.email,
            ...(query && { title: { $regex: query, $options: "i" } })
        }
        // console.log("4")

        // 4D : Utitlities 
        const totalNotes = await Note.countDocuments(filter);
        const totalPages = Math.ceil(totalNotes / pageSize);
        // console.log("5")

        // 4E : Pinned Notes Query 
        const pinnedNotes = await Note.find({ ...filter, pinned: true }) || [];
        // console.log("6")

        // 4D : utilities 
        const skipValue = Math.max((pageNumber - 1) * pageSize, 0);
        const skipUnpinned = Math.max((pageNumber - 1) * pageSize - 1, 0);
        // Future : When Pinned note aren't limited to 1 
        /* 
        const skipValue = Math.max((page - 1) * pageSize, 0);
        const skipUnpinned = Math.max(skipValue - pinnedNotes.length, 0); 
        */

        // 4E : if no pinned notes , just return the regurlar notes
        if (pinnedNotes.length === 0) {
            const Notes = await Note.find(filter)
                .sort({ createdAt: -1 })
                .limit(pageSize)
                .skip(skipValue);
            // console.log("7A")
            return NextResponse.json({ Notes, totalPages });
        }
        // console.log("7B")
        // 4F : if there are pinned notes , Combined them with other notes
        const UnpinnedNotes = await Note.find({ ...filter, pinned: { $ne: true } }).sort({ createdAt: -1 }).limit(pageSize - 1).skip(skipUnpinned);
        console.log("userNotes API End")
        return NextResponse.json({
            Notes: [...pinnedNotes, ...UnpinnedNotes].flat(),
            totalPages,
        });

    } catch (error) {
        console.error("API error", error)
        return NextResponse.json({ error: "Internal Server Error " }, { status: 500 })
    }

}