import parentModel from "../models/parentModel.js"; // Ensure the path is correct

// export const detailsOfParent = async (req, res) => {
//     try {
//         // Extract `parentEmail` from `authParent` middleware
//         const { parentEmail } = req.body;

//         if (!parentEmail) {
//             return res.status(400).json({ success: false, message: "Parent email is missing" });
//         }

//         // Fetch parent details using the email from the token
//         const details = await parentModel.findOne({ parentEmail });

//         if (!details) {
//             return res.status(404).json({ success: false, message: "Parent not found" });
//         }

//         // Respond with parent details
//         res.json({ success: true, details });
//         console.log(req.body); // Check if req.body contains the data

//     } catch (error) {
//         console.error("Error fetching parent details:", error);
//         return res.status(500).json({ success: false, message: "An internal error occurred. Please try again." });
//     }
// };

// export default detailsOfParent;



export const detailsOfParent = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Query:", req.query);
        console.log("Request Headers:", req.headers);

        // Extract parentEmail (try different sources)
        const parentEmail = req.body.parentEmail || req.query.parentEmail || req.headers.parentemail;

        if (!parentEmail) {
            return res.status(400).json({ success: false, message: "Parent email is missing" });
        }

        const details = await parentModel.findOne({ parentEmail });

        if (!details) {
            return res.status(404).json({ success: false, message: "Parent not found" });
        }

        res.json({ success: true, details });

    } catch (error) {
        console.error("Error fetching parent details:", error);
        return res.status(500).json({ success: false, message: "An internal error occurred. Please try again." });
    }
};
 export default detailsOfParent;
